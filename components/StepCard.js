import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  AsyncStorage,
  StyleSheet,
} from "react-native";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import config from "../config";
import Moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";

const StepCard = ({ index, id }) => {
  const [step, setStep] = useState({});
  const [tips, setTips] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [travelBookUserId, setTravelBookUserId] = useState(undefined);
  const [userId, setUserId] = useState(undefined);

  const navigation = useNavigation(); // Use the navigation hook
  const route = useRoute();

  useEffect(() => {
    AsyncStorage.getItem("token", (err, token) => {
      axios
        .get(`${config.DOMAIN}step/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("StepState => ", response.data);
          setStep(response.data);
          setTips(response.data.tips);
          setTravelBookUserId(response.data.travelbook_id.user_id);

          axios
            .get(`${config.DOMAIN}user`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setUserId(response.data._id);
              setMounted(true);
            })
            .catch((err) => {
              console.log("get user id", err.message);
            });
        })
        .catch((err) => {
          console.log("get step", err.message);
        });
    });
  }, [id]);

  const renderAddTipsButton = () => {
    // hide "+ tip" button if user is not the owner of travelbook
    if (mounted && travelBookUserId === userId)
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TipsForm", {
              stepId: step._id,
              stepDate: step.start_date,
            });
          }}
        >
          <View style={{ justifyContent: "center", marginEnd: 10 }}>
            <MaterialIconsIcon name="add-circle" />
            <Text>Add tip</Text>
          </View>
        </TouchableOpacity>
      );
    else return null;
  };

  const renderTipStartDate = () => {
    Moment.locale("en");
    var fromDate = step.start_date;
    return <Text> {Moment(fromDate).format("dddd Do MMMM YYYY")} </Text>;
  };

  if (mounted) {
    return (
      <View style={styles.containerStep}>
        <View style={styles.containerDay}>
          <Text style={styles.textDay}>Day {index + 1}</Text>
        </View>
        <Text style={styles.textDate}>{renderTipStartDate()}</Text>
        {renderAddTipsButton()}
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containerStep: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: 30,
    backgroundColor: "#D9ECF2",
    borderRadius: 5,
  },
  containerDay: {
    backgroundColor: "#37449E",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  textDay: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    padding: 3,
  },
  textDate: { marginLeft: 5, color: "#37449E", padding: 3, fontSize: 14 },
});

export default StepCard;
