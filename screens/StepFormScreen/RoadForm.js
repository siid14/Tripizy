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
import { useNavigation } from "@react-navigation/native"; // Updated import
import axios from "axios";
import { Fumi } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialsIcon from "react-native-vector-icons/MaterialIcons";
import { FormLabel, FormInput, Rating } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { ImagePicker, Permissions } from "expo";
import config from "../../config";

const RoadForm = () => {
  const navigation = useNavigation(); // Using the hook for navigation

  const [state, setState] = React.useState({
    stepId: "",
    stepDate: "",
    category: "Transport",
    company_name: "",
    city: "",
    adress: "",
    start_date: "",
    end_date: "",
    photos: null,
    price: "",
    rating: undefined,
    web_site: "",
    tel: "",
    description:
      "Protectorum simulans communi iam subinde et cum venerit uti perniciem quaedam est adiumenta uti scribens contentum scribens Syriam et.",
    currency: "USD",
  });

  const redirectToLoginPage = () => {
    navigation.navigate("Login");
  };

  const handleSubmit = (event) => {
    AsyncStorage.getItem("token", (err, token) => {
      if (!token) {
        redirectToLoginPage();
      } else {
        axios
          .post(
            `${config.DOMAIN}tips/publish`,
            {
              step_id: state.stepId,
              category: state.category,
              company_name: state.company_name,
              city: state.city,
              adress: state.adress,
              start_date: state.stepDate,
              end_date: state.stepDate,
              price: state.price,
              currency: state.currency,
              web_site: state.web_site,
              tel: state.tel,
              description: state.description,
              rate: state.rating,
              files: [state.photos],
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            navigation.navigate("DetailsTravel", {
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

  const askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  const useLibraryHandler = async () => {
    await askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    setState({ ...state, photos: "data:image/jpeg;base64," + result.base64 });
  };

  const ratingCompleted = (rating) => {
    setState({ ...state, rating: [Number(rating)] });
    console.log("Rating is: " + rating);
  };

  return (
    <ScrollView style={{ backgroundColor: "#a9ceca" }}>
      <KeyboardAvoidingView behavior="padding">
        <View style={[styles.card2, { backgroundColor: "#a9ceca" }]}>
          <Text style={styles.title}>Informations</Text>
          <Fumi
            style={{ borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
            label={"Type of transport :"}
            iconClass={FontAwesomeIcon}
            iconName={"road"}
            iconColor={"#37449E"}
            iconSize={20}
            autoCorrect={false}
            value={state.company_name}
            onChangeText={(text) => setState({ ...state, company_name: text })}
          />
          <Fumi
            label={"From : :"}
            iconClass={MaterialsIcon}
            iconName={"place"}
            iconColor={"#37449E"}
            iconSize={20}
            value={state.city}
            onChangeText={(text) => setState({ ...state, city: text })}
          />
          <Fumi
            label={"To :"}
            iconClass={MaterialsIcon}
            iconName={"place"}
            iconColor={"#37449E"}
            iconSize={20}
            value={state.adress}
            onChangeText={(text) => setState({ ...state, adress: text })}
          />
          <Fumi
            label={"Price / person :"}
            iconClass={FontAwesomeIcon}
            iconName={"money"}
            iconColor={"#37449E"}
            iconSize={20}
            onChangeText={(value) => setState({ ...state, price: value })}
            value={state.price}
          />

          <Fumi
            label={"Website link :"}
            iconClass={FontAwesomeIcon}
            iconName={"link"}
            iconColor={"#37449E"}
            iconSize={20}
            value={state.web_site}
            onChangeText={(text) => setState({ ...state, web_site: text })}
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
            onChangeText={(value) => setState({ ...state, tel: value })}
            value={state.tel}
          />
          <Text style={styles.title}>Impressions</Text>
          <View style={{ backgroundColor: "white" }}>
            <View style={{ flexDirection: "row" }}>
              <FormLabel>Rating :</FormLabel>
              <Rating
                startingValue={0}
                type="heart"
                onFinishRating={ratingCompleted}
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
              placeholder={"Tell us everything about your experience! ;)"}
              value={state.description}
              onChangeText={(text) => setState({ ...state, description: text })}
            />
          </View>
          <View style={{ marginTop: 5, alignItems: "center" }}>
            <Button
              title="Pick an image from camera roll"
              onPress={useLibraryHandler}
            />
            {state.photos && (
              <Image
                source={{ uri: state.photos }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    alignContent: "center",
  },
  card2: {
    padding: 16,
  },
  title: {
    paddingBottom: 16,
    textAlign: "center",
    color: "#404d5b",
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.8,
  },
  descriptionInput: {
    fontSize: 18,
    marginLeft: 12,
    marginRight: 12,
    top: 5,
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#37449E",
    height: 50,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const datePickerCustomStyle = {
  dateIcon: {
    position: "absolute",
    left: 0,
    top: 4,
    marginLeft: 0,
  },
  dateInput: {
    marginLeft: 36,
  },
  placeholderText: {
    color: "grey",
  },
  dateText: {
    color: "#37449E",
  },
};

export default RoadForm;
