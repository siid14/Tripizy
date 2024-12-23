import React, { Component, Fragment } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import axios from "axios";
import config from "../../config";
import TravelBookCard from "../../components/TravelBookCard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Fixed import

const countries = require("../SignupStepsScreen/AddressScreen/data/Countries.json");

export default class MyTripsScreen extends Component {
  static navigationOptions = {
    header: null,
    title: "Travel Books",
    headerStyle: {
      backgroundColor: "#37449E",
    },
    headerTintColor: "#fff",
  };

  state = {
    travelbooks: [],
    mounted: false,
    currentUserToken: [],
    countries: [],
  };

  componentDidMount() {
    console.log("didmount");
    console.log(`${config.DOMAIN}travelbook/mytrips`);
    AsyncStorage.getItem("token", (err, token) => {
      axios
        .get(`${config.DOMAIN}travelbook/mytrips`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response mytrips", response.data);
          this.setState({
            travelbooks: response.data,
            currentUserToken: token,
            mounted: true,
          });
        });
    });
    this.setState({ countries });
  }

  render() {
    const { mounted, travelbooks, currentUserToken } = this.state;
    if (this.state.countries.length && mounted) {
      return (
        <Fragment>
          <ScrollView style={styles.container}>
            <View>
              <FlatList
                data={travelbooks}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.itemContainer}
                      onPress={() =>
                        this.props.navigation.navigate("DetailsTravel", {
                          id: item._id,
                        })
                      }
                    >
                      <TravelBookCard
                        {...item}
                        navigation={this.props.navigation}
                        currentUserToken={currentUserToken}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>

          {/* Custom Floating Action Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              this.props.navigation.navigate("TitleAndDescription", {
                travelbooks: this.state.travelbooks,
              })
            }
          >
            <MaterialIcons name="add-circle" style={styles.actionButtonIcon} />
          </TouchableOpacity>
        </Fragment>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.loading}>Loading ...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  loading: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
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
  actionButtonIcon: {
    fontSize: 24,
    height: 24,
    color: "white",
  },
});
