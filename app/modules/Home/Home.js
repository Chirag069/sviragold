/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";

import SocialLinks from "../../components/SocialLinks.js";
import Swiper from "react-native-swiper";

import { SafeView } from "./Home.Style.js";

import AviraHeader from "../../components/aviraHeader.Component.js";
import AviraInfo from "./Components/AviraInfo.Component.js";
import { HomePageAction } from "../../redux/actions/authActons.js";

import {
  applyFilterAction,
  clearAllFilter,
  getProductsAction,
  getLikeCardItemsAction,
  getGroupAndSizeId,
  getCardItemsAction,
} from "../../redux/actions/productActions.js";

import UpdateAppModal from "../../components/UpdateAppModal.js";
import SeachModal from "../../components/SeachModal.Component.js";
import GuestUserModal from "../../components/GuestUserModal";

import { sc, vsc, msc } from "../../appConstants/Utils";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const { sliderList, homeItemList, userToken } = useSelector(
    (state) => state.authState
  );

  useEffect(() => {
    if (!userToken) {
      dispatch(HomePageAction());
    } else {
      dispatch(HomePageAction());
      dispatch(getLikeCardItemsAction());
      dispatch(getGroupAndSizeId());
      dispatch(getCardItemsAction());
    }
  }, [userToken]);

  const [text1, onChangeText1] = useState("OUR COLLECTION");

  const SilderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <FastImage
        style={{ width, flex: 1 }}
        source={{
          uri: item.image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );

  return (
    <SafeView bgColor={"#FFFEFD"}>
      <StatusBar backgroundColor={"#db9b7b"} barStyle="light-content" />
      {/* end---modal */}
      <AviraHeader navigation={navigation} />
      <UpdateAppModal />
      <SeachModal navigation={navigation} />

      <GuestUserModal navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: vsc(80), marginTop: vsc(0) }}
      >
        {sliderList && Array.isArray(sliderList) && sliderList.length > 0 ? (
          <Swiper
            autoplay={true}
            removeClippedSubviews={false}
            style={{}}
            height={
              Dimensions.get("window").height > 710 &&
              Dimensions.get("window").height < 740
                ? vsc(240)
                : vsc(210)
            }
            // width={Dimensions.get('window').width}
            dot={
              <View
                style={{
                  backgroundColor: "#DDDDDD",
                  width: sc(8),
                  height: vsc(8),
                  borderRadius: 4,
                  marginLeft: sc(3),
                  marginRight: sc(3),
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: "#db9b7b",
                  width: sc(8),
                  height: vsc(8),
                  borderRadius: 4,
                  marginLeft: sc(3),
                  marginRight: sc(3),
                }}
              />
            }
            paginationStyle={{
              marginBottom: vsc(10),
              position: "absolute",
              top: "105%",
            }}
            loop
          >
            {sliderList.map((item, index) => (
              <SilderItem item={item} />
            ))}
          </Swiper>
        ) : (
          <Image
            style={{ width, height: vsc(250), resizeMode: "stretch" }}
            source={require("../../assets/Homeside.png")}
          />
        )}

        <View
          style={{
            alignItems: "flex-start",
            marginHorizontal: sc(10),
            marginTop: vsc(20),
            top: 1,
            zIndex: 6,
          }}
        >
          <TextInput
            underlineColorAndroid="transparent"
            textAlign={"center"}
            keyboardType="numeric"
            editable={false}
            style={{
              borderBottomWidth: vsc(2),
              paddingBottom: vsc(5),
              borderColor: "#db9b7b",
              color: "#db9b7b",
              fontSize: vsc(14),
            }}
            onChangeText={onChangeText1}
            value={text1}
          />
        </View>
        <View
          style={{
            paddingVertical: vsc(0.4),
            backgroundColor: "#000000",
          }}
        />
        {homeItemList &&
        Array.isArray(homeItemList) &&
        homeItemList.length > 0 ? (
          <>
            {homeItemList.map((item, index) => (
              <>
                {item.name ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      dispatch(clearAllFilter());
                      dispatch(applyFilterAction(item.id));
                      dispatch(getProductsAction());
                      navigation.navigate("Matches");
                    }}
                  >
                    <View
                      style={{
                        marginTop: vsc(10),
                        marginHorizontal: sc(10),
                        elevation: 2,
                        position: "relative",
                        zIndex: 0,
                      }}
                    >
                      <FastImage
                        style={{
                          height: vsc(200),
                          resizeMode: "cover",
                          width: Dimensions.get("window").width - sc(20),
                          borderRadius: 10,
                        }}
                        source={
                          item.image
                            ? {
                                uri: item.image,
                                priority: FastImage.priority.high,
                              }
                            : require("../../assets/home.png")
                        }
                      />

                      <View
                        style={{
                          zIndex: 6,
                          bottom: vsc(70),
                          right: sc(25),
                          position: "absolute",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              color: "#FFFFFF",
                              marginBottom: vsc(3),
                              fontSize: vsc(20),
                              fontFamily: "Play-Regular",
                            }}
                          >
                            {item.name ? item.name : ""}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : null}
              </>
            ))}
          </>
        ) : null}
        {/* end collection line */}

        <View
          style={{
            alignItems: "flex-start",
            marginHorizontal: sc(10),
            marginTop: vsc(20),
            top: 1,
            zIndex: 6,
          }}
        >
          <TextInput
            underlineColorAndroid="transparent"
            textAlign={"center"}
            keyboardType="numeric"
            editable={false}
            style={{
              borderBottomWidth: sc(2),
              paddingBottom: vsc(5),
              borderColor: "#db9b7b",
              color: "#db9b7b",
              fontSize: vsc(14),
            }}
            // onChangeText={onChangeText1}
            value={"FOLLOW US ON"}
          />
        </View>
        <View
          style={{
            paddingVertical: 0.4,
            backgroundColor: "#000000",
          }}
        />

        <SocialLinks />
        <AviraInfo />
      </ScrollView>
    </SafeView>
  );
};

export default Home;
