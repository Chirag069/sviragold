import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import AppConstant from "../appConstants/AppConstants";

import { GuestUserModalShowAction } from "../redux/actions/authActons.js";
import { sc, vsc, msc } from "../appConstants/Utils";

const GuestUserModal = ({ navigation }) => {
  const dispatch = useDispatch();

  const { guestUserModal } = useSelector((state) => state.authState);

  return (
    <Modal animationIn="slideInUp" isVisible={guestUserModal}>
      <View
        style={{
          backgroundColor: "#F6F7FB",
          borderRadius: sc(10),
          marginHorizontal: sc(10),
          paddingBottom: vsc(20),
          elevation: 2,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: vsc(20),
          }}
        >
          <Image
            source={require("../assets/header1.png")}
            style={{
              width: sc(60),
              height: sc(60),
              resizeMode: "center",
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: vsc(-5),
            paddingHorizontal: sc(30),
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: vsc(17), color: "#333333", textAlign: "center" }}>
            {" "}
            OOPS! It seems like you're not logged in. To use this functionality,
            you have to login first.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: vsc(20),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(GuestUserModalShowAction(false));
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: vsc(7),
              paddingHorizontal: sc(10),
              marginVertical: vsc(0),
              marginHorizontal: sc(3),
              borderColor: "#db9b7b",
              backgroundColor: "#F6F7FB",
              borderWidth: sc(1),
              borderRadius: sc(2),
              marginRight: sc(5),
              width: "35%",
            }}
          >
            <Text style={{ color: "#db9b7b", fontSize: vsc(14) }}>Later</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(GuestUserModalShowAction(false));
              navigation.navigate('SignIn');
            }}
            style={{
              marginLeft: sc(5),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#db9b7b",
              paddingVertical: sc(7),
              paddingHorizontal: sc(10),
              marginVertical: vsc(0),
              marginHorizontal: sc(3),
              borderColor: "#F6F7FB",
              borderWidth: sc(0.25),
              borderRadius: sc(2),
              width: "35%",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GuestUserModal;
