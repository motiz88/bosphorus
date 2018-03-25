#!/usr/bin/env node

import program from "commander";
import { makeAction } from "bosphorus-cli-utils";

import { SERVER_PORT } from "bosphorus-defaults";

program
  .version(require("../package.json").version)
  .option("-p, --port", `Port to listen on. Defaults to ${SERVER_PORT}`);

program.parse(process.argv);

makeAction(async () => {
  const port = program.port || parseInt(process.env.PORT || "0") || SERVER_PORT;
  const io = require("socket.io")(port);

  process.stdout.write(`Listening on ${port}\n`);
  const coverageNamespace = io.of("/coverage");
  const controlNamespace = io.of("/control");

  coverageNamespace.on("connection", socket => {
    socket.on("coverage", coverage => {
      controlNamespace.emit("coverage", coverage);
    });
    socket.on("coverage reset", coverage => {
      controlNamespace.emit("coverage reset", coverage);
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
