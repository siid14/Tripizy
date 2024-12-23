import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Remove this import since we don't need it anymore
// import { NavigationContainer } from "@react-navigation/native";

import MainContainer from "../screens/MainScreen/Main";
import LogInContainer from "../screens/LoginScreen/Login";
import NameAndBirthdayContainer from "../screens/SignupStepsScreen/NameAndBirthdayScreen/NameAndBirthday";
import EmailContainer from "../screens/SignupStepsScreen/EmailScreen/Email";
import UserPhotoContainer from "../screens/SignupStepsScreen/UserPhotoScreen/UserPhoto";
import AddressContainer from "../screens/SignupStepsScreen/AddressScreen/Address";

const Stack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    // Remove the NavigationContainer wrapper
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainContainer} />
      <Stack.Screen name="LogIn" component={LogInContainer} />
      <Stack.Screen
        name="NameAndBirthday"
        component={NameAndBirthdayContainer}
      />
      <Stack.Screen name="Email" component={EmailContainer} />
      <Stack.Screen name="UserPhoto" component={UserPhotoContainer} />
      <Stack.Screen name="Address" component={AddressContainer} />
    </Stack.Navigator>
  );
}
