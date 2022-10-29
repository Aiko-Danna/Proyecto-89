import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "../Navigation/DrawerNavigation";

export default class DashboardScreen extends Component{
  render() {
    return(
      <NavigationContainer> 
        <DrawerNavigator />
      </NavigationContainer>
    );
  }
}