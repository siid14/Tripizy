import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
// import styles from "./styles";
import axios from "axios";

class TitleAndDescription extends Component {
  static navigationOptions = {
    title: "Title and Description",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#002982"
    },
    headerTitleStyle: {
      fontSize: 24,
      color: "white",
      fontWeight: "200"
    }
  };

  state = {
    title: "",
    description: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  redirectToLoginPage = () => {
    this.props.navigation.navigate("Login");
  };

  handleSubmit = event => {
    const { title, description } = this.state;

    if (!this.props.user.token) {
      this.redirectToLoginPage();
    } else {
      axios
        .post(
          "http://localhost:3000/travelbook/publish",
          {
            title,
            description
          },
          {
            headers: {
              authorization: `Bearer ${this.props.user.token}`
            }
          }
        )
        .then(response => {
          console.log("response", response.data);
          this.props.navigation.navigate("Country", {
            _id: response.data._id,
            title: response.data.title,
            description: response.data.description
          });
        })
        .catch(error => {
          console.log(error);
        });
      event.preventDefault();
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>CREATE A TRAVEL BOOK</Text>
        <Text style={styles.hint}>What is the title of your travel book ?</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={this.state.title}
          placeholder={"ex : Honeymoon in Sri Lanka"}
          onChange={this.handleChange}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={this.state.description}
          placeholder={"Description"}
          onChange={this.handleChange}
        />

        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default TitleAndDescription;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 30,
    color: "white"
  },
  hint: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  },
  container: {
    flex: 1,
    backgroundColor: "#0040cc",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: 250,
    height: 60,
    color: "white",
    borderColor: "white",
    borderBottomWidth: 1,
    paddingLeft: 10,
    alignItems: "center"
  },
  button: {
    marginTop: 20,
    backgroundColor: "grey",
    height: 50,
    width: 250,
    justifyContent: "center",
    borderColor: "white",
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  }
});