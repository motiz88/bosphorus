import { KeepAwake, registerRootComponent } from "expo";
import App from "./App";
import startCoverageClient from "bosphorus-client";

startCoverageClient();

if (__DEV__) {
  KeepAwake.activate();
}

registerRootComponent(App);
