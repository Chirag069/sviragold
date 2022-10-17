import React, { useState } from "react";
import { TouchableNativeFeedback, View, Text, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { sc, vsc, msc } from "../../../appConstants/Utils";

const AviraInfoItem = ({ item }) => {
  const [itemShow, setItemShow] = useState(false);
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#db9b7b")}
      onPress={() => {
        setItemShow((value) => !value);
      }}
    >
      <View
        style={{
          backgroundColor: "#FFFEFD",
          marginHorizontal: sc(10),
          marginTop: vsc(10),
          paddingVertical: vsc(10),
          paddingHorizontal: sc(20),
          elevation: 2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <View style={{}}>
              <Image
                source={require("../../../assets/header1.png")}
                style={{ height: vsc(50), width: sc(50), borderRadius: 50 / 2 }}
              />
            </View>
            <View style={{ marginLeft: sc(10) }}>
              <Text style={{ fontSize: vsc(17), color: "#000000" }}>
                {item.title ? item.title : "Svira Gold"}
              </Text>
            </View>
          </View>
          <View>
            <MaterialCommunityIcons
              color="#000000"
              size={30}
              name={itemShow ? "chevron-up" : "chevron-down"}
            />
          </View>
        </View>
        {itemShow ? (
          <View style={{}}>
            <Text
              style={{
                fontSize: vsc(16),
                color: "#000000",
                textAlign: "justify",
              }}
            >
              {item.description ? item.description : ""}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableNativeFeedback>
  );
};

export default AviraInfoItem;
