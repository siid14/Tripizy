import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import TabBarIcon from "../components/TabBarIcon";
import ListScreen from "../screens/ListScreen/List";
import MyTripsScreen from "../screens/MyTripsScreen/MyTrips";
import MyProfileScreen from "../screens/UserProfileScreen/MyProfile";
import TipsScreen from "../screens/TipsScreen/TipsList";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} />
    </Stack.Navigator>
  );
}

function MyTripsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyTrips" component={MyTripsScreen} />
    </Stack.Navigator>
  );
}

function TipsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tips" component={TipsScreen} />
    </Stack.Navigator>
  );
}

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Travel Books"
          component={ListStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === "ios" ? "ios-search" : "md-search"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="My Trips"
          component={MyTripsStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === "ios" ? "ios-book" : "md-book"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Tips"
          component={TipsStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={
                  Platform.OS === "ios" ? "ios-star-outline" : "md-star-outline"
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={MyProfileStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === "ios" ? "ios-person" : "md-person"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
