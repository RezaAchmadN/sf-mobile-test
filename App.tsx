import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "@reach/router";
import Main from "./src/pages/Main";
import { Styles } from "./Styles";

export default function App(props: any): JSX.Element {
  return (
    <View style={Styles.root}>
      <React.Fragment>
        <Main />
        {props.children}
      </React.Fragment>
    </View>
  );
}
