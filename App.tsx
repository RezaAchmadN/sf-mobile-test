import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "@reach/router";
import Main from "./src/pages/Main";

export default function App(props: any): JSX.Element {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View>
          <Text>Mobile Test Smartfren</Text>
        </View>
        <View>
          <Main/>
        </View>
      </View>
      {props.children}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
