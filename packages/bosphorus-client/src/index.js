import io from "socket.io-client";

import { SERVER_URL, COVERAGE_VARIABLE } from "bosphorus-defaults";

export default function startCoverageClient(
  serverUrl = SERVER_URL,
  { coverageVariable } = {}
) {
  coverageVariable = coverageVariable || COVERAGE_VARIABLE;
  const socket = io(serverUrl + "/coverage");
  socket.on("request coverage", () => {
    socket.emit("coverage", global[coverageVariable]);
  });
  socket.on("reset coverage", () => {
    let i = null;
    let coverage = null;
    let f = null;
    if (
      typeof global[coverageVariable] !== "undefined" &&
      global[coverageVariable] !== null
    ) {
      for (f in global[coverageVariable]) {
        coverage = global[coverageVariable][f];
        for (i in coverage.b) {
          coverage.b[i] = [0, 0];
        }
        for (i in coverage.f) {
          coverage.f[i] = 0;
        }
        for (i in coverage.s) {
          coverage.s[i] = 0;
        }
      }
    }
    socket.emit("coverage reset");
  });
}
