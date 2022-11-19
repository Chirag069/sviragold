import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, SafeAreaViewBase } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useSelector, useDispatch } from "react-redux";
import { Badge } from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../modules/Home/Home.js";
import More from "../modules/More/More.js";
import News from "../modules/News/News.js";
import Like from "../modules/Like/Like.js";
import Score from "../modules/Score/Score.js";
import { sc, vsc, msc } from "../appConstants/Utils";

import {
  TabNavigationMain,
  TabBarIconContainer,
} from "./TabNavigation.Style.js";

import { GuestUserModalShowAction } from "../redux/actions/authActons";

import Polls from "../modules/Polls/Polls.js";
import Matches from "../modules/Matches/Matches.js";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((state) => state.themeState);
  const { totalGrValue, cardTotalQty } = useSelector(
    (state) => state.productState
  );
  const { userToken } = useSelector((state) => state.authState);

  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <SafeAreaView style={{backgroundColor:'#db9b7b',  flex: Platform.OS === 'ios' ? 0.1 : 0, }}>
      <View 
        style={{
          flexDirection: "row",
          backgroundColor: "#db9b7b",
          justifyContent: "center",
          alignItems: "center",

        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const setItenValue = (label, isFocused) => {
            if (label === "Home") {
              return (
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    flex: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: vsc(15),
                    paddingBottom: vsc(15),
                    height: vsc(60),
                  }}
                >
                  <Ionicons
                    name={isFocused ? "home" : "home-outline"}
                    size={sc(24)}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                </TouchableOpacity>
              );
            } else if (label === "News") {
              return (
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    flex: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: vsc(15),
                    paddingBottom: vsc(15),
                  }}
                >
                  <MaterialCommunityIcons
                    name={isFocused ? "filter" : "filter-outline"}
                    size={sc(28)}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                </TouchableOpacity>
              );
            } else if (label === "Like") {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (userToken) {
                      onPress();
                    } else {
                      dispatch(GuestUserModalShowAction(true));
                    }
                  }}
                  style={{
                    flex: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: vsc(15),
                    paddingBottom: vsc(15),
                  }}
                >
                  <Entypo
                    name={isFocused ? "heart" : "heart-outlined"}
                    size={sc(28)}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                </TouchableOpacity>
              );
            } else if (label === "More") {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (userToken) {
                      onPress();
                    } else {
                      dispatch(GuestUserModalShowAction(true));
                    }
                  }}
                  style={{
                    flex: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: vsc(15),
                    paddingBottom: vsc(15),
                    position: "relative",
                  }}
                >
                  <Ionicons
                    name={isFocused ? "ios-cart" : "ios-cart-outline"}
                    size={sc(28)}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                  <View
                    style={{
                      position: "absolute",
                      bottom: "100%",
                      left: "60%",
                      backgroundColor: "red",
                      // paddingHorizontal: 4,
                      alignItems: "center",
                      alignSelf: "center",
                      justifyContent: "center",
                      borderRadius: sc(20),
                      // padding: sc(4),
                      padding: sc(3),
                      paddingHorizontal: userToken && cardTotalQty && (cardTotalQty + "").length > 1 ? sc(3) : sc(6)
                    }}
                  >
                    {userToken ? (
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.1}
                        style={{
                          color: "#FFFFFF",
                          fontSize: vsc(11.5),
                          fontWeight: "normal",
                        }}
                      >
                        {cardTotalQty ? cardTotalQty : "0"} 
                      </Text>
                    ) : (
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.1}
                        style={{
                          color: "#FFFFFF",
                          fontSize: vsc(11.5),
                          fontWeight: "normal",
                        }}
                      >
                        0
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            } else if (label === "Score") {
              return (
                <View
                  style={{
                    flex: 0.43,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: sc(5),
                  }}
                >
                  <View style={{}}>
                    <View>
                      {userToken ? (
                        <Text
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          minimumFontScale={0.1}
                          style={{
                            color: "#FFFFFF",
                            fontSize: vsc(17),
                            fontWeight: "bold",
                          }}
                        >
                          {totalGrValue ? totalGrValue.toFixed(3) : "00.00"}
                        </Text>
                      ) : (
                        <Text
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          minimumFontScale={0.1}
                          style={{
                            color: "#FFFFFF",
                            fontSize: vsc(17),
                            fontWeight: "bold",
                          }}
                        >
                          0.00
                        </Text>
                      )}
                    </View>
                  </View>
                  <View>
                    <Text style={{ color: "#707070", fontSize: vsc(13) }}>
                      TOTAL
                    </Text>
                  </View>
                </View>
              );
            } else if (label === "Polls" || label === "Matches") {
              return true;
            } else {
              return (
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    flex: 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: vsc(15),
                    paddingBottom: vsc(15),
                  }}
                >
                  <Ionicons
                    name={isFocused ? "home" : "home-outline"}
                    size={sc(24)}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                </TouchableOpacity>
              );
            }
          };

          return <>{setItenValue(label, isFocused)}</>;
        })}
      </View>
       </SafeAreaView>
    );
  }

  return (
    <TabNavigationMain
      tabBar={(props) => <MyTabBar {...props} />}
      isDarkTheme={isDarkTheme}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconContainer>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#FFFFFF" : "#FFFFFF"}
              />
            </TabBarIconContainer>
          ),
        }}
      />

      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconContainer>
              <MaterialCommunityIcons
                name={focused ? "filter" : "filter-outline"}
                size={28}
                color={focused ? "#FFFFFF" : "#FFFFFF"}
              />
            </TabBarIconContainer>
          ),
        }}
      />

      <Tab.Screen
        name="Like"
        component={Like}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconContainer>
              <Entypo
                name={focused ? "heart" : "heart-outlined"}
                size={28}
                color={focused ? "#FFFFFF" : "#FFFFFF"}
              />
            </TabBarIconContainer>
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconContainer>
              <Ionicons
                name={focused ? "ios-cart" : "ios-cart-outline"}
                size={28}
                color={focused ? "#FFFFFF" : "#FFFFFF"}
              />
            </TabBarIconContainer>
          ),
        }}
      />

      <Tab.Screen
        name="Score"
        component={Score}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconContainer>
              <MaterialIcons
                name={focused ? "person" : "person-outline"}
                size={33}
                color={focused ? "#FFFFFF" : "#FFFFFF"}
              />
            </TabBarIconContainer>
          ),
        }}
      />

      <Tab.Screen
        name="Polls"
        component={Polls}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconContainer>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#FFFFFF" : "#FFFFFF"}
              />
            </TabBarIconContainer>
          ),
        }}
      />

      <Tab.Screen
        name="Matches"
        component={Matches}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconContainer>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#FFFFFF" : "#FFFFFF"}
              />
            </TabBarIconContainer>
          ),
        }}
      />
    </TabNavigationMain>
  );
};

export default TabNavigation;
