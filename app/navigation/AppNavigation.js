import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import React from "react";
import styled from "styled-components/native";

import TabNavigation from "./TabNavigation.js";
import Polls from "../modules/Polls/Polls.js";
import Players from "../modules/Players/Players.js";
import AllSeasons from "../modules/AllSeasons/AllSeasons.js";
import Score from "../modules/Score/Score.js";
import SignIn from "../modules/SignIn/SignIn.js";
import ContactUs from "../modules/ContactUs/ContactUs.js";
import PdfViewPage from "../modules/Players/PdfViewPage.js";
import CardSetting from "../modules/CardSetting/CardSeetingPage";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { bgColorset } = useSelector((state) => state.themeState);
  const { userToken } = useSelector((state) => state.authState);

  const NavigationAnimationType =
    CardStyleInterpolators.forRevealFromBottomAndroid;

  return (
    <StackNavigationContainer bgColor={bgColorset}>
      <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={TabNavigation}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            <Stack.Screen
              name="PDF"
              component={PdfViewPage}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />

            <Stack.Screen
              name="CardSetting"
              component={CardSetting}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            <Stack.Screen
              name="Polls"
              component={Polls}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            <Stack.Screen
              name="Players"
              component={Players}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            <Stack.Screen
              name="AllSeasons"
              component={AllSeasons}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            <Stack.Screen
              name="Score"
              component={Score}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            <Stack.Screen
              name="ContactUs"
              component={ContactUs}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
      </Stack.Navigator>
    </StackNavigationContainer>
  );
};

export const StackNavigationContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  flex: 1;
`;

export default AppNavigation;
