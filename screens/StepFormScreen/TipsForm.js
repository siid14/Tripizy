import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  StyleSheet,
  View,
} from "react-native";
import axios from "axios";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

export default class TipsForm extends Component {
  static navigationOptions = {
    title: "Add a cart",
    headerStyle: {
      backgroundColor: "#37449E",
    },
    headerTintColor: "#fff",
  };

  state = {
    category: "",
  };

  redirectToLoginPage = () => {
    this.props.navigation.navigate("Login");
  };

  handleSubmit = (text) => {
    AsyncStorage.getItem("token", (err, token) => {
      if (!token) {
        this.redirectToLoginPage();
      } else {
        this.props.navigation.navigate("HotelForm", {
          category: this.state.category,
          stepId: this.props.navigation.state.params.stepId,
        });
      }
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.hint}>Select a Category :</Text>
        <View style={styles.category}>
          <TouchableOpacity
            style={styles.iconFrame}
            onPress={() =>
              this.props.navigation.navigate("FreeForm", {
                stepId: this.props.navigation.state.params.stepId,
                stepDate: this.props.navigation.state.params.stepDate,
              })
            }
          >
            <FontAwesomeIcon name="pencil" size={50} color="#37449E" />
            <Text style={styles.iconText}>Free Text</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconFrame}
            onPress={() =>
              this.props.navigation.navigate("HotelForm", {
                stepId: this.props.navigation.state.params.stepId,
                stepDate: this.props.navigation.state.params.stepDate,
              })
            }
          >
            <FontAwesomeIcon name="hotel" size={50} color="#37449E" />
            <Text style={styles.iconText}>Hotel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconFrame}
            onPress={() =>
              this.props.navigation.navigate("RestaurantForm", {
                stepId: this.props.navigation.state.params.stepId,
                stepDate: this.props.navigation.state.params.stepDate,
              })
            }
          >
            <MaterialIconsIcon name="restaurant" size={50} color="#37449E" />
            <Text style={styles.iconText}>Restaurant</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.category}>
          <TouchableOpacity
            style={styles.iconFrame}
            onPress={() =>
              this.props.navigation.navigate("RoadForm", {
                stepId: this.props.navigation.state.params.stepId,
                stepDate: this.props.navigation.state.params.stepDate,
              })
            }
          >
            <FontAwesomeIcon name="road" size={50} color="#37449E" />
            <Text style={styles.iconText}>Road</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconFrame}
            onPress={() =>
              this.props.navigation.navigate("BeachForm", {
                stepId: this.props.navigation.state.params.stepId,
                stepDate: this.props.navigation.state.params.stepDate,
              })
            }
          >
            <MaterialIconsIcon name="beach-access" size={50} color="#37449E" />
            <Text style={styles.iconText}>Beach</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconFrame}>
            <MaterialIconsIcon
              name="directions-bike"
              size={50}
              color="#37449E"
            />
            <Text style={styles.iconText}>Activity</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.category}>
          <View style={styles.iconFrame}>
            <MaterialIconsIcon name="directions-boat" size={50} color="grey" />
            <Text style={styles.iconText}>Boat</Text>
          </View>
          <View style={styles.iconFrame}>
            <EntypoIcon name="baidu" size={45} color="grey" />
            <Text style={styles.iconText}>Animals</Text>
          </View>
          <View style={styles.iconFrame}>
            <FontAwesomeIcon name="fort-awesome" size={50} color="grey" />
            <Text style={styles.iconText}>Historic</Text>
          </View>
        </View>

        <View style={styles.category}>
          <View style={styles.iconFrame}>
            <FontAwesomeIcon name="binoculars" size={50} color="grey" />
            <Text style={styles.iconText}>See Point</Text>
          </View>
          <View style={styles.iconFrame}>
            <EntypoIcon name="drink" size={45} color="grey" />
            <Text style={styles.iconText}>Bar/Club</Text>
          </View>
          <View style={styles.iconFrame}>
            <FontAwesomeIcon name="picture-o" size={50} color="grey" />
            <Text style={styles.iconText}>Free Pics</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a9ceca",
    alignItems: "center",
  },
  hint: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 20,
    color: "#37449E",
  },
  category: {
    marginTop: 15,
    width: 280,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconFrame: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 70,
    minHeight: 70,
    borderRadius: 10,
    elevation: 3,
    margin: 10,
    padding: 5,
  },
  iconText: {
    fontFamily: "Arial",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
});
