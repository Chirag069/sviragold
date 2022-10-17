import React from "react";
import { View, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Feather from "react-native-vector-icons/Feather";

import { toggleSearchModelAction } from "../redux/actions/productActions";
import {GuestUserModalShowAction} from '../redux/actions/authActons'

import { sc, vsc, msc } from "../appConstants/Utils";


const AviraHeader = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { userToken } = useSelector((state) => state.authState);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#db9b7b",
        paddingVertical: vsc(3),
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{ marginLeft: sc(10) }}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Feather name="align-left" size={vsc(30)} color={"#FFFFFF"} />
        </TouchableOpacity>

        <View
          style={{
            marginLeft: sc(10),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../assets/header1.png")}
            style={{
              resizeMode:
                Dimensions.get("window").width > 450 ? "stretch" : "cover",
              width: vsc(30),
              height: vsc(30),
            }}
          />
          <View style={{ marginLeft: sc(7), bottom: sc(2) }}>
            <Text
              style={{
                fontSize: vsc(20),
                fontFamily: "Play-Regular",
                color: "#000000",
              }}
            >
              Svira Gold
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {!userToken ? (
          <TouchableOpacity
            onPress={() => {
              dispatch(GuestUserModalShowAction(true));
            }}
            style={{
              marginRight: sc(10),
              borderRadius: sc(4),
              borderWidth: sc(1),
              borderColor: "#FFFFFF",
              paddingHorizontal: sc(10),
              paddingVertical: vsc(3),
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ marginRight: sc(2) }}>
                <Feather name="user" size={sc(20)} color={"#FFFFFF"} />
              </View>
              <View>
                <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>Guest User</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            dispatch(toggleSearchModelAction());
          }}
          style={{ marginRight: sc(10) }}
        >
          <Feather name="search" size={vsc(25)} color={"#FFFFFF"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AviraHeader;
