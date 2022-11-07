/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeArea } from "./Players.Style.js";
import { useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import Ionicons from "react-native-vector-icons/Ionicons";

import { getOrderListAction } from "../../redux/actions/productActions.js";

import { setBgColor } from "../../redux/actions/themeActions.js";
import AviraHeader from "../../components/aviraHeader.Component.js";
import SeachModal from "../../components/SeachModal.Component.js";
import GuestUserModal from "../../components/GuestUserModal.js";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import OrderItem from "../Players/Components/OrderItem.Component.js";
import { sc, vsc, msc } from "../../appConstants/Utils";

const Players = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    listOrderLoading,
    listOrderItems,
    listOrderError,
    serverEditOrderServerLoadingError,
    webviewOrder,
  } = useSelector((state) => state.productState);

  useEffect(() => {
    dispatch(getOrderListAction());
  }, [navigation, serverEditOrderServerLoadingError]);

  const renderCardItem = ({ item }) => {
    return <OrderItem navigation={navigation} item={item} />;
  };

  return (
    <SafeArea bgColor={"#FFFEFD"}>
      <AviraHeader navigation={navigation} />
      <SeachModal navigation={navigation} />
      <GuestUserModal navigation={navigation} />
      <Spinner
        visible={serverEditOrderServerLoadingError}
        textContent={"Loading..."}
        textStyle={{ color: "#fff", fontSize: vsc(14)}}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <View
        style={{
          paddingLeft: sc(15),
          paddingVertical: vsc(10),
          backgroundColor: "#FFFFFF",
          borderBottomColor: "#db9b7b",
          borderBottomWidth: sc(0.2),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="caret-back" size={sc(20)} color={"#db9b7b"} />

          <View>
            <Text
              style={{ color: "#db9b7b", fontWeight: "normal", fontSize: vsc(19) }}
            >
              Order History
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {listOrderLoading ? (
        <View
          style={{
            bottom: vsc(30),
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size={sc(40)} color="#db9b7b" />
          <View style={{ marginTop: vsc(10) }}>
            <Text style={{ color: "#000000", fontSize: vsc(17) }}>Loading</Text>
          </View>
        </View>
      ) : listOrderError ||
        listOrderItems.length === 0 ||
        (Array.isArray(listOrderItems) && listOrderItems.length === 0) ? (
        <View
          style={{
            bottom: vsc(30),
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ marginTop: vsc(10) }}>
            {(Array.isArray(listOrderItems) && listOrderItems.length === 0) ||
            listOrderItems.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome5
                    color="#000000"
                    name="cart-arrow-down"
                    size={sc(55)}
                  />
                </View>
                <View>
                  <Text style={{ top: vsc(10), color: "#000000", fontSize: vsc(17) }}>
                    your order list is empty
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{ color: "#000000", fontSize: vsc(17) }}>
                {listOrderError ? listOrderError : "something is wrong"}
              </Text>
            )}
          </View>
        </View>
      ) : (
        <>
          {/* cart-prodcit item */}

          <FlatList
            removeClippedSubviews={true}
            maxToRenderPerBatch={15} // 5
            updateCellsBatchingPeriod={5} // 50
            initialNumToRender={10} // 3
            windowSize={5} // 5
            legacyImplementation={true}
            data={listOrderItems}
            renderItem={renderCardItem}
            contentContainerStyle={{
              paddingBottom: vsc(40),
              marginBottom: vsc(50),
            }}
            keyExtractor={(item, index) => index.toString()}
          />

          <View
            style={{
              paddingVertical: vsc(0.7),
              elevation: 0.5,
              marginTop: vsc(10),
              marginHorizontal: vsc(20),
            }}
          />
        </>
      )}
    </SafeArea>
  );
};

export default Players;
