/* eslint-env jest */

import { SERVER_URL, COVERAGE_VARIABLE, TIMEOUT } from "bosphorus-defaults";
import { resetCoverage, mergeRemoteCoverage } from "bosphorus-test-utils";

export default function setupBosphorus(
  serverUrl = SERVER_URL,
  { coverageVariable, timeout } = {}
) {
  coverageVariable = coverageVariable || COVERAGE_VARIABLE;
  timeout = timeout || TIMEOUT;

  afterEach(async () => {
    await mergeRemoteCoverage(serverUrl, { coverageVariable, timeout });
    await resetCoverage(serverUrl, { timeout });
  });
}
