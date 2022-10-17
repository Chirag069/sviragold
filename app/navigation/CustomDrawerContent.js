import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Avatar } from "react-native-paper";

import Feather from "react-native-vector-icons/Feather";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";

import {
  applyFilterAction,
  clearAllFilter,
  getProductsAction,
} from "../redux/actions/productActions.js";

import {
  LogOutAction,
  GuestUserModalShowAction,
} from "../redux/actions/authActons.js";
import { sc, vsc, msc } from "../appConstants/Utils";

export default function CustomDrawerContent(props) {
  const dispatch = useDispatch();

  const { homeItemList, userName, userToken } = useSelector(
    (state) => state.authState
  );

  return (
    <SingelFlex>
      <DrawerContentScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...props}
      >
        <View
          style={{
            paddingHorizontal: sc(5),
            marginTop: vsc(-5),
            backgroundColor: "#FFFEFD",
          }}
        >
          <View style={{ marginHorizontal: sc(10), paddingTop: vsc(15) }}>
            <Text style={{ color: "#db9b7b", fontSize: vsc(16) }}>WELCOME</Text>
          </View>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#db9b7b")}
            onPress={() => props.navigation.navigate("Score")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: vsc(10),
                paddingHorizontal: sc(10),
              }}
            >
              {/* rrrrrr */}
              {userToken ? ( 
                <View>
                  <Text
                    style={{ color: "#000000", textTransform: "capitalize", fontSize: vsc(14) }}
                  >
                    {userName ? userName : ""}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={{ color: "#000000", textTransform: "capitalize", fontSize: vsc(14) }}
                  >
                    Guest user
                  </Text>
                </View>
              )}
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#db9b7b")}
            onPress={() => {
              if (userToken) {
                props.navigation.navigate("More");
              } else {
                dispatch(GuestUserModalShowAction(true));
              }
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: vsc(5),
                paddingHorizontal: sc(10),
                // marginBottom: 10,
                // marginVertical: 10,
              }}
            >
              <View>
                <Text style={{ color: "#000000", fontSize: vsc(14) }}>My Cart</Text>
              </View>
              <View
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                <MaterialCommunityIcons
                  name={"chevron-right"}
                  size={sc(28)}
                  color={"#db9b7b"}
                />
              </View>
            </View>
          </TouchableNativeFeedback>
          <View
            style={{
              paddingVertical: sc(0.35),
              backgroundColor: "#DDDDDD",
            }}
          />

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#db9b7b")}
            onPress={() => {
              if (userToken) {
                props.navigation.navigate("Like");
              } else {
                dispatch(GuestUserModalShowAction(true));
              }
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: vsc(5),
                paddingHorizontal: sc(10),
                // marginBottom: 10,
                // marginVertical: 10,
              }}
            >
              <View>
                <Text style={{ color: "#000000", fontSize: vsc(14) }}>My Wish List</Text>
              </View>
              <View
                style={{
                  margin: vsc(0),
                  padding: vsc(0),
                }}
              >
                <MaterialCommunityIcons
                  name={"chevron-right"}
                  size={sc(28)}
                  color={"#db9b7b"}
                />
              </View>
            </View>
          </TouchableNativeFeedback>
          <View
            style={{
              paddingVertical: vsc(0.35),
              backgroundColor: "#DDDDDD",
            }}
          />

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#db9b7b")}
            onPress={() => {
              props.navigation.navigate("Matches");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: vsc(5),
                paddingHorizontal: sc(10),
                // marginBottom: 10,
                // marginVertical: 10,
              }}
            >
              <View>
                <Text style={{ color: "#000000", fontSize: vsc(14) }}>Our Products</Text>
              </View>
              <View
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                <MaterialCommunityIcons
                  name={"chevron-right"}
                  size={sc(28)}
                  color={"#db9b7b"}
                />
              </View>
            </View>
          </TouchableNativeFeedback>

          <View
            style={{
              paddingVertical: vsc(0.35),
              backgroundColor: "#DDDDDD",
            }}
          />
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#db9b7b")}
            onPress={() => {
              if (userToken) {
                props.navigation.navigate("Players");
              } else {
                dispatch(GuestUserModalShowAction(true));
              }
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: vsc(5),
                paddingHorizontal: sc(10),
                // marginTop: 10,
              }}
            >
              <View>
                <Text style={{ color: "#000000", fontSize: vsc(14) }}>Customer Order</Text>
              </View>
              <View
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                <MaterialCommunityIcons
                  name={"chevron-right"}
                  size={sc(28)}
                  color={"#db9b7b"}
                />
              </View>
            </View>
          </TouchableNativeFeedback>

          <View
            style={{
              marginBottom: vsc(10),
              paddingVertical: vsc(0.35),
              backgroundColor: "#DDDDDD",
            }}
          />
          <View
            style={{ marginHorizontal: sc(10), marginTop: sc(5), marginBottom: sc(10) }}
          >
            <Text style={{ color: "#db9b7b", fontSize: vsc(16) }}>
              BROWSER BY CATEGORY
            </Text>
          </View>
          {homeItemList &&
          Array.isArray(homeItemList) &&
          homeItemList.length > 0 ? (
            <>
              {homeItemList.map((item) => (
                <>
                  {item.name ? (
                    <>
                      <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple("#db9b7b")}
                        onPress={() => {
                          dispatch(clearAllFilter());
                          dispatch(applyFilterAction(item.id));
                          dispatch(getProductsAction());
                          props.navigation.navigate("Matches");
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingVertical: vsc(10),
                            paddingHorizontal: sc(10),
                          }}
                        >
                          <View>
                            <Text style={{ color: "#000000", fontSize: vsc(14) }}>
                              {item.name ? item.name : "User"}
                            </Text>
                          </View>
                        </View>
                      </TouchableNativeFeedback>
                      <View
                        style={{
                          paddingVertical: vsc(0.35),
                          backgroundColor: "#DDDDDD",
                        }}
                      />
                    </>
                  ) : null}
                </>
              ))}
            </>
          ) : null}
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingVertical: vsc(0.35),
          backgroundColor: "#DDDDDD",
        }}
      />
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#db9b7b")}
        onPress={() => {
          if (userToken) {
            dispatch(LogOutAction());
            props.navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          } else {
            props.navigation.navigate("SignIn");
          }

          props.navigation.closeDrawer();
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingVertical: vsc(10),
            paddingHorizontal: sc(10),
          }}
        >
          <View style={{ marginRight: sc(10) }}>
            <Feather
              name={userToken ? "log-out" : "log-in"}
              color="#000000"
              size={sc(22)}
            />
          </View>
          <View>
            <Text style={{ color: "#000000", fontSize: vsc(15) }}>
              {userToken ? "Log Out" : "Log In"}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <View
        style={{
          marginBottom: vsc(3),
        }}
      />
    </SingelFlex>
  );
}

const SingelFlex = styled.View`
  flex: 1;
  background-color: #fffefd;
`;

const Row = styled.View`
  flex-direction: row;
`;

const AlignCenter = styled.View`
  align-self: center;
`;

const ImageLogo = styled(Avatar.Image).attrs((props) => ({
  size: 100,
}))`
  margin: 15px 10px 15px 15px;
`;

const UserNameTitle = styled.Text`
  font-size: 19px;
  font-weight: bold;
  color: #ff531a;
`;

const ImageLogoPorside = styled.Image`
  resize-mode: cover;
  width: ${Dimensions.get("window").width * 0.6388}px;
  height: ${Dimensions.get("window").height * 0.0954}px;
`;

const ImageContainer = styled.View`
  margin: 0px 12px 10px 0px;
`;

const PolicyTContainer = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 3px;
  margin-left: 5px;
`;
