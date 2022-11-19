/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  StatusBar,
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  FlatList,
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import AviraHeader from "../../components/aviraHeader.Component.js";
import SeachModal from "../../components/SeachModal.Component.js";
import GuestUserModal from "../../components/GuestUserModal.js";
import {
  getCardItemsAction,
  placeOrderCardItemAction,
} from "../../redux/actions/productActions.js";
import { colors } from "../../theme/colors.js";

import CardItem from "./Components/CardItem.Compomnent.js";

import RemarkModal from "./Components/RemarkModal.Component";
import SIzeSelectionModal from "./Components/SIzeSelectionModal.Component";
import GroupModelSelectoion from "./Components/GroupModelSelectoion.Component";
import PlaceOrderModal from "./Components/PlaceOrderModal";
import CustomStatusBar from "../../Custom/CustomStatusBar.js";

import { sc, vsc, msc } from "../../appConstants/Utils";

const More = ({ navigation }) => {
  const dispatch = useDispatch();

  const [placeOrderModal, setPlaceOrderModal] = useState(false);

  const setPlaceOrderModalAction = (valuePlaceModal) => {
    setPlaceOrderModal(valuePlaceModal);
  };

  const {
    incAndDecCardServerLoading,
    removeCardServerLoading,
    cardItemsLoading,
    cardItemsError,
    cardItems,
    serverPlaceServerLoadingError,
  } = useSelector((state) => state.productState);

  React.useEffect(() => {
    dispatch(getCardItemsAction());

    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getCardItemsAction());
    });

    return unsubscribe;
  }, [navigation, serverPlaceServerLoadingError]);

  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

  const renderCardItem = ({ item }) => {
    return <CardItem navigation={navigation} item={item} />;
  };

  const pressOrderCardAllItems = () => {
    setPlaceOrderModalAction(true);
    // dispatch(placeOrderCardItemAction());
  };

  const onChangeStateMethod = (
    valueFinish,
    valueRho,
    valueStamp,
    valueScrew,
    valuePatch
  ) => {
    dispatch(
      placeOrderCardItemAction(
        valueStamp,
        valueFinish,
        valueRho,
        valueScrew,
        valuePatch
      )
    );
    setPlaceOrderModal(false);
  };

  // console.log(cardItems);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFEFD" }}>
      <CustomStatusBar backgroundColor="#db9b7b" />
      <AviraHeader navigation={navigation} />
      <SeachModal navigation={navigation} />
      <GuestUserModal navigation={navigation} />

      <RemarkModal />
      <SIzeSelectionModal />
      <GroupModelSelectoion />
      <PlaceOrderModal
        onChangeStateMethod={onChangeStateMethod}
        placeOrderModal={placeOrderModal}
        setPlaceOrderModalAction={setPlaceOrderModalAction}
      />
      <Spinner
        visible={
          incAndDecCardServerLoading ||
          removeCardServerLoading ||
          serverPlaceServerLoadingError
        }
        textContent={"Loading..."}
        textStyle={{ color: "#fff", fontSize: vsc(14) }}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <View
        style={{
          paddingHorizontal: sc(15),
          paddingVertical: vsc(10),
          backgroundColor: "#FFFFFF",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          
        }}
      >
        <View>
          <Text
            style={{
              color: "#db9b7b",
              fontWeight: "normal",
              fontSize: vsc(19),
            }}
          >
            My Cart
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {Array.isArray(cardItems) && cardItems.length > 0 ? (
            <>
              <TouchableOpacity onPress={pressOrderCardAllItems}>
                <Text
                  style={{
                    color: "#db9b7b",
                    fontWeight: "normal",
                    fontSize: vsc(19),
                  }}
                >
                  Place Order
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CardSetting");
                }}
                style={{ marginLeft: vsc(15) }}
              >
                <AntDesign name="setting" color="#db9b7b" size={vsc(22)} />
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </View>

      {cardItemsLoading ? (
        <View
          style={{
            bottom: vsc(30),
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size={vsc(40)} color="#db9b7b" />
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "#000000", fontSize: vsc(17) }}>Loading</Text>
          </View>
        </View>
      ) : cardItemsError ||
        (Array.isArray(cardItems) && cardItems.length === 0) ? (
        <View
          style={{
            bottom: vsc(30),
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ marginTop: vsc(10) }}>
            {Array.isArray(cardItems) && cardItems.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: vsc(70), height: vsc(70), resize: "cover" }}
                  source={require("../../assets/Ecart2.png")}
                />
                <View>
                  <Text
                    style={{
                      top: vsc(10),
                      color: "#000000",
                      fontSize: vsc(17),
                    }}
                  >
                    No Product Found
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{ color: "#000000", fontSize: vsc(17) }}>
                {cardItemsError}
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
            data={cardItems}
            renderItem={renderCardItem}
            contentContainerStyle={{
              paddingBottom: vsc(100),
              marginBottom: vsc(100),
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

export default More;
