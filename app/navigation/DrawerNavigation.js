import React, { memo } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import AppNavigation from "./AppNavigation.js";
import CustomDrawerContent from "./CustomDrawerContent.js";

const { width } = Dimensions.get("screen");

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const { userToken } = useSelector((state) => state.authState);

  return (
    <>
      <Drawer.Navigator
        drawerStyle={{
          width: userToken ? width * 0.8 : width * 0.8, // 0.001
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="AppNavigation" component={AppNavigation} />
      </Drawer.Navigator>
    </>
  );
};

export const StackNavigationContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  flex: 1;
`;

export default memo(DrawerNavigation);
