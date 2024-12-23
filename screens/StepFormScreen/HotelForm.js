import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { Fumi } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialsIcon from "react-native-vector-icons/MaterialIcons";
import { FormLabel, Rating } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import Moment from "moment";
import config from "../../config";

const HotelForm = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [state, setState] = useState({
    stepId: "",
    stepDate: "",
    category: "Hotel",
    company_name: "Love Hotel",
    city: "Paris",
    adress: "Love avenue",
    start_date: "",
    end_date: "",
    night: "",
    photos: null,
    price: "30",
    rating: undefined,
    web_site: "",
    tel: "",
    description: "Protectorum simulans communi...",
    currency: "USD",
  });

  useEffect(() => {
    if (route.params) {
      setState((prevState) => ({
        ...prevState,
        stepId: route.params.stepId,
        stepDate: route.params.stepDate,
      }));
    }
  }, [route.params]);

  const handleSubmit = (event) => {
    // Handle submit logic
  };

  return (
    <ScrollView style={{ backgroundColor: "#a9ceca" }}>
      <KeyboardAvoidingView behavior="padding">
        <View style={[styles.card2, { backgroundColor: "#a9ceca" }]}>
          <Fumi
            label={"Hotel Name:"}
            iconClass={MaterialsIcon}
            iconName={"hotel"}
            iconColor={"#37449E"}
            iconSize={20}
            value={state.company_name}
            onChangeText={(text) =>
              setState((prev) => ({ ...prev, company_name: text }))
            }
          />
          <Fumi
            label={"City:"}
            iconClass={MaterialsIcon}
            iconName={"place"}
            iconColor={"#37449E"}
            iconSize={20}
            value={state.city}
            onChangeText={(text) =>
              setState((prev) => ({ ...prev, city: text }))
            }
          />
          <Fumi
            label={"Address:"}
            iconClass={MaterialsIcon}
            iconName={"map"}
            iconColor={"#37449E"}
            iconSize={20}
            value={state.adress}
            onChangeText={(text) =>
              setState((prev) => ({ ...prev, adress: text }))
            }
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <DatePicker
              style={{ width: 150 }}
              date={state.start_date}
              mode="date"
              placeholder="Check-in"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={datePickerCustomStyle}
              onDateChange={(date) =>
                setState((prev) => ({ ...prev, start_date: date }))
              }
            />
            <DatePicker
              style={{ width: 150 }}
              date={state.end_date}
              mode="date"
              placeholder="Check-out"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={datePickerCustomStyle}
              onDateChange={(date) =>
                setState((prev) => ({ ...prev, end_date: date }))
              }
            />
          </View>
          <Fumi
            label={"Price per night:"}
            iconClass={FontAwesomeIcon}
            iconName={"money"}
            iconColor={"#37449E"}
            iconSize={20}
            value={state.price}
            onChangeText={(text) =>
              setState((prev) => ({ ...prev, price: text }))
            }
          />
          <Fumi
            label={"Website:"}
            iconClass={FontAwesomeIcon}
            iconName={"link"}
            iconColor={"#37449E"}
            iconSize={20}
            value={state.web_site}
            onChangeText={(text) =>
              setState((prev) => ({ ...prev, web_site: text }))
            }
          />
          <Fumi
            label={"Phone:"}
            iconClass={FontAwesomeIcon}
            iconName={"phone"}
            iconColor={"#37449E"}
            iconSize={20}
            value={state.tel}
            onChangeText={(text) =>
              setState((prev) => ({ ...prev, tel: text }))
            }
          />
          <View
            style={{ backgroundColor: "white", padding: 10, marginTop: 10 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ marginRight: 10 }}>Rating:</Text>
              <Rating
                startingValue={state.rating || 0}
                type="heart"
                onFinishRating={(rating) =>
                  setState((prev) => ({ ...prev, rating }))
                }
                imageSize={35}
              />
            </View>
            <Text style={{ marginTop: 10 }}>Description:</Text>
            <TextInput
              style={styles.descriptionInput}
              multiline={true}
              numberOfLines={4}
              value={state.description}
              onChangeText={(text) =>
                setState((prev) => ({ ...prev, description: text }))
              }
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("DetailsTravel")}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card2: {
    padding: 16,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#37449E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
    borderColor: "#37449E",
    borderRadius: 5,
  },
  placeholderText: {
    color: "gray",
  },
  dateText: {
    color: "#37449E",
  },
};

export default HotelForm;
