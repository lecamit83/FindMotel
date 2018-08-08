/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";

import Splash from "./views/screens/Splash";

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Splash />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
