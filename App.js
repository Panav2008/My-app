import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from "./Screens/WelcomeScreen"
import Home from "./Screens/HomeScreen"
import {createAppContainer, CreateAppContainer,createSwitchNavigator} from "react-navigation"
import {AppDrawerNavigator} from "./Components/AppDrawerNavigator"

export default function App() {
  return (
    <Appcontainer/>
  );
}
const SwitchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator}
})
const Appcontainer=createAppContainer(SwitchNavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
