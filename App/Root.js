

import { Root } from "native-base";

import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import BeaconsScreen from "./BeaconsScreen.js";
import GyroscopeAccelerometerScreen from "./GyroscopeAccelerometerScreen.js";
import SideBar from "./SideBar.js";
import { DrawerNavigator } from "react-navigation";


const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    BeaconsScreen: { screen: BeaconsScreen },
    GyroscopeAccelerometerScreen: { screen: GyroscopeAccelerometerScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export default () =>
<Root>
    <HomeScreenRouter />
</Root>;
