import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Image,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Updated import
import styles from "./styles";

export default class Photos extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Travel Books",
    headerStyle: {
      backgroundColor: "#37449E",
    },
    headerTintColor: "#fff",
  });

  state = {
    profile_pic: null,
  };

  handleSubmit = () => {
    const { profile_pic } = this.state;
    const { route } = this.props; // Get route prop

    try {
      // Access params through route.params
      const {
        first_name,
        last_name,
        birthday,
        email,
        password,
        confirmPassword,
      } = route.params;

      if (profile_pic) {
        this.props.navigation.navigate("Address", {
          first_name,
          last_name,
          birthday,
          email,
          password,
          confirmPassword,
          profile_pic,
        });
        console.log("profile_pic", profile_pic);
      } else {
        Alert.alert("Error", "Please select a profile picture");
      }
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  askPermissionsAsync = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Sorry",
          "We need camera roll permissions to make this work!"
        );
        return false;
      }
      return true;
    } catch (error) {
      console.log("Permission Error:", error);
      return false;
    }
  };

  useLibraryHandler = async () => {
    const hasPermission = await this.askPermissionsAsync();
    if (!hasPermission) return;

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled && result.assets?.[0]?.base64) {
        this.setState({
          profile_pic: `data:image/jpeg;base64,${result.assets[0].base64}`,
        });
      }
    } catch (error) {
      console.log("Image Picker Error:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  render() {
    const { profile_pic } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Profile Picture</Text>

        <Button
          title="Pick an image from camera roll"
          onPress={this.useLibraryHandler}
        />

        {profile_pic && (
          <Image
            source={{ uri: profile_pic }}
            style={{ width: 200, height: 200, marginVertical: 20 }}
            resizeMode="cover"
          />
        )}

        <TouchableOpacity
          style={[styles.button, !profile_pic && styles.buttonDisabled]}
          onPress={this.handleSubmit}
          disabled={!profile_pic}
        >
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
