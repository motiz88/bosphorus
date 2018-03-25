#!/usr/bin/env node

import program from "commander";
import io from "socket.io-client";
import { makeAction } from "bosphorus-cli-utils";
import fs from "mz/fs";
import path from "path";
import { timeout } from "promise-timeout";

import { SERVER_URL, TIMEOUT } from "bosphorus-defaults";

program.version(require("../package.json").version);

program
  .command("save-coverage", { isDefault: true })
  .option("-o, --output-dir <path>", "Set output path. Defaults to ./coverage")
  .option(
    "-t, --timeout <ms>",
    `Set timeout for coverage response. Defaults to ${TIMEOUT} ms`
  )
  .option("-s, --server", `Set server URL. Defaults to ${SERVER_URL}`)
  .action(
    makeAction(
      async ({
        outputDir = "./coverage",
        timeout: timeoutMs = String(TIMEOUT),
        server: serverUrl = SERVER_URL
      }) => {
        timeoutMs = parseInt(timeoutMs, 10);
        const socket = io(serverUrl + "/control");
        await timeout(
          new Promise(resolve => {
            socket.once("connect", resolve);
          }),
          timeoutMs
        );
        socket.emit("request coverage");
        const coverage = await timeout(
          new Promise(resolve => {
            socket.once("coverage", resolve);
          }),
          timeoutMs
        );

        socket.close();

        process.stdout.write(`Writing to ${outputDir}\n`);
        if (!await fs.exists(outputDir)) {
          await fs.mkdir(outputDir);
        }
        await fs.writeFile(
          path.join(outputDir, "coverage.json"),
          JSON.stringify(coverage),
          "utf8"
        );
      }
    )
  );

program
  .command("reset-coverage")
  .option("-s, --server", `Set server URL. Defaults to ${SERVER_URL}`)
  .action(
    makeAction(async ({ server: serverUrl = SERVER_URL }) => {
      const socket = io(serverUrl + "/control");
      await new Promise(resolve => {
        socket.once("connect", resolve);
      });
      socket.emit("reset coverage");
    })
  );

program.parse(process.argv);
