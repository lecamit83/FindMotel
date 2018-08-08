//import liraries
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TextInput,
  Easing,
  Text,
  TouchableOpacity
} from "react-native";
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateVertical: new Animated.Value(0),
      animatedOpacityForm: new Animated.Value(0)
    };
  }
  render() {
    const { animateVertical, animatedOpacityForm } = this.state;
    return (
      <View style={styles.container}>
        <Animatable.View
          style={[styles.wrapIconLogo, { marginTop: animateVertical }]}
        >
          <Icon name="facebook" size={40} style={styles.iconLogo} />
        </Animatable.View>
        <Animatable.View
          style={[styles.wrapForm, { opacity: animatedOpacityForm }]}
        >
          <View style={styles.wrapInput}>
            <View style={styles.wrapIcon}>
              <Icon name="phone" size={30} style={styles.icon} />
            </View>
            <TextInput style={styles.input} placeholder="Phone Number" />
          </View>
          <View style={styles.wrapInput}>
            <View style={styles.wrapIcon}>
              <Icon name="lock" size={30} style={styles.icon} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
          <Button
            title="ĐĂNG NHẬP"
            nameIcon="sign-in"
            onPress={() => console.log("AA")}
          />
          <View style={styles.wrapText}>
            <TouchableOpacity>
              <Text style={styles.text}>Đăng Kí Tài Khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.text}>Quên Mật Khẩu?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapLine}>
            <View style={styles.line} />
            <View>
              <Text style={styles.text}>Hoặc</Text>
            </View>
            <View style={styles.line} />
          </View>
          <Button
            title="Đăng nhập bằng Facebook"
            nameIcon="facebook"
            onPress={() => this._authentificatinWithFacebook()}
          />
        </Animatable.View>
      </View>
    );
  }
  _authentificatinWithFacebook() {
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      result => {
        if (result.isCancelled) {
          alert("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error)
                alert('Error fetching data: ' + error.toString());
              } else {
                console.log(result)
                alert('Success fetching data: ' + result.toString());
              }
            }
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name'
                  }
                }
              },
              responseInfoCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      error => alert("Login fail with error: " + error)
    );
  }
  componentDidMount() {
    const iconLogo = Animated.timing(this.state.animateVertical, {
      toValue: -SCREEN_HEIGHT / 2,
      duration: 3000,
      easing: Easing.exp
    });
    const form = Animated.timing(this.state.animatedOpacityForm, {
      toValue: 1,
      duration: 1000,
      easing: Easing.exp
    });
    Animated.sequence([iconLogo, form]).start();
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4267B2"
  },
  wrapIconLogo: {
    height: 50,
    width: 50,
    backgroundColor: "white",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderRadius: 4
  },
  iconLogo: {
    marginRight: 8,
    color: "#4267B2"
  },
  wrapForm: {
    position: "absolute",
    bottom: 0,
    margin: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  wrapInput: {
    width: SCREEN_WIDTH - 32,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    borderRadius: 4
  },
  input: {
    width: SCREEN_WIDTH - 82,
    backgroundColor: "white"
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
  text: {
    color: "white",
    fontSize: 16
  },
  wrapText: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SCREEN_WIDTH - 32
  },
  wrapLine: {
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  line: {
    height: 1,
    backgroundColor: "white",
    width: (SCREEN_WIDTH * 4) / 10
  }
});

//make this component available to the app
export default LoginScreen;
