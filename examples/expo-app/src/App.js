/* @flow */

import * as React from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";

type State = { pressed: boolean };

export default class App extends React.Component<void, State> {
  state = {
    pressed: false
  };

  _handleButtonPress = () => {
    this.setState({ pressed: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this._handleButtonPress}
          disabled={this.state.pressed}
          title={
            this.state.pressed
              ? "Coverage increased!"
              : "Press me to increase coverage"
          }
        />
        <Text>
          Make sure <Code>bosphorus-server</Code> is running, then go to{" "}
          <Code>examples/expo-app</Code> and run <Code>npm run coverage</Code>{" "}
          to get a coverage report.
        </Text>
      </View>
    );
  }
}

const Code = ({ children }: { children: React.Node }) => (
  <Text style={styles.code}>{children}</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  code: {
    fontFamily: Platform.select({ android: "monospace", ios: "Courier New" })
  }
});
