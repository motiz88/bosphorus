#!/usr/bin/env node

import program from "commander";
import fs from "mz/fs";
import path from "path";
import { makeAction } from "bosphorus-cli-utils";
import { requestCoverage, resetCoverage } from "bosphorus-test-utils";

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
        const coverage = await requestCoverage(serverUrl, {
          timeout: timeoutMs
        });
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
  .option(
    "-t, --timeout <ms>",
    `Set timeout for coverage reset response. Defaults to ${TIMEOUT} ms`
  )
  .action(
    makeAction(
      async ({
        timeout: timeoutMs = String(TIMEOUT),
        server: serverUrl = SERVER_URL
      }) => {
        timeoutMs = parseInt(timeoutMs, 10);
        await resetCoverage(serverUrl, { timeout: timeoutMs });
      }
    )
  );

program.parse(process.argv);
