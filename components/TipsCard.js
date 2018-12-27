import React from "react";
import { StyleSheet, View, Text, AsyncStorage, Image } from "react-native";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from "react-navigation";
import StarRating from "react-native-star-rating";
import axios from "axios";
import config from "../config";
class TipsCard extends React.Component {
  state = {
    tip: {},
    mounted: false
  };
  renderTipsPictures = () => {
    if (this.state.mounted && this.state.tip.photos.length > 0) {
      return (
        <Image
          style={styles.pictures}
          source={{ uri: this.state.tip.photos[0] }}
        />
      );
    } else {
      return (
        <View>
          <Image
            style={styles.pictures}
            source={require("../assets/images/Travel_book.png")}
          />
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.tipsCard}>
        <View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#EAE1E2",
              marginBottom: 5,
              borderRadius: 10
            }}
          >
            <View style={{ alignItems: "center", marginLeft: 5 }}>
              <FontAwesomeIcon name="hotel" size={40} color="black" />
              <Text style={{ fontFamily: "Arial", fontSize: 12 }}>
                {this.state.tip.category}
              </Text>
            </View>
            <View
              style={{ marginleft: 5, justifyContent: "center", width: "56%" }}
            >
              <Text style={{ fontSize: 18, marginLeft: 12 }}>
                {this.state.tip.company_name}
              </Text>
              <Text style={{ fontSize: 14, marginLeft: 12 }}>
                {this.state.tip.city}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <StarRating
                  style={{
                    justifyContent: "center"
                  }}
                  fullStarColor={"#ffc200"}
                  emptyStarColor={"#c9c3c3"}
                  starSize={20}
                  disabled={false}
                  maxStars={5}
                  rating={this.state.tip.rating}
                />
              </View>
              <Text />
            </View>
          </View>

          <Text style={{ marginBottom: 10 }} numberOfLines={5}>
            {this.state.tip.description}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {this.renderTipsPictures()}
          </View>
        </View>
      </View>
    );
  }
  componentDidMount() {
    AsyncStorage.getItem("token", (err, token) => {
      console.log(this.props);
      console.log("thips.props, ", `${config.DOMAIN}tips/${this.props.id}`);
      axios
        .get(`${config.DOMAIN}tips/${this.props.id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          console.log("TIP =>", response.data);
          this.setState({
            tip: response.data,
            mounted: true
          });
        })
        .catch(err => {
          console.log("error tipscard didmount:", err.message);
        });
    });
  }
}

const styles = StyleSheet.create({
  tipsCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    marginBottom: 10
  },
  pictures: {
    width: 100,
    height: 100,
    justifyContent: "flex-end",
    shadowOpacity: 50,
    borderRadius: 10,
    marginRight: 5
  }
});

export default withNavigation(TipsCard);
