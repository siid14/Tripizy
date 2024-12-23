import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthLoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkUserToken();
  }, []);

  // Fetch the token from storage then navigate to appropriate screen
  const checkUserToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("token");
      // Navigate to App screen or Auth screen based on token
      navigation.navigate(userToken ? "TravelBook" : "Auth");
    } catch (error) {
      console.error("Error checking authentication:", error);
      navigation.navigate("Auth"); // Default to Auth screen on error
    }
  };

  // Render loading content
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#37449E" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthLoadingScreen;
