import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import ListStack from "./MainTabNavigator";
import DetailsTravelScreen from "../screens/DetailsTravelScreen/DetailsTravelBook";
import DetailsMapScreen from "../screens/DetailsTravelScreen/DetailsMap";
import StepFormScreen from "../screens/StepFormScreen/StepForm";
import TipsFormScreen from "../screens/StepFormScreen/TipsForm";
import TipsFilterScreen from "../screens/TipsScreen/TipsFilter";
import TipsPageScreen from "../screens/TipsScreen/TipsPage";
import CityFilterScreen from "../screens/TipsScreen/CityFilter";
import UserProfileScreen from "../screens/UserProfileScreen/UserProfile";
import MainTabNavigator from "./MainTabNavigator";
import FreeFormScreen from "../screens/StepFormScreen/FreeForm";
import HotelFormScreen from "../screens/StepFormScreen/HotelForm";
import RestaurantFormScreen from "../screens/StepFormScreen/RestaurantForm";
import RoadFormScreen from "../screens/StepFormScreen/RoadForm";
import BeachFormScreen from "../screens/StepFormScreen/BeachForm";
import TitleAndDescriptionContainer from "../screens/TravelBookFormScreen/TitleAndDescriptionScreen/TitleAndDescription";
import CountryContainer from "../screens/TravelBookFormScreen/CountryScreen/Country";
import DatesContainer from "../screens/TravelBookFormScreen/DatesScreen/Dates";
import PhotosContainer from "../screens/TravelBookFormScreen/PhotosScreen/Photos";
import CategoryContainer from "../screens/TravelBookFormScreen/CategoryScreen/Category";
import NameAndBirthdayContainer from "../screens/SignupStepsScreen/NameAndBirthdayScreen/NameAndBirthday";
import EmailContainer from "../screens/SignupStepsScreen/EmailScreen/Email";
import AddressContainer from "../screens/SignupStepsScreen/AddressScreen/Address";

const Stack = createStackNavigator();

export default function TravelBookNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListStack">
        <Stack.Screen name="ListStack" component={ListStack} />
        <Stack.Screen name="DetailsTravel" component={DetailsTravelScreen} />
        <Stack.Screen
          name="TitleAndDescription"
          component={TitleAndDescriptionContainer}
        />
        <Stack.Screen name="Country" component={CountryContainer} />
        <Stack.Screen name="Dates" component={DatesContainer} />
        <Stack.Screen name="Photos" component={PhotosContainer} />
        <Stack.Screen name="Category" component={CategoryContainer} />
        <Stack.Screen name="StepForm" component={StepFormScreen} />
        <Stack.Screen name="TipsFilter" component={TipsFilterScreen} />
        <Stack.Screen name="TipsPage" component={TipsPageScreen} />
        <Stack.Screen name="CityFilter" component={CityFilterScreen} />
        <Stack.Screen name="DetailsMap" component={DetailsMapScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="TipsForm" component={TipsFormScreen} />
        <Stack.Screen name="FreeForm" component={FreeFormScreen} />
        <Stack.Screen name="HotelForm" component={HotelFormScreen} />
        <Stack.Screen name="RestaurantForm" component={RestaurantFormScreen} />
        <Stack.Screen name="RoadForm" component={RoadFormScreen} />
        <Stack.Screen name="BeachForm" component={BeachFormScreen} />
        <Stack.Screen
          name="NameAndBirthday"
          component={NameAndBirthdayContainer}
        />
        <Stack.Screen name="Email" component={EmailContainer} />
        <Stack.Screen name="Address" component={AddressContainer} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
