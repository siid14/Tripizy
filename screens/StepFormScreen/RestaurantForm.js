import React, { Component } from "react";
import {
  Text,
  KeyboardAvoidingView,
  AsyncStorage,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Fumi } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialsIcon from "react-native-vector-icons/MaterialIcons";
import { FormLabel, FormInput, Rating } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { ImagePicker, Permissions } from "expo";
import config from "../../config";

class RestaurantForm extends Component {
  static navigationOptions = {
    title: "Restaurant",
    headerStyle: {
      backgroundColor: "#37449E",
    },
    headerTintColor: "#fff",
  };

  state = {
    stepId: "",
    stepDate: "",
    category: "Restaurant",
    company_name: "Love restaurant",
    city: "Paris",
    adress: "55 street of Paris",
    start_date: "",
    end_date: "",
    photos: null,
    price: "40",
    rating: undefined,
    web_site: "",
    tel: "",
    description:
      "Protectorum simulans communi iam subinde et cum venerit uti perniciem quaedam est adiumenta uti scribens contentum scribens Syriam et.",
    currency: "USD",
  };

  redirectToLoginPage = () => {
    this.props.navigation.navigate("Login");
  };

  handleSubmit = (event) => {
    AsyncStorage.getItem("token", (err, token) => {
      const {
        stepId,
        stepDate,
        category,
        company_name,
        city,
        adress,
        start_date,
        end_date,
        web_site,
        tel,
        description,
        price,
        currency,
        rating,
        photos,
      } = this.state;

      if (!token) {
        this.redirectToLoginPage();
      } else {
        console.log("PHOTOS :", [photos]);
        axios
          .post(
            `${config.DOMAIN}tips/publish`,
            {
              step_id: stepId,
              category: category,
              company_name: this.state.company_name,
              city: this.state.city,
              adress: this.state.adress,
              start_date: stepDate,
              end_date: stepDate,
              price: this.state.price,
              currency: this.state.currency,
              web_site: this.state.web_site,
              tel: this.state.tel,
              description: this.state.description,
              rate: rating,
              files: [photos],
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            this.props.navigation.navigate("DetailsTravel", {
              category: response.data.category,
              company_name: response.data.company_name,
              city: response.data.city,
              adress: response.data.adress,
              start_date: response.data.start_date,
              end_date: response.data.end_date,
              price: response.data.price,
              currency: response.data.currency,
              web_site: response.data.web_site,
              tel: response.data.tel,
              description: response.data.description,
              photos: response.data.photos,
            });
          })
          .catch((error) => {
            console.log("Nom de l'erreur : ", error);
          });
      }
    });
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    this.setState(
      { photos: "data:image/jpeg;base64," + result.base64 },
      () => {}
    );
  };

  ratingCompleted = (rating) => {
    this.setState({ rating: [Number(rating)] });
    console.log("Rating is: " + rating);
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: "#8781bd" }}>
        <KeyboardAvoidingView behavior="padding">
          <View style={[styles.card2, { backgroundColor: "#8781bd" }]}>
            <Text style={styles.title}>Informations</Text>
            <Fumi
              style={{ borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
              label={"Restaurant Name :"}
              iconClass={MaterialsIcon}
              iconName={"restaurant"}
              iconColor={"#37449E"}
              iconSize={20}
              autoCorrect={false}
              value={this.state.company_name}
              onChangeText={(text) => this.setState({ company_name: text })}
            />
            <Fumi
              label={"City :"}
              iconClass={MaterialsIcon}
              iconName={"place"}
              iconColor={"#37449E"}
              iconSize={20}
              value={this.state.city}
              onChangeText={(text) => this.setState({ city: text })}
            />
            <Fumi
              label={"Adress :"}
              iconClass={MaterialsIcon}
              iconName={"place"}
              iconColor={"#37449E"}
              iconSize={20}
              value={this.state.adress}
              onChangeText={(text) => this.setState({ adress: text })}
            />
            <Fumi
              label={"Price / person :"}
              iconClass={FontAwesomeIcon}
              iconName={"money"}
              iconColor={"#37449E"}
              iconSize={20}
              onChangeText={(value) => this.setState({ price: value })}
              value={this.state.price}
            />

            <Fumi
              label={"Website link :"}
              iconClass={FontAwesomeIcon}
              iconName={"link"}
              iconColor={"#37449E"}
              iconSize={20}
              value={this.state.web_site}
              onChangeText={(text) => this.setState({ web_site: text })}
            />
            <Fumi
              style={{
                marginBottom: 10,
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              label={"Phone Number :"}
              iconClass={FontAwesomeIcon}
              iconName={"phone"}
              iconColor={"#37449E"}
              iconSize={20}
              onChangeText={(value) => this.setState({ tel: value })}
              value={this.state.tel}
            />
            <Text style={styles.title}>Impressions</Text>
            <View style={{ backgroundColor: "white" }}>
              <View style={{ flexDirection: "row" }}>
                <FormLabel>Rating :</FormLabel>
                <Rating
                  startingValue={0}
                  type="heart"
                  onFinishRating={this.ratingCompleted}
                  imageSize={35}
                  style={{
                    paddingVertical: 10,
                    backgroundColor: "white",
                    alignItems: "center",
                  }}
                />
              </View>
              <FormLabel>Describe your experience :</FormLabel>
              <TextInput
                style={styles.descriptionInput}
                multiline={true}
                autoCapitalize="none"
                maxLength={500}
                value={this.state.description}
                onChangeText={(text) => this.setState({ description: text })}
              />
            </View>
            <Text style={styles.title}>Images</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={this.useLibraryHandler}
            >
              <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 40,
    margin: 10,
    backgroundColor: "#37449E",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  descriptionInput: {
    height: 150,
    width: "100%",
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default RestaurantForm;
