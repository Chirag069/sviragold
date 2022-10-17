import styled from "styled-components/native";
import AppConstants from "../appConstants/AppConstants";
import { sc, vsc, msc } from "../appConstants/Utils";

import { colors } from "../theme/colors.js";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const { Navigator } = createBottomTabNavigator();

export const TabNavigationMain = styled(Navigator).attrs((props) => ({
  initialRouteName: "Home",
  tabBarOptions: {
    showLabel: false,
    keyboardHidesTabBar: true,
    style: {
      position: "absolute",
      elevation: 0,
      backgroundColor: "#db9b7b",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      height: AppConstants.isiPhoneX ? vsc(80) : vsc(60),
      borderTopWidth: 0,
      borderColor: colors.brand.secondary,
      overflow: "hidden",
    },
  },
}))``;

export const TabBarIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  top: 0px;
`;
