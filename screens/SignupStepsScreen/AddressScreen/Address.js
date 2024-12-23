import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
const countries = require("./data/Countries.json");
import styles from "./styles";
import config from "../../../config";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    color: "white",
    backgroundColor: "transparent",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    color: "white",
    backgroundColor: "transparent",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default class Address extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Travel Books",
    headerStyle: {
      backgroundColor: "#37449E",
    },
    headerTintColor: "#fff",
  });

  state = {
    address: "",
    city: "",
    countries: [],
    nationality: 77,
  };

  handleSubmit = (text) => {
    const { address, city, nationality } = this.state;
    const {
      first_name,
      last_name,
      birthday,
      email,
      password,
      confirmPassword,
      profile_pic,
    } = this.props.route.params; // Changed from navigation.state.params to route.params

    if (nationality) {
      axios
        .post(`${config.DOMAIN}user/sign_up`, {
          first_name,
          last_name,
          birthday: Date.parse(birthday),
          email,
          password,
          confirmPassword,
          address,
          city,
          files: [profile_pic],
          nationality,
        })
        .then((response) => {
          console.log("response", response.data);

          this.props.navigation.navigate("List", {
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            birthday: response.data.birthday,
            email: response.data.email,
            password: response.data.password,
            confirmPassword: response.data.confirmPassword,
            photos: response.data.photos,
            category: response.data.category,
            address: response.data.address,
            city: response.data.city,
            profile_pic: response.data.profile_pic,
            nationality: response.data.nationality,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    this.setState({ countries });
  }

  render() {
    if (this.state.countries.length) {
      return (
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.container}
        >
          <View style={[styles.form]}>
            <Text style={styles.title}>Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={this.state.address} // Fixed typo in state property name
              placeholder={"Address"}
              placeholderTextColor="white"
              onChangeText={(value) => {
                this.setState({
                  address: value,
                });
              }}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={this.state.city}
              placeholder={"City"}
              placeholderTextColor="white"
              onChangeText={(value) => {
                this.setState({
                  city: value,
                });
              }}
            />
            <View style={[styles.viewSelect]}>
              <RNPickerSelect
                style={pickerSelectStyles}
                value={this.state.nationality}
                items={this.state.countries}
                onValueChange={(value) => {
                  console.log(value);
                  this.setState({
                    nationality: value,
                  });
                }}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}
