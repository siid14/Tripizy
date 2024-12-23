import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import styles from "./styles";

export default class Email extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Travel Books",
    headerStyle: {
      backgroundColor: "#37449E",
    },
    headerTintColor: "#fff",
  });

  state = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  handleSubmit = () => {
    const { email, password, confirmPassword } = this.state;
    const { route } = this.props;

    // Get params from route instead of navigation.state
    const { first_name, last_name, birthday } = route.params;

    try {
      if (!email || !password || !confirmPassword) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      this.props.navigation.navigate("UserPhoto", {
        first_name,
        last_name,
        birthday,
        email,
        password,
        confirmPassword,
      });

      console.log("email", email);
      console.log("password", password);
      console.log("confirmPassword", confirmPassword);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Email and Password</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.email}
            placeholder={"Email"}
            placeholderTextColor="white"
            keyboardType="email-address"
            onChangeText={(value) => {
              this.setState({
                email: value,
              });
            }}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.password}
            placeholder={"Password"}
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(value) => {
              this.setState({
                password: value,
              });
            }}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.confirmPassword}
            placeholder={"Confirm password"}
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(value) => {
              this.setState({
                confirmPassword: value,
              });
            }}
          />
          <TouchableOpacity
            style={[
              styles.button,
              (!this.state.email ||
                !this.state.password ||
                !this.state.confirmPassword) &&
                styles.buttonDisabled,
            ]}
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
