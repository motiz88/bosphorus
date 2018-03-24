# bosphorus

Code coverage for remotely executed tests, powered by [IstanbulJS](https://istanbul.js.org/).

> 🛑 This is pre-alpha, practically _imaginary_ software. Proceed at your own risk.

## What

Bosphorus is:

* `bosphorus-client`, a utility exposing coverage data from a running JavaScript process. Put this in your [`babel-plugin-istanbul`](https://github.com/istanbuljs/babel-plugin-istanbul)-instrumented app.
* `bosphorus-cli`, a command-line tool for requesting coverage data from your app and generating reports.
* `bosphorus-server`, a proxy that lets `bosphorus-cli` and `bosphorus-client` communicate with each other.

See [`examples/expo-app`](https://github.com/motiz88/bosphorus/tree/master/examples/expo-app) for a basic example that generates coverage reports on demand from a running React Native app.

## Why

The motivation for this, ultimately, is solving [wix/detox#470](https://github.com/wix/detox/issues/470).

[Detox](https://github.com/wix/detox) is a testing framework for [React Native](https://facebook.github.io/react-native/) that runs tests on actual devices/simulators, making it particularly suitable for end-to-end testing alongside a conventional unit test suite running in Node. However, unlike the commonly used unit testing solutions, Detox doesn't currently provide coverage reports.

A design goal of Bosphorus (when it's done) is to be very easy to integrate with a Detox end-to-end test suite.
