//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
// create a component
class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, nameIcon, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.wrapButton]}>
          <View style={styles.wrapIcon}>
            <Icon name={nameIcon} size={30} style={styles.icon} />
          </View>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
// define your styles
const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  wrapIcon: {
    height: 50,
    width: 50,
    alignSelf: "center",
    opacity: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    color: "#1E1E1E"
  },
  wrapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    width: SCREEN_WIDTH - 32,
    backgroundColor: "white",
    marginVertical: 10
  },
  text: {
    color: "black",
    fontSize: 22
  }
});

//make this component available to the app
export default Button;
