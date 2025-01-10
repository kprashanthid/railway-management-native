import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../../screens/HomeScreen";
import SeatAvailabilityScreen from "../../screens/SeatAvailabilityScreen";
import BookingScreen from "../../screens/BookingScreen";
import LoginScreen from "../../screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AdminPanelScreen from "@/screens/AdminPanelScreen";
import { getUserRole } from "@/utils/authService";
import { Text } from "react-native";
import BookingConfirmationScreen from "@/screens/BookingConfirmationScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
  AdminPanel: undefined;
  Home: undefined;
};

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="SeatAvailability"
        component={SeatAvailabilityScreen}
      />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen
        name="BookingConfirm"
        component={BookingConfirmationScreen}
      />
      <Stack.Screen
        name="AdminPanel"
        component={AdminPanelScreen}
        options={{ title: "Admin Panel" }}
      />
      {/* 
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={Tabs}
      /> */}
    </Stack.Navigator>
  );
};

// const Tabs = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Seat Availability" component={SeatAvailabilityScreen} />
//       <Tab.Screen name="Booking" component={BookingScreen} />
//     </Tab.Navigator>
//   );
// };

const AppNavigation = () => {
  return <AppStack />;
};

export default AppNavigation;
