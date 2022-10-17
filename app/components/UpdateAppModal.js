import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import AppConstant from "../appConstants/AppConstants";

import { LaterUpdate } from "../redux/actions/authActons.js";
import { sc, vsc, msc } from "../appConstants/Utils";

const UpdateAppModal = () => {
  const dispatch = useDispatch();

  const { updateModal, forceUpdateModal } = useSelector(
    (state) => state.authState
  );

  return (
    <Modal animationIn="slideInUp" isVisible={updateModal}>
      <View
        style={{
          backgroundColor: "#F6F7FB",
          borderRadius: sc(10),
          marginHorizontal: sc(10),
          paddingBottom: vsc(20),
          elevation: (2),
          
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: vsc(30),
          }}
        >
          <Image
            source={require("../assets/header1.png")}
            style={{
              width: sc(80),
              height: sc(80),
              resizeMode: "center",
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: vsc(-5),
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: vsc(17), color: "#333333" }}>
            {" "}
            New Version of App is Available
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
          {!forceUpdateModal ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(LaterUpdate());
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
          ) : null}
          <TouchableOpacity
            onPress={() => {
              if (AppConstant.APP_TECHNICAL_ID) {
                try {
                  Linking.openURL(
                    `https://play.google.com/store/apps/details?id=${AppConstant.APP_TECHNICAL_ID}`
                  );
                } catch (e) {}
              }
            }}
            style={{
              marginLeft: sc(5),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#db9b7b",
              paddingVertical: vsc(7),
              paddingHorizontal: sc(10),
              marginVertical: sc(0),
              marginHorizontal: sc(3),
              borderColor: "#F6F7FB",
              borderWidth: sc(0.25),
              borderRadius: sc(2),
              width: "35%",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateAppModal;
