import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./styles";

export default class NamesAndBirthday extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#37449E",
    },
    headerTintColor: "#fff",
  });

  state = {
    first_name: "",
    last_name: "",
    birthday: new Date(),
    showDatePicker: false,
  };

  handleSubmit = (text) => {
    const { first_name, last_name, birthday } = this.state;

    if (first_name !== "" && first_name && last_name !== "" && last_name) {
      this.props.navigation.navigate("Email", {
        first_name: first_name,
        last_name: last_name,
        birthday: birthday.toISOString().split("T")[0], // Format as YYYY-MM-DD
      });
      console.log("first_name", first_name);
      console.log("last_name", last_name);
      console.log("birthday", birthday);
    }
  };

  showDatepicker = () => {
    this.setState({ showDatePicker: true });
  };

  onDateChange = (event, selectedDate) => {
    this.setState({ showDatePicker: false });
    if (selectedDate) {
      this.setState({ birthday: selectedDate });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>First Name</Text>
          <TextInput
            style={styles.input}
            value={this.state.first_name}
            placeholder={"First Name"}
            placeholderTextColor="white"
            onChangeText={(value) => {
              this.setState({
                first_name: value,
              });
            }}
          />
          <Text style={styles.title}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={this.state.last_name}
            placeholder={"Last Name"}
            placeholderTextColor="white"
            onChangeText={(value) => {
              this.setState({
                last_name: value,
              });
            }}
          />
          <Text style={styles.title}>Birthday</Text>

          <TouchableOpacity
            style={[styles.input, { justifyContent: "center" }]}
            onPress={this.showDatepicker}
          >
            <Text style={{ color: "white" }}>
              {this.state.birthday.toISOString().split("T")[0]}
            </Text>
          </TouchableOpacity>

          {this.state.showDatePicker && (
            <DateTimePicker
              value={this.state.birthday}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              minimumDate={new Date(1928, 0, 1)}
              maximumDate={new Date(2018, 0, 1)}
              onChange={this.onDateChange}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
