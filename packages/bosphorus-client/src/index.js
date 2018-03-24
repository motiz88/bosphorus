import io from "socket.io-client";

export default function startCoverageClient(
  serverUrl = "http://localhost:8123",
  { coverageVariable } = {}
) {
  coverageVariable = coverageVariable || "__coverage__";
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
  });
}
