/* eslint-disable react-hooks/exhaustive-deps */
"use strict";

import React, { useState, useEffect } from "react";
import {
  Platform,
  TouchableHighlight,
  FlatList,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { List } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { SafeView } from "./Matches.Style.js";

import AviraHeader from "../../components/aviraHeader.Component.js";
import SeachModal from "../../components/SeachModal.Component.js";
import GuestUserModal from "../../components/GuestUserModal.js";

import { getProductsAction } from "../../redux/actions/productActions.js";
import { GuestUserModalShowAction } from "../../redux/actions/authActons";

import ProductItem1Row from "./Components/ProductItem1Row.js";
import ProductItem2Row from "./Components/ProductItem2Row.js";
import ProductItemRowHorizotal from "./Components/ProductItemRowHorizotal";
import ProductItemRowSingal from "./Components/ProductItemRowSingal.js";
import ProductItem2LongRow from "./Components/ProductItem2LongRow.js";
import CustomButton from "../../Custom/CustomButton.js";
import CustomStatusBar from "../../Custom/CustomStatusBar.js";

import { sc, vsc } from "../../appConstants/Utils";

const Matches = ({ navigation }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [styleView, setStyleView] = useState(0);
  const [styleModal, setStyleModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [genderselect, setGenderselect] = useState([]);

  const {
    searchTextState,
    paginationLoading,
    listOfProduct,
    likeItemServerLoading,
    incAndDecCardServerLoading,
    itemsubcategory,
  } = useSelector((state) => state.productState);
  const { sliderList, homeItemList, userToken } = useSelector(
    (state) => state.authState
  );

  // console.log(listOfProduct);
  // console.log(modalVisible);
  // const itemsubcat = [...itemsubcategory];

  let itemsub = itemsubcategory + "";
  var itemsubcat = itemsub.split(",");

  // console.log(itemsubcat);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getProductsAction());
    });

    return unsubscribe;
  }, [navigation]);

  const getData = () => {
    dispatch(getProductsAction());
  };

  const Touchable =
    Platform.OS === "iOS" ? TouchableHighlight : TouchableHighlight;

  const renderItemList = ({ item }) => (
    <ProductItem1Row
      navigation={navigation}
      item={item}
      Touchable={Touchable}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    />
  );

  const renderItem = ({ item }) => (
    <ProductItem2Row
      navigation={navigation}
      item={item}
      Touchable={Touchable}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    />
  );

  const renderItemLong = ({ item }) => (
    <ProductItem2LongRow
      navigation={navigation}
      item={item}
      Touchable={Touchable}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    />
  );

  const renderHorizontal = ({ item }) => (
    <ProductItemRowHorizotal
      navigation={navigation}
      item={item}
      Touchable={Touchable}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    />
  );

  const renderSingalItem = ({ item }) => (
    <ProductItemRowSingal
      navigation={navigation}
      Touchable={Touchable}
      item={item}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    />
  );

  const loadinSpinner = () => (
    <View>
      {paginationLoading ? (
        <ActivityIndicator
          size={sc(30)}
          color={"#db9b7b"}
          style={{ margin: sc(15), paddingTop: vsc(10) }}
        />
      ) : null}
    </View>
  );

  const loadinSpinnerHorital = () => (
    <View>
      {paginationLoading ? (
        <ActivityIndicator
          size={sc(30)}
          color={"#db9b7b"}
          style={{
            margin: sc(15),
            marginBottom: Dimensions.get("window").height / 2,
            paddingTop: vsc(10),
          }}
        />
      ) : null}
    </View>
  );

  // const ItemGroupAddCheck = itemsubcategory
  //   ? itemsubcategory.map((item) => ({
  //       ...item,
  //       check: false,
  //     }))
  //   : [];

  return (
    <View bgColor={"#FFFEFD"}>
      <CustomStatusBar backgroundColor="#db9b7b" />
      {/* Header */}
      <Spinner
        visible={likeItemServerLoading || incAndDecCardServerLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#fff", fontSize: vsc(14) }}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flexBasis: "25%",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: sc(15),
              paddingHorizontal: sc(40),
              paddingVertical: vsc(20),
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: sc(2),
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 17 }}>Sub Category item</Text>

              <FlatList
                // ref={(ref) => {
                //   flatListRef = ref;
                // }}
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                data={itemsubcat}
                horizontal={false}
                keyExtractor={(item) => {
                  return item.id;
                }}
                renderItem={({ item }) => {
                  const index = item;

                  return (
                    <Pressable
                      onPress={() => {
                        if (genderselect.includes(index)) {
                          let unlike = genderselect.filter(
                            (elem) => elem !== index
                          );
                          setGenderselect(unlike);
                        } else {
                          setGenderselect([...genderselect, index]);
                        }
                      }}
                    >
                      <View
                        style={{
                          marginVertical: 10,
                          marginHorizontal: 5,
                        }}
                      >
                        <Text
                          style={{
                            borderWidth: sc(1),
                            borderColor: "#c79248",
                            backgroundColor: genderselect.includes(index)
                              ? "#c79248"
                              : "white",
                            color: genderselect.includes(index)
                              ? "white"
                              : "#c79248",
                            paddingHorizontal: sc(5),
                            paddingVertical: vsc(5),
                            borderRadius: sc(5),
                            fontSize: vsc(20),
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    </Pressable>
                  );
                }}
              />

              <CustomButton
                buttoncolor={"#c79248"}
                buttonwidth={sc(150)}
                buttonheight={vsc(40)}
                text={"ADD TO CART"}
                fontcolor={"white"}
                fontSize={sc(20)}
                // onPress={() => {
                //   Keyboard.dismiss();
                //   navigation.navigate('ProductList');
                // }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <AviraHeader navigation={navigation} />
      <SeachModal navigation={navigation} />
      <GuestUserModal navigation={navigation} />
      <Modal
        onBackdropPress={() => {
          setShow((x) => !x);
        }}
        isVisible={show}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
        animationInTiming={600}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            paddingHorizontal: sc(16),
            marginBottom: vsc(-15),
            paddingTop: vsc(10),
          }}
        >
          <List.Item
            onPress={() => {}}
            title="A to Z"
            titleStyle={{ color: "#000000", fontSize: vsc(14) }}
            left={(props) => (
              <List.Icon
                {...props}
                icon="sort-alphabetical-ascending"
                color="#db9b7b"
              />
            )}
          />
        </View>

        <View
          style={{
            backgroundColor: "#202020",
            paddingHorizontal: sc(16),
            marginBottom: vsc(-15),
            paddingTop: vsc(10),
          }}
        >
          <List.Item
            onPress={() => {}}
            title="Z to A"
            titleStyle={{ color: "#000000", fontSize: vsc(14) }}
            left={(props) => (
              <List.Icon
                {...props}
                icon="sort-alphabetical-descending"
                color="#db9b7b"
              />
            )}
          />
        </View>
        <View
          style={{
            backgroundColor: "#202020",
            paddingHorizontal: sc(16),
            paddingBottom: vsc(10),
          }}
        >
          <List.Item
            onPress={() => {}}
            title="Newest"
            titleStyle={{ color: "#000000", fontSize: vsc(14) }}
            left={(props) => (
              <List.Icon {...props} icon="sort" color="#db9b7b" />
            )}
          />
        </View>
      </Modal>
      {/* Model-style-selection */}
      <Modal
        onBackdropPress={() => {
          setStyleModal(false);
        }}
        isVisible={styleModal}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
        animationInTiming={600}
      >
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: sc(16),
            paddingTop: vsc(20),
            paddingBottom: vsc(20),
            borderTopRightRadius: sc(10),
            borderTopLeftRadius: sc(10),
          }}
        >
          <View style={{ marginBottom: vsc(20) }}>
            <Text
              style={{
                color: "#db9b7b",
                fontSize: vsc(18),
                fontWeight: "bold",
              }}
            >
              View Style
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{}}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setStyleView(0);
                  setStyleModal(false);
                }}
              >
                <View
                  style={{
                    borderWidth: sc(2.5),
                    borderRadius: sc(5),
                    borderColor: styleView == 0 ? "#db9b7b" : "#DDDDDD",
                    marginHorizontal: sc(5),
                  }}
                >
                  <Image
                    style={{
                      width: vsc(100),
                      height: vsc(100),
                      resizeMode: "stretch",
                    }}
                    source={require("../../assets/01.png")}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setStyleView(1);
                  setStyleModal(false);
                }}
              >
                <View
                  style={{
                    borderWidth: sc(2.5),
                    borderRadius: sc(5),
                    borderColor: styleView == 1 ? "#db9b7b" : "#DDDDDD",
                    marginHorizontal: sc(5),
                  }}
                >
                  <Image
                    style={{ width: vsc(100), height: vsc(100) }}
                    source={require("../../assets/11.png")}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setStyleView(2);
                  setStyleModal(false);
                }}
              >
                <View
                  style={{
                    borderWidth: sc(2.5),
                    borderRadius: sc(5),
                    borderColor: styleView == 2 ? "#db9b7b" : "#DDDDDD",
                    marginHorizontal: sc(5),
                  }}
                >
                  <Image
                    style={{ width: vsc(100), height: vsc(100) }}
                    source={require("../../assets/12.png")}
                  />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => {
                  setStyleView(3);
                  setStyleModal(false);
                }}
              >
                <View
                  style={{
                    borderWidth: sc(2.5),
                    borderRadius: sc(5),
                    borderColor: styleView == 3 ? "#db9b7b" : "#DDDDDD",
                    marginHorizontal: sc(5),
                  }}
                >
                  <Image
                    style={{ width: vsc(100), height: vsc(100) }}
                    source={require("../../assets/13.png")}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setStyleView(4);
                  setStyleModal(false);
                }}
              >
                <View
                  onPress={() => setStyleView(4)}
                  style={{
                    borderWidth: sc(2.5),
                    borderRadius: sc(5),
                    borderColor: styleView == 4 ? "#db9b7b" : "#DDDDDD",
                    marginHorizontal: sc(5),
                  }}
                >
                  <Image
                    style={{ width: vsc(100), height: vsc(100) }}
                    source={require("../../assets/14.png")}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* Model-style-selection */}
      {/* end --- Header */}
      {/* product list title */}
      <View
        style={{
          paddingLeft: sc(15),
          paddingVertical: vsc(7),
          backgroundColor: "#FFFFFF",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{}}>
          <Text
            style={{
              color: "#db9b7b",
              fontWeight: "normal",
              fontSize: vsc(18),
            }}
          >
            Svira Gold Products
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: vsc(5),
          backgroundColor: "#FFFFFF",
        }}
      >
        <TouchableOpacity
          style={{ flex: vsc(0.33), alignItems: "center" }}
          onPress={() => {
            if (userToken) {
              navigation.navigate("More");
            } else {
              dispatch(GuestUserModalShowAction(true));
            }
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: sc(5) }}>
              <MaterialCommunityIcons
                name="cart"
                color="#000000"
                size={sc(22)}
              />
            </View>

            <Text style={{ fontSize: vsc(13), color: "#000000" }}>CART</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: vsc(17),
            width: sc(0.4),
            backgroundColor: "#909090",
          }}
        />
        <TouchableOpacity
          style={{ flex: 0.33, alignItems: "center" }}
          onPress={() => {
            navigation.navigate("News");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: sc(5) }}>
              <MaterialCommunityIcons
                name="filter"
                color="#000000"
                size={sc(22)}
              />
            </View>

            <Text style={{ fontSize: vsc(13), color: "#000000" }}>FILTER</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: vsc(17),
            width: sc(0.4),
            backgroundColor: "#909090",
          }}
        />
        <TouchableOpacity
          style={{ flex: 0.33, alignItems: "center" }}
          onPress={() => {
            setStyleModal(true);
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: sc(5) }}>
              <Ionicons name="md-grid" size={sc(18)} color={"#000000"} />
            </View>

            <Text style={{ fontSize: vsc(13), color: "#000000" }}>
              VIEW STYLE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {listOfProduct.length === 0 && !paginationLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: Dimensions.get("window").height / 3,
          }}
        >
          <Text style={{ color: "#000000", fontSize: vsc(18) }}>
            No Product Found!
          </Text>
        </View>
      ) : null}
      {styleView === 0 ? (
        <FlatList
          key={"*"}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          contentContainerStyle={{
            paddingBottom: vsc(100),
            marginBottom: vsc(100),
          }}
          data={listOfProduct}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItemLong}
          numColumns={2}
          onEndReachedThreshold={1}
          onEndReached={getData}
          removeClippedSubviews={true}
          maxToRenderPerBatch={15} // 5
          updateCellsBatchingPeriod={5} // 50
          initialNumToRender={10} // 3
          windowSize={5} // 5
          getItemLayout={(item, index) => ({
            length: Dimensions.get("window").height / 3,
            offset: (Dimensions.get("window").height / 3) * index,
            index,
          })}
          legacyImplementation={true}
          ListFooterComponent={loadinSpinner}
          keyExtractor={(item, index) => "*" + index.toString()}
        />
      ) : styleView === 1 ? (
        <FlatList
          key={"_"}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          contentContainerStyle={{
            paddingBottom: vsc(100),
            marginBottom: vsc(100),
          }}
          data={listOfProduct}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          numColumns={2}
          onEndReachedThreshold={1}
          onEndReached={getData}
          removeClippedSubviews={true}
          maxToRenderPerBatch={15} // 5
          updateCellsBatchingPeriod={5} // 50
          initialNumToRender={10} // 3
          windowSize={5} // 5
          getItemLayout={(item, index) => ({
            length: Dimensions.get("window").height / 3,
            offset: (Dimensions.get("window").height / 3) * index,
            index,
          })}
          legacyImplementation={true}
          ListFooterComponent={loadinSpinner}
          keyExtractor={(item, index) => "_" + index.toString()}
        />
      ) : styleView === 2 ? (
        <FlatList
          key={"#"}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: vsc(100),
            marginBottom: vsc(100),
          }}
          data={listOfProduct}
          renderItem={renderItemList}
          numColumns={1}
          maxToRenderPerBatch={15} // 5
          updateCellsBatchingPeriod={5} // 50
          initialNumToRender={10} // 3
          windowSize={5} // 5
          legacyImplementation={true}
          onEndReachedThreshold={1}
          onEndReached={getData}
          ListFooterComponent={loadinSpinner}
          keyExtractor={(item, index) => "#" + index.toString()}
        />
      ) : styleView === 3 ? (
        <FlatList
          key={"$"}
          decelerationRate={"fast"}
          snapToAlignment={"fast"}
          viewabilityConfig={{ itemVisiblePercentThreshold: 10000 }}
          contentContainerStyle={{
            paddingBottom: vsc(30),
            marginBottom: vsc(30),
          }}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={listOfProduct}
          maxToRenderPerBatch={15} // 5
          updateCellsBatchingPeriod={5} // 50
          initialNumToRender={10} // 3
          windowSize={5} // 5
          legacyImplementation={true}
          renderItem={renderHorizontal}
          onEndReachedThreshold={1}
          onEndReached={getData}
          ListFooterComponent={loadinSpinnerHorital}
          keyExtractor={(item, index) => "$" + index.toString()}
        />
      ) : styleView === 4 ? (
        <FlatList
          key={"@"}
          contentContainerStyle={{
            paddingBottom: vsc(100),
            marginBottom: vsc(100),
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={listOfProduct}
          maxToRenderPerBatch={15} // 5
          updateCellsBatchingPeriod={5} // 50
          initialNumToRender={10} // 3
          windowSize={5} // 5
          legacyImplementation={true}
          renderItem={renderSingalItem}
          onEndReachedThreshold={1}
          onEndReached={getData}
          ListFooterComponent={loadinSpinner}
          keyExtractor={(item, index) => "@" + index.toString()}
        />
      ) : null}
      {/* poduct list items */}
    </View>
  );
};

export default Matches;
