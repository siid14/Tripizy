import React, { Component, Fragment } from "react";
import {
  TouchableOpacity,
  View,
  AsyncStorage,
  FlatList,
  ScrollView,
} from "react-native";
import TipsCard from "../../components/TipsCard";
import axios from "axios";
import SelectCategory from "./TipsFilter";
import config from "../../config";
import { SearchBar } from "react-native-elements";

export default class TipsListTest extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    tips: [],
    city: "",
    companyName: "",
    category: "",
    token: undefined,
  };

  onChangeSearchCity = (city) => {
    this.setState({ city: city });
    axios
      .get(`${config.DOMAIN}tips/`, {
        params: {
          city: city,
          company_name: this.state.companyName,
          category: this.state.category,
        },
        headers: {
          authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        this.setState({
          tips: response.data,
        });
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  onChangeSearchCompanyName = (companyName) => {
    this.setState({ companyName: companyName });
    axios
      .get(`${config.DOMAIN}tips/`, {
        params: {
          company_name: companyName,
          city: this.state.city,
          category: this.state.category,
        },
        headers: {
          authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        this.setState({
          tips: response.data,
        });
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  _keyExtractor = (item, index) => item._id;

  handleCategory = (category) => {
    this.setState({ category: category });
    axios
      .get(`${config.DOMAIN}tips/`, {
        params: {
          company_name: this.state.companyName,
          city: this.state.city,
          category: category,
        },
        headers: {
          authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        this.setState({
          tips: response.data,
        });
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  render() {
    return (
      <Fragment>
        <SearchBar
          lightTheme
          onChangeText={this.onChangeSearchCity}
          placeholder="City"
          placeholderTextColor="#AAAAAA"
          clearIcon={{ color: "#AAAAAA" }}
          inputStyle={{ backgroundColor: "white" }}
        />

        <View style={{ backgroundColor: "#a9ceca" }}>
          <SelectCategory handleCategory={this.handleCategory} />
        </View>

        <ScrollView style={{ backgroundColor: "#a9ceca" }}>
          <FlatList
            style={{ margin: 5 }}
            data={this.state.tips}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("TipsPage", {
                        id: item._id,
                      })
                    }
                  >
                    <TipsCard id={item._id} />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </ScrollView>
      </Fragment>
    );
  }

  componentDidMount() {
    AsyncStorage.getItem("token", (err, token) => {
      axios
        .get(`${config.DOMAIN}tips/`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.setState({
            tips: response.data,
            token: token,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
