//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

// create a component
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4267B2',
    },
});

//make this component available to the app
export default Login;
