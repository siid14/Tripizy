import React, { Component, Fragment } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import TravelBookCard from "../../components/TravelBookCard";
import config from "../../config";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SearchBar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COUNTRIES = require("../SignupStepsScreen/AddressScreen/data/Countries.json");
const COUNTRIESLABELS = COUNTRIES.map((country) => country.label);

export default class ListScreen extends React.Component {
  state = {
    travelbooks: [],
    currentUserToken: [],
    mounted: false,
    token: undefined,
    country: "",
    alltravelbooks: [],
  };

  handleSubmit = () => {
    this.props.navigation.navigate("TitleAndDescription", {
      travelbooks: this.state.travelbooks,
    });
  };

  onChangeSearchCountry = (country) => {
    if (COUNTRIESLABELS.indexOf(country) !== -1) {
      this.setState({ country });
      axios
        .get(`${config.DOMAIN}travelbook/`, {
          params: { country: COUNTRIESLABELS.indexOf(country) },
          headers: { authorization: `Bearer ${this.state.token}` },
        })
        .then((response) => {
          this.setState({ travelbooks: response.data });
        })
        .catch((err) => {
          console.log("Error", err.message);
        });
    } else {
      this.setState({ travelbooks: this.state.alltravelbooks });
    }
  };

  componentDidMount() {
    AsyncStorage.getItem("token")
      .then((token) => {
        if (!token) throw new Error("Token not found");
        return axios.get(`${config.DOMAIN}travelbook/`, {
          headers: { authorization: `Bearer ${token}` },
        });
      })
      .then((response) => {
        this.setState({
          travelbooks: response.data,
          alltravelbooks: response.data,
          currentUserToken: token,
          mounted: true,
          token,
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={localStyles.itemContainer}
      onPress={() =>
        this.props.navigation.navigate("DetailsTravel", { id: item._id })
      }
    >
      <TravelBookCard
        {...item}
        navigation={this.props.navigation}
        currentUserToken={this.state.currentUserToken}
        userId={item.user_id._id}
      />
    </TouchableOpacity>
  );

  render() {
    const { travelbooks } = this.state;

    return (
      <Fragment>
        <SearchBar
          lightTheme
          onChangeText={this.onChangeSearchCountry}
          placeholder="Country"
          placeholderTextColor="#AAAAAA"
          inputContainerStyle={{ backgroundColor: "white" }}
          inputStyle={{ color: "black" }}
        />
        <ScrollView style={localStyles.container}>
          <View>
            <FlatList
              data={travelbooks}
              keyExtractor={(item, index) => item?._id || index.toString()}
              renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={localStyles.addButton}
          onPress={this.handleSubmit}
        >
          <MaterialIcons
            name="add-circle"
            style={localStyles.actionButtonIcon}
          />
        </TouchableOpacity>
      </Fragment>
    );
  }
}

const localStyles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 24,
    height: 24,
    color: "white",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    backgroundColor: "#37449E",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
});
