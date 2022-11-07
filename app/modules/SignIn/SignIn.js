import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import {
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

import { TextInput as RNINPUT } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { setBgColor } from "../../redux/actions/themeActions.js";
import Spinner from "react-native-loading-spinner-overlay";
import { signInAction } from "../../redux/actions/authActons.js";
import { sc, vsc, msc } from "../../appConstants/Utils";





const singInCheck = yup.object({
  name: yup.string().required("mobile number is required"),
  password: yup.string().required("password is required"),
});

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();

  const { userToken, LoginInLoading } = useSelector((state) => state.authState);

  useEffect(() => {
    if (userToken) {
      navigation.navigate("Home");
    }
  }, [navigation, userToken]);

  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

  if (userToken) {
    dispatch(setBgColor("#db9b7b"));
  }

  return (
    <>
      <StatusBar  backgroundColor={"#FFFEFD"} barStyle="light-content" />

      <Spinner
        visible={LoginInLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#fff", fontSize: vsc(14)}}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <View style={{ flex: 1, backgroundColor: "#FFFEFD" }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: vsc(20) }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: vsc(20),
            }}
          >
            <Image
              style={{ width: sc(120), height: sc(120), resizeMode: "contain" }}
              source={require("../../assets/header1.png")}
            />
          </View>
          <View
            style={{
              marginTop: vsc(20),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: vsc(25),
                fontFamily: "Cairo-Regular",
                color: "#000000",
              }}
            >
              Customer Sign In
            </Text>
          </View>

          <Formik
            initialValues={{
              name: "",
              password: "",
            }}
            validationSchema={singInCheck}
            onSubmit={(values, actions) => {
              NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                  actions.resetForm();
                  dispatch(signInAction(values.name, values.password));
                } else {
                  Toast.show({
                    text1: "Check your Internet Connection",
                    visibilityTime: 3000,
                    autoHide: true,
                    position: "bottom",
                    type: "error",
                  });
                }
              });
            }}
          >
            {(props) => (
              <View style={{ marginHorizontal: sc(30) }}>
                <View
                  style={{
                    marginBottom: vsc(20),
                    marginTop: vsc(25),
                  }}
                >
                  <TextInput
                    underlineColorAndroid="transparent"
                    selectionColor={"#db9b7b"}
                    placeholder="Mobile No."
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                    style={{
                      color: "#000000",
                      fontSize: vsc(20),

                      borderWidth: 0,
                    }}
                    onChangeText={props.handleChange("name")}
                    onBlur={props.handleBlur("name")}
                    value={props.values.name}
                  />
                  <View
                    style={{
                      marginTop: vsc(7),
                      elevation: 4,
                      backgroundColor: "#db9b7b",
                      paddingVertical:
                        Dimensions.get("window").height < 600 ? vsc(0.7) : vsc(0.6),
                    }}
                  />
                  <View style={{ marginBottom: vsc(13), marginTop: vsc(3) }}>
                    <Text style={{ color: "red", fontSize: vsc(14)}}>
                      {props.touched.name && props.errors.name}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginBottom: vsc(20),
                    marginTop: vsc(0),
                    // marginHorizontal: 20,
                  }}
                >
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={true}
                    selectionColor={"#db9b7b"}
                    style={{
                      fontSize: vsc(20),
                      color: "#000000",
                      borderWidth: 0,
                    }}
                    onChangeText={props.handleChange("password")}
                    onBlur={props.handleBlur("password")}
                    value={props.values.password}
                  />
                  <View
                    style={{
                      marginTop: vsc(7),
                      elevation: 4,
                      backgroundColor: "#db9b7b",
                      paddingVertical:
                        Dimensions.get("window").height < 600 ? vsc(0.7) : vsc(0.7),
                    }}
                  />
                  <View style={{ marginBottom: vsc(13), marginTop: vsc(3) }}>
                    <Text style={{ color: "red", fontSize: vsc(14)}}>
                      {props.touched.password && props.errors.password}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    // marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      overflow: "hidden",
                      borderRadius: sc(50),
                    }}
                  >
                    <Touchable
                      background={TouchableNativeFeedback.Ripple("#ECECEC")}
                      onPress={() => {
                        props.handleSubmit();
                      }}
                    >
                      <View
                        style={{
                          borderRadius: vsc(50),
                          width: Dimensions.get("window").width / 1.5,
                          paddingVertical: vsc(15),
                          backgroundColor: "#db9b7b",
                          fontFamily: "Play-Regular",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "#FFFFFF",
                            fontSize: vsc(17),
                          }}
                        >
                          SIGN IN
                        </Text>
                      </View>
                    </Touchable>
                  </View>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: vsc(12),
                  }}
                >
                  <View
                    style={{
                      overflow: "hidden",
                      borderRadius: vsc(50),
                    }}
                  >
                    <Touchable
                      background={TouchableNativeFeedback.Ripple("#ECECEC")}
                      onPress={() => {
                        navigation.reset({
                          index: 0,
                          routes: [{ name: "Home" }],
                        });
                      }}
                    >
                      <View
                        style={{
                          borderRadius: vsc(50),
                          width: Dimensions.get("window").width / 1.5,
                          paddingVertical: vsc(15),
                          backgroundColor: "#db9b7b",
                          fontFamily: "Play-Regular",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "#FFFFFF",
                            fontSize: vsc(17),
                          }}
                        >
                          GUEST USER
                        </Text>
                      </View>
                    </Touchable>
                  </View>
                </View>
              </View>
            )}
          </Formik>

          <View
            style={{
              marginTop: vsc(15),
              marginHorizontal: sc(30),
              paddingVertical: vsc(0.4),
              elevation: 1,
              backgroundColor: "#DDDDDD",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: vsc(10),
              marginBottom: vsc(10),
            }}
          >
            <Text style={{ color: "#666666", fontSize: vsc(14) }}>
              You are not a registered use click{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
              <Text style={{ color: "#666666" , fontSize: vsc(14)}}>here</Text>
              <View
                style={{
                  paddingVertical:
                    Dimensions.get("window").height < 600 ? vsc(0.7) : vsc(0.6),
                  backgroundColor: "#000000",
                }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SignIn;
