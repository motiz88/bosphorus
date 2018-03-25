/* global jasmine: false */

import setupBosphorus from "bosphorus-jest";
import detox from "detox";
import pkg from "../package.json";
const config = pkg.detox;

setupBosphorus();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

beforeAll(async () => {
  await detox.init(config);
});

afterAll(async () => {
  await detox.cleanup();
});
