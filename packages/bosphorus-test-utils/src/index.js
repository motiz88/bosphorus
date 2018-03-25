import io from "socket.io-client";
import { once, onceOrTimeout } from "bosphorus-socket-utils";
import { SERVER_URL, COVERAGE_VARIABLE, TIMEOUT } from "bosphorus-defaults";
import { createCoverageMap } from "istanbul-lib-coverage";

export async function requestCoverage(
  serverUrl = SERVER_URL,
  { timeout } = {}
) {
  timeout = timeout || TIMEOUT;
  const socket = io(serverUrl + "/control");
  try {
    await onceOrTimeout(socket, "connect", timeout);
    socket.emit("request coverage");
    const coverage = await onceOrTimeout(socket, "coverage", timeout);
    return coverage;
  } finally {
    socket.close();
  }
}

export async function resetCoverage(serverUrl = SERVER_URL, { timeout } = {}) {
  timeout = timeout || TIMEOUT;
  const socket = io(serverUrl + "/control");
  try {
    await once(socket, "connect");
    socket.emit("reset coverage");
    await onceOrTimeout(socket, "coverage reset", timeout);
  } finally {
    socket.close();
  }
}

export async function mergeRemoteCoverage(
  serverUrl = SERVER_URL,
  { coverageVariable, timeout } = {}
) {
  coverageVariable = coverageVariable || COVERAGE_VARIABLE;
  timeout = timeout || TIMEOUT;

  const remoteCoverage = await requestCoverage(serverUrl, {
    timeout
  });
  global[coverageVariable] = mergeCoverage(
    global[coverageVariable],
    remoteCoverage
  );
}

function mergeCoverage(local, remote) {
  const combinedMap = createCoverageMap(local);
  combinedMap.merge(remote);
  return JSON.parse(JSON.stringify(combinedMap.data));
}
