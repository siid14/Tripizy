import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStackNavigator from "./AuthStackNavigator";
import TravelBookNavigator from "./TravelBookNavigator";
import MainTabNavigator from "./MainTabNavigator";
import AuthLoading from "../screens/AuthLoadingScreen/AuthLoading";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthLoading"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#37449E",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="AuthLoading"
        component={AuthLoading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthStackNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TravelBook" component={TravelBookNavigator} />
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
