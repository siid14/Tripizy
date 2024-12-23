import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { Rating } from "react-native-elements";
import config from "../../config";
import Moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";

// Import MapView differently to avoid font scaling issue
const MapView = require("react-native-maps").default;
const { Marker } = require("react-native-maps");

export default class TipsPage extends React.Component {
  state = {
    travelbook: {},
    steps: [],
    tip: {},
    user: {},
    mounted: false,
    userId: undefined,
    travelBookUserId: undefined,
  };

  componentDidMount() {
    this.fetchTipData();
  }

  fetchTipData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!this.props.route?.params) {
        return;
      }
      const { id } = this.props.route.params;

      // First API call for tips
      const tipResponse = await axios.get(`${config.DOMAIN}tips/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      this.setState({
        tip: tipResponse.data,
      });

      // Second API call for user data
      const userResponse = await axios.get(`${config.DOMAIN}user/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      this.setState({
        user: userResponse.data,
        mounted: true,
      });
    } catch (error) {
      console.error("Error fetching tip data:", error);
    }
  };

  renderProfilePage(user_id) {
    if (user_id) {
      if (user_id.token !== this.props.currentUserToken) {
        this.props.navigation.navigate("UserProfile", {
          user: this.props.userId,
        });
      } else {
        this.props.navigation.navigate("MyProfile");
      }
    }
  }

  renderTipsPictures = () => {
    if (this.state.mounted && this.state.tip.photos?.length > 0) {
      return (
        <Image
          style={styles.pictures}
          source={{ uri: this.state.tip.photos[0] }}
        />
      );
    }
    return (
      <View>
        <Image
          style={styles.pictures}
          source={require("../../assets/images/Travel_book.png")}
        />
      </View>
    );
  };

  renderTipsRating = () => {
    if (this.state.mounted && this.state.tip.rate?.length > 0) {
      const rating = Number(this.state.tip.rate[0]);
      return (
        <Rating
          ratingBackgroundColor="#a9ceca"
          imageSize={18}
          type="heart"
          readonly
          startingValue={rating}
        />
      );
    }
    return null;
  };

  renderTipsLocation = () => {
    if (this.state.mounted && this.state.tip.loc?.length > 0) {
      const tipLat = Number(this.state.tip.loc[1]);
      const tipLon = Number(this.state.tip.loc[0]);

      try {
        return (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.mapView}
              initialRegion={{
                latitude: tipLat,
                longitude: tipLon,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Marker
                coordinate={{
                  latitude: tipLat,
                  longitude: tipLon,
                }}
                title={this.state.tip.company_name || ""}
                description={this.state.tip.category || ""}
              />
            </MapView>
          </View>
        );
      } catch (error) {
        console.log("Map error:", error);
        return null;
      }
    }
    return null;
  };

  renderTipStartDate = () => {
    Moment.locale("en");
    var fromDate = this.state.tip.start_date;
    return <Text>{Moment(fromDate).format("Do MMMM YYYY")}</Text>;
  };

  renderTipEndDate = () => {
    Moment.locale("en");
    var endDate = this.state.tip.end_date;
    return <Text>{Moment(endDate).format("Do MMMM YYYY")}</Text>;
  };

  renderTipNights = () => {
    var startDate = Moment(this.state.tip.start_date).format("YYYYMMDD");
    var endDate = Moment(this.state.tip.end_date).format("YYYYMMDD");
    var dateFrom = Moment(startDate, "YYYYMMDD");
    var dateTo = Moment(endDate, "YYYYMMDD");
    return <Text>{dateTo.diff(dateFrom, "days")}</Text>;
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.tipsCard}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.imageProfile}
              source={require("../../assets/images/no_user.png")}
            />
          </View>

          <View style={styles.donneeName}>
            <Text style={styles.textName}>{this.state.user.first_name} </Text>
            <Text style={styles.textName}>{this.state.user.last_name}</Text>
          </View>
          <View style={styles.donneeAgeCountry}>
            <Text style={styles.textAgeCountry}>34 ans, </Text>
            <Text style={styles.textAgeCountry}>French</Text>
          </View>

          <View>
            <View style={styles.headerContainer}>
              <View style={styles.iconContainer}>
                <FontAwesomeIcon name="hotel" size={40} color="black" />
                <Text style={styles.categoryText}>
                  {this.state.tip.category}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.companyName}>
                  {this.state.tip.company_name}
                </Text>
                <Text style={styles.cityText}>{this.state.tip.city}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingWrapper}>
                  {this.renderTipsRating()}
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>{this.state.tip.price}$</Text>
                  <Text> / night</Text>
                </View>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.dateContainer}>
                <View style={styles.dateRow}>
                  <Text style={styles.labelText}>From: </Text>
                  {this.renderTipStartDate()}
                </View>
                <View style={[styles.dateRow, styles.marginLeft]}>
                  <Text style={styles.labelText}>To: </Text>
                  {this.renderTipEndDate()}
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.labelText}>Night(s): </Text>
                {this.renderTipNights()}
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.labelText}>Travelling mode: </Text>
                <Text>Family</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.labelText}>Address: </Text>
                <Text>{this.state.tip.adress}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.labelText}>Contact: </Text>
                <Text>{this.state.tip.contact}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.labelText}>Link: </Text>
                <Text>{this.state.tip.web_site}</Text>
              </View>
            </View>

            {this.renderTipsLocation()}
            <Text style={styles.description}>{this.state.tip.description}</Text>
            <View style={styles.picturesContainer}>
              {this.renderTipsPictures()}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  tipsCard: {
    flex: 1,
  },
  profileContainer: {
    alignItems: "center",
  },
  pictures: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 5,
  },
  mapContainer: {
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 10,
  },
  mapView: {
    width: "100%",
    height: 200,
  },
  imageProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white",
  },
  donneeName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  donneeAgeCountry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  textName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  textAgeCountry: {
    color: "grey",
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#EAE1E2",
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
  },
  iconContainer: {
    alignItems: "center",
    marginLeft: 5,
  },
  categoryText: {
    fontSize: 12,
  },
  infoContainer: {
    marginLeft: 5,
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cityText: {
    fontSize: 14,
  },
  ratingContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  ratingWrapper: {
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  detailsContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "grey",
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: "row",
  },
  dateRow: {
    flexDirection: "row",
  },
  marginLeft: {
    marginLeft: 20,
  },
  infoRow: {
    flexDirection: "row",
  },
  labelText: {
    fontWeight: "bold",
  },
  description: {
    marginBottom: 10,
  },
  picturesContainer: {
    flexDirection: "row",
  },
});
