#!/usr/bin/env node

import program from "commander";
import { makeAction } from "bosphorus-cli-utils";

const DEFAULT_PORT = 8123;

program
  .version(require("../package.json").version)
  .option("-p, --port", `Port to listen on. Defaults to ${DEFAULT_PORT}`);

program.parse(process.argv);

makeAction(async () => {
  const port =
    program.port || parseInt(process.env.PORT || "0") || DEFAULT_PORT;
  const io = require("socket.io")(port);

  process.stdout.write(`Listening on ${port}\n`);
  const coverageNamespace = io.of("/coverage");
  const controlNamespace = io.of("/control");

  coverageNamespace.on("connection", socket => {
    socket.on("coverage", coverage => {
      controlNamespace.emit("coverage", coverage);
    });
  });

  controlNamespace.on("connection", socket => {
    socket.on("request coverage", () => {
      coverageNamespace.emit("request coverage");
    });
    socket.on("reset coverage", () => {
      coverageNamespace.emit("reset coverage");
    });
  });
})();
