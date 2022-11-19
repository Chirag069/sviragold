import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import { SafeView } from "./News.Style.js";
import { colors } from "../../theme/colors.js";
import { Button } from "react-native-paper";
import AviraHeader from "../../components/aviraHeader.Component.js";
import SeachModal from "../../components/SeachModal.Component.js";
import GuestUserModal from "../../components/GuestUserModal.js";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {
  setGenderCheckValue,
  setSubCategoryCheckValue,
  setCategoryCheckValue,
  setItemGroupCheckValue,
  filterTypesAction,
  clearAllFilter,
  applyFilterAction,
} from "../../redux/actions/productActions";
import { FAB } from "react-native-paper";
import CustomStatusBar from "../../Custom/CustomStatusBar.js";
import { stoneValueChangeAction } from "../../redux/actions/authActons";

import styled from "styled-components/native";

import StoneValue from "./Components/StoneValue.Component";
import { sc, vsc, msc } from "../../appConstants/Utils";

const News = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    filterGenderList,
    filterSubCategory,
    filterCategory,
    filterItemGroup,
    filterLoading,
    filterError,
  } = useSelector((state) => state.productState);

  const { userToken } = useSelector((state) => state.authState);

  const [filterTitle, setFilterTitle] = useState("GENDER");
  useEffect(() => {
    dispatch(filterTypesAction());
  }, [userToken]);

  const CLEARALL = () => {
    dispatch(clearAllFilter());
    dispatch(stoneValueChangeAction([0, 40]));
    setFilterTitle("GENDER");
  };

  const ApplyFilters = () => {
    dispatch(applyFilterAction());
    navigation.navigate("Matches");
  };

  return (
    <View bgColor={"#FFFEFD"}>
      <CustomStatusBar backgroundColor="#db9b7b" />
      <AviraHeader navigation={navigation} />
      <SeachModal navigation={navigation} />
      <GuestUserModal navigation={navigation} />

      <View style={{}}>
        {/*end0---- filter header-----3/7 */}
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: Dimensions.get("window").width * 0.35,
              backgroundColor: "#e0e0e0",
              height: Dimensions.get("window").height - 179,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#e0e0e0",
                paddingVertical: vsc(10),
                paddingHorizontal: sc(10),
                justifyContent: "space-between",
                borderBottomWidth: sc(0.5),
                borderColor: "#DDDDDD",
                alignItems: "center",
                width: Dimensions.get("window").width * 0.35,
                height: vsc(60),
                overflow: "hidden",
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.1}
                  style={{ fontSize: vsc(16), color: "#808080" }}
                >
                  FILTER BY
                </Text>
              </View>
            </View>

            {/* 0.35 playerBordernd */}
            <TouchableWithoutFeedback
              onPress={() => {
                setFilterTitle("GENDER");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor:
                    filterTitle === "GENDER" ? "#c4c4c4" : "#e0e0e0",
                  paddingVertical: vsc(10),
                  paddingHorizontal: sc(10),
                  justifyContent: "space-between",
                  borderBottomWidth: sc(0.3),
                  borderColor: "#666666",
                  alignItems: "center",
                  width: Dimensions.get("window").width * 0.35,
                  height: vsc(60),
                  overflow: "hidden",
                }}
              >
                <View style={{ width: "75%" }}>
                  <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.1}
                    style={{ color: "#000000", fontSize: vsc(16) }}
                  >
                    Gender
                  </Text>
                </View>
                <View
                  style={{
                    width: "25%",
                    opacity: filterGenderList.some((item) => item.check == true)
                      ? 1
                      : 0,
                    height: filterGenderList.some((item) => item.check == true)
                      ? "auto"
                      : 0,
                  }}
                >
                  <Feather name={"check"} size={vsc(25)} color="#808080" />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                setFilterTitle("ITEM GROUP");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor:
                    filterTitle === "ITEM GROUP" ? "#c4c4c4" : "#e0e0e0",
                  paddingVertical: vsc(10),
                  paddingHorizontal: sc(10),
                  justifyContent: "space-between",
                  borderBottomWidth: sc(0.3),
                  borderColor: "#666666",
                  alignItems: "center",
                  width: Dimensions.get("window").width * 0.35,
                  height: vsc(60),
                  overflow: "hidden",
                }}
              >
                <View style={{ width: "75%" }}>
                  <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.1}
                    style={{ color: "#000000", fontSize: vsc(16) }}
                  >
                    Item Group
                  </Text>
                </View>
                <View
                  style={{
                    width: "25%",
                    opacity: filterItemGroup.some((item) => item.check == true)
                      ? 1
                      : 0,
                    height: filterItemGroup.some((item) => item.check == true)
                      ? "auto"
                      : 0,
                  }}
                >
                  <Feather name="check" size={vsc(25)} color="#808080" />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                setFilterTitle("CATEGORY");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor:
                    filterTitle === "CATEGORY" ? "#c4c4c4" : "#e0e0e0",
                  paddingVertical: vsc(10),
                  paddingHorizontal: sc(10),
                  justifyContent: "space-between",
                  borderBottomWidth: sc(0.3),
                  borderColor: "#666666",
                  alignItems: "center",
                  width: Dimensions.get("window").width * 0.35,
                  height: vsc(60),
                  overflow: "hidden",
                }}
              >
                <View style={{ width: "75%" }}>
                  <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.1}
                    style={{ color: "#000000", fontSize: vsc(16) }}
                  >
                    Category
                  </Text>
                </View>
                <View
                  style={{
                    width: "25%",
                    opacity: filterCategory.some((item) => item.check == true)
                      ? 1
                      : 0,
                    height: filterCategory.some((item) => item.check == true)
                      ? "auto"
                      : 0,
                  }}
                >
                  <Feather name="check" size={vsc(25)} color="#808080" />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                setFilterTitle("SUB CATEGORY");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor:
                    filterTitle === "SUB CATEGORY" ? "#c4c4c4" : "#e0e0e0",
                  paddingVertical: vsc(10),
                  paddingHorizontal: sc(10),
                  justifyContent: "space-between",
                  borderBottomWidth: sc(0.3),
                  borderColor: "#666666",
                  alignItems: "center",
                  width: Dimensions.get("window").width * 0.35,
                  height: vsc(60),
                  overflow: "hidden",
                }}
              >
                <View style={{ width: "75%" }}>
                  <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.1}
                    style={{ color: "#000000", fontSize: vsc(16) }}
                  >
                    Sub Category
                  </Text>
                </View>
                <View
                  style={{
                    width: "25%",
                    opacity: filterSubCategory.some(
                      (item) => item.check == true
                    )
                      ? 1
                      : 0,
                    height: filterSubCategory.some((item) => item.check == true)
                      ? "auto"
                      : 0,
                  }}
                >
                  <Feather name="check" size={vsc(25)} color="#808080" />
                </View>
              </View>
            </TouchableWithoutFeedback>

            {/* <TouchableWithoutFeedback
              onPress={() => {
                setFilterTitle("STONE %");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor:
                    filterTitle === "STONE %" ? "#c4c4c4" : "#e0e0e0",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  justifyContent: "space-between",
                  borderBottomWidth: 0.3,
                  borderColor: "#666666",
                  alignItems: "center",
                  width: Dimensions.get("window").width * 0.35,
                  height: 60,
                  overflow: "hidden",
                }}
              >
                <View style={{ width: "75%" }}>
                  <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.1}
                    style={{ color: "#000000", fontSize: 16 }}
                  >
                    Stone %
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback> */}
          </View>
          <View
            style={{
              width: Dimensions.get("window").width * 0.65,
              backgroundColor: "#F6F7FB",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#F6F7FB",
                paddingVertical: vsc(10),
                paddingHorizontal: sc(10),
                justifyContent: "space-between",
                borderBottomWidth: sc(0.5),
                borderColor: "#dddddd",
                alignItems: "center",
                width: Dimensions.get("window").width * 0.65,
                height: vsc(60),
                overflow: "hidden",
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.1}
                  style={{ fontSize: vsc(16), color: "#808080" }}
                >
                  {filterTitle}
                </Text>
              </View>
            </View>

            {filterTitle === "GENDER" ? (
              <View
                style={{
                  flexDirection: "row",
                  padding: vsc(10),
                  flexWrap: "wrap",
                }}
              >
                {filterGenderList &&
                Array.isArray(filterGenderList) &&
                filterGenderList.length > 0 ? (
                  <>
                    {filterGenderList.map((item, index) => (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          dispatch(setGenderCheckValue(item.id));
                          //  setGents((item) => !item);
                        }}
                      >
                        <View
                          style={{
                            borderColor: "#db9b7b",
                            backgroundColor: item.check ? "#db9b7b" : "#F6F7FB",
                            paddingVertical: vsc(8),
                            paddingHorizontal: sc(6),
                            borderWidth: sc(1),
                            alignSelf: "flex-start",
                            borderRadius: sc(5),
                            margin: sc(5),
                          }}
                        >
                          <Text
                            style={{
                              color: !item.check ? "#db9b7b" : "#F6F7FB",
                              fontSize: vsc(16),
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                  </>
                ) : null}
              </View>
            ) : null}

            {filterTitle === "ITEM GROUP" ? (
              <View
                style={{
                  flexDirection: "row",
                  padding: vsc(10),
                  flexWrap: "wrap",
                }}
              >
                {filterItemGroup &&
                Array.isArray(filterItemGroup) &&
                filterItemGroup.length > 0 ? (
                  <>
                    {filterItemGroup.map((item, index) => (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          dispatch(setItemGroupCheckValue(item.id));
                          //  setGents((item) => !item);
                        }}
                      >
                        <View
                          style={{
                            borderColor: "#db9b7b",
                            backgroundColor: item.check ? "#db9b7b" : "#F6F7FB",
                            paddingVertical: vsc(8),
                            paddingHorizontal: sc(6),
                            borderWidth: sc(1),
                            alignSelf: "flex-start",
                            borderRadius: sc(5),
                            margin: vsc(5),
                          }}
                        >
                          <Text
                            style={{
                              color: !item.check ? "#db9b7b" : "#F6F7FB",
                              fontSize: vsc(16),
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                  </>
                ) : null}
              </View>
            ) : null}

            {filterTitle === "CATEGORY" ? (
              <View
                style={{
                  flexDirection: "row",
                  padding: vsc(10),
                  flexWrap: "wrap",
                }}
              >
                {filterCategory &&
                Array.isArray(filterCategory) &&
                filterCategory.length > 0 ? (
                  <>
                    {filterCategory.map((item, index) => (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          dispatch(setCategoryCheckValue(item.id));
                          //  setGents((item) => !item);
                        }}
                      >
                        <View
                          style={{
                            borderColor: "#db9b7b",
                            backgroundColor: item.check ? "#db9b7b" : "#F6F7FB",
                            paddingVertical: vsc(8),
                            paddingHorizontal: sc(6),
                            borderWidth: sc(1),
                            alignSelf: "flex-start",
                            borderRadius: vsc(5),
                            margin: sc(5),
                          }}
                        >
                          <Text
                            style={{
                              color: !item.check ? "#db9b7b" : "#F6F7FB",
                              fontSize: vsc(16),
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                  </>
                ) : null}
              </View>
            ) : null}

            {filterTitle === "SUB CATEGORY" ? (
              <ScrollView contentContainerStyle={{ paddingBottom: vsc(300) }}>
                <View
                  style={{
                    flexDirection: "row",
                    padding: vsc(10),
                    flexWrap: "wrap",
                  }}
                >
                  {filterSubCategory &&
                  Array.isArray(filterSubCategory) &&
                  filterSubCategory.length > 0 ? (
                    <>
                      {filterSubCategory.map((item, index) => (
                        <TouchableWithoutFeedback
                          onPress={() => {
                            dispatch(setSubCategoryCheckValue(item.id));
                            //  setGents((item) => !item);
                          }}
                        >
                          <View
                            style={{
                              borderColor: "#db9b7b",
                              backgroundColor: item.check
                                ? "#db9b7b"
                                : "#F6F7FB",
                              paddingVertical: vsc(8),
                              paddingHorizontal: sc(6),
                              borderWidth: sc(1),
                              alignSelf: "flex-start",
                              borderRadius: sc(5),
                              margin: vsc(5),
                            }}
                          >
                            <Text
                              style={{
                                color: !item.check ? "#db9b7b" : "#F6F7FB",
                                fontSize: vsc(16),
                              }}
                            >
                              {item.name}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      ))}
                    </>
                  ) : null}
                </View>
              </ScrollView>
            ) : null}

            {filterTitle === "STONE %" ? (
              <View style={{ padding: vsc(10) }}>
                <StoneValue />
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: Platform.OS === "ios" ? 15 : 0,
          flexDirection: "row",
          backgroundColor: "#F6F7FB",
          borderTopWidth: vsc(1),
          borderColor: "#DDDDDD",
        }}
      >
        <View style={{ width: Dimensions.get("window").width / 2 }}>
          <Button
            labelStyle={{
              color: "#db9b7b",
              paddingVertical: vsc(3),
              fontSize: vsc(14),
            }}
            style={{
              borderRadius: vsc(5),
              marginHorizontal: vsc(5),
              marginVertical: vsc(3),
            }}
            buttonColor="#dddddd"
            mode="contained"
            onPress={CLEARALL}
          >
            CLEAR ALL
          </Button>
        </View>
        <View style={{ width: Dimensions.get("window").width / 2 }}>
          <Button
            labelStyle={{
              color: "#FFFFFF",
              paddingVertical: vsc(3),
              fontSize: vsc(14),
            }}
            style={{
              borderRadius: vsc(5),
              marginHorizontal: vsc(5),
              marginVertical: vsc(3),
            }}
            buttonColor="#db9b7b"
            mode="contained"
            onPress={ApplyFilters}
          >
            APPLY
          </Button>
        </View>
      </View>
    </View>
  );
};

export default News;
