import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import SplashScreen from "react-native-splash-screen";

import { setTokenValueAction } from "../redux/actions/authActons.js";
import DrawerNavigation from "./DrawerNavigation.js";
import NoNetwork from "../components/NoNetwork.Component.js";

const Navigation = () => {
  const dispatch = useDispatch();

  const [isOffline, setOfflineStatus] = useState(false);
  const refIsOffline = useRef(false);
  const refOfflineUpdate = useRef(0);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      if (refOfflineUpdate.current === 0 || refIsOffline.current) {
        refOfflineUpdate.current = 1;
        refIsOffline.current = offline;
        setOfflineStatus(offline);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const userToken = await AsyncStorage.getItem("@user_token");
      const userObj = await AsyncStorage.getItem("@user_obj");
      const tempUserObj = JSON.parse(userObj);
      try {
        dispatch(setTokenValueAction(userToken, tempUserObj));
        setTimeout(() => {
          SplashScreen.hide();
        }, 1000);
      } catch (e) {
        SplashScreen.hide();
      }
    })();
  }, [dispatch]);

  if (isOffline) {
    return <NoNetwork />;
  }

  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
