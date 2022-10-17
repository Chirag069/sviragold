import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import {
  editOrderItemAction,
  getOrderWebViewPdfData,
} from "../../../redux/actions/productActions.js";
import { sc, vsc, msc } from "../../../appConstants/Utils";

const OrderItem = ({ item, navigation }) => {
  const dispatch = useDispatch();

  const editOrderItemPress = () => {
    dispatch(editOrderItemAction(item.id));
  };

  const viewFullPdfPress = () => {
    dispatch(getOrderWebViewPdfData(item.id));
    navigation.navigate("PDF");
  };

  return (
    <View
      style={{
        paddingHorizontal: sc(15),
        paddingVertical: vsc(10),
        backgroundColor: "#FFFFFF",
        marginHorizontal: sc(20),
        marginTop: vsc(10),
        elevation: 0.5,
      }}
    >
      <View style={{}}>
        <Text style={{ color: "#db9b7b", fontSize: vsc(18) }}>
          Order ID #{item.order_no}
        </Text>
      </View>

      <View
        style={{
          paddingVertical: vsc(0.3),
          elevation: 0.4,
          backgroundColor: "#DDDDDD",
          width: "100%",
          marginTop: vsc(5),
        }}
      />

      <View
        style={{
          marginTop: vsc(5),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ color: "#000000", fontSize: vsc(15) }}>Order Data</Text>
        </View>
        <View>
          <Text style={{ color: "#000000", fontSize: vsc(15) }}>
            {item.created_at ? item.created_at : ""}
          </Text>
        </View>
      </View>
      {item.status === "0" || !item.status ? (
        <View
          style={{
            marginTop: vsc(5),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "#000000", fontSize: vsc(15) }}>Order Status</Text>
          </View>
          <TouchableOpacity onPress={editOrderItemPress}>
            <Text style={{ color: "#db9b7b", fontSize: vsc(15) }}>View</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            marginTop: vsc(5),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "#000000", fontSize: vsc(15) }}>Order Status</Text>
          </View>
          <TouchableOpacity onPress={viewFullPdfPress}>
            <Text style={{ color: "#db9b7b", fontSize: vsc(15) }}>PDF</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OrderItem;
