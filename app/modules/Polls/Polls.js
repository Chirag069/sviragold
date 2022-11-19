/* eslint-disable radix */
import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  Pressable,
  SafeAreaView,
  SafeAreaViewBase,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

import { SafeArea } from "./Poll.Style.js";
import { useSelector, useDispatch } from "react-redux";
import CustomStatusBar from "../../Custom/CustomStatusBar.js";
import AviraHeader from "../../components/aviraHeader.Component.js";
import SeachModal from "../../components/SeachModal.Component.js";

import {
  addCardItemsAction,
  addRemoveLikeItemsAction,
  setSizeModalValues,
  setGroupModalValues,
} from "../../redux/actions/productActions.js";

import SIzeSelectionModal from "../More/Components/SIzeSelectionModal.Component";
import GroupModelSelectoion from "../More/Components/GroupModelSelectoion.Component";
import { GuestUserModalShowAction } from "../../redux/actions/authActons";

import { sc, vsc, msc } from "../../appConstants/Utils";

import CustomButton from "../../Custom/CustomButton.js";
import { RadioButton } from "react-native-paper";

const Polls = ({ navigation, route }) => {
  const { item } = route.params;
  const { userToken } = useSelector((state) => state.authState);

  const [stateLoading, setStateLoading] = useState(false);

  const [qtyValue, setQtyValue] = useState(1);
  const [text, onChangeText] = useState("");
  const [selectionItemId, setSelectionItemID] = useState(null);
  const [groupItemIdValue, setGroupItemValue] = useState(null);
  const [priceValue, setPriceValue] = useState(null);
  const [typeValue, setTypeValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [stoneValue, setStoneValue] = useState(null);
  const [grossWeight, setGrossWeight] = useState(null);
  const [stoneWeightValue, setStoneWeightValue] = useState(null);
  const [netWeightValue, setNetWeightValue] = useState(null);
  const [proIdValue, setProIdValue] = useState(null);
  const [proItemObject, setProItemObject] = useState(null);

  const [imageViewShow, setImageViewShow] = useState(false);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [addtocartsubitem, setAddtocartsubitem] = useState([]);
  const [checked, setChecked] = React.useState(null);
  let itemsub = addtocartsubitem + "";
  var itemsubcat = itemsub.split(",");

  const addtocartmodel = () => {
    setAddtocartsubitem(item?.item_sub_data);
    if (item.item_sub_data?.length > 1) {
      setModalVisible(true);
    } else {
      addToCardItemFun();
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setPriceValue(item.amount ? item.amount : "");
      setTypeValue(item.item ? item.item : "");
      setCategoryValue(item.item_category ? item.item_category : "");
      setStoneValue(item.stone_per ? item.stone_per : "");
      setGrossWeight(item.gr ? item.gr : "");
      setStoneWeightValue(item.ls ? item.ls : "");
      setNetWeightValue(item.nt ? item.nt : "");
      setProIdValue(item.id ? item.id : "");
      setProItemObject(item);

      setImageViewShow(false);
      onChangeText("");
      setQtyValue(1);

      const sizeIdValueObj = sizeListItems.find(
        (values) => values.id === item.size_id
      );
      const sizeIdValueValue =
        sizeIdValueObj && sizeIdValueObj.size ? sizeIdValueObj.size : null;
      setSelectionItemID(sizeIdValueValue);

      const groupIdValueObj = groupListItems.find(
        (values) => values.id === item.items_group_id
      );
      const groupIdValueValue =
        groupIdValueObj && groupIdValueObj.name ? groupIdValueObj.name : null;

      setGroupItemValue(groupIdValueValue);
    });

    return unsubscribe;
  }, [item]);

  const {
    sizeListItems,
    groupListItems,
    incAndDecCardServerLoading,
    likeItemServerLoading,
    likeListIds,
  } = useSelector((state) => state.productState);

  const addToCardItemFun = () => {
    if (userToken) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          const sizeIdValueObjFind = sizeListItems.find(
            (values) => values.size === selectionItemId
          );
          const sizeIdValueValueSetId =
            sizeIdValueObjFind && sizeIdValueObjFind.id
              ? sizeIdValueObjFind.id
              : null;

          const groupIdValueObjFind = groupListItems.find(
            (values) => values.name === groupItemIdValue
          );
          const groupIdValueValueId =
            groupIdValueObjFind && groupIdValueObjFind.id
              ? groupIdValueObjFind.id
              : null;

          dispatch(
            addCardItemsAction(
              proItemObject?.id,
              qtyValue.toString(),
              "*",
              groupIdValueValueId
                ? groupIdValueValueId
                : item.items_group_id
                ? item.items_group_id
                : null,
              sizeIdValueValueSetId
                ? sizeIdValueValueSetId
                : item.size_id
                ? item.size_id
                : Array.isArray(sizeListItems) &&
                  sizeListItems.length > 0 &&
                  sizeListItems[0] &&
                  sizeListItems[0].id
                ? sizeListItems[0].id
                : null,
              text,
              "addtocart",
              checked
            )
          );
        } else {
          Toast.show({
            text1: "Check your Internet Connection",
            visibilityTime: 3000,
            autoHide: true,
            position: "bottom",
            type: "error",
          });
        }
      });
    } else {
      dispatch(GuestUserModalShowAction(true));
    }
  };

  const LikeToUnLikeFun = () => {
    if (userToken) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          dispatch(addRemoveLikeItemsAction(proItemObject?.id, "unlike"));
        } else {
          Toast.show({
            text1: "Check your Internet Connection",
            visibilityTime: 3000,
            autoHide: true,
            position: "bottom",
            type: "error",
          });
        }
      });
    } else {
      dispatch(GuestUserModalShowAction(true));
    }
  };

  const UnLikeToLikeFun = () => {
    if (userToken) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          dispatch(addRemoveLikeItemsAction(proItemObject?.id, "like"));
        } else {
          Toast.show({
            text1: "Check your Internet Connection",
            visibilityTime: 3000,
            autoHide: true,
            position: "bottom",
            type: "error",
          });
        }
      });
    } else {
      dispatch(GuestUserModalShowAction(true));
    }
  };

  const images = [
    {
      url: item.image,
      props: {},
    },
  ];

  const setSizeItemValuePress = () => {
    if (userToken) {
      const sizeIdValueObjFind = sizeListItems.find(
        (values) => values.size === selectionItemId
      );
      const sizeIdValueValueSetId =
        sizeIdValueObjFind && sizeIdValueObjFind.id
          ? sizeIdValueObjFind.id
          : null;

      dispatch(setSizeModalValues(item, sizeIdValueValueSetId, true));
    } else {
      dispatch(GuestUserModalShowAction(true));
    }
  };

  const onChangeSizeValue = (sizeValue) => {
    const sizeIdValueObj = sizeListItems.find(
      (values) => values.id === sizeValue
    );
    const sizeIdValueValueSet =
      sizeIdValueObj && sizeIdValueObj.size ? sizeIdValueObj.size : null;
    setSelectionItemID(sizeIdValueValueSet);
  };

  const setGroupItemValuePress = () => {
    if (userToken) {
      const groupIdValueObj = groupListItems.find(
        (values) => values.name === groupItemIdValue
      );
      const groupIdValueObjValue =
        groupIdValueObj && groupIdValueObj.id ? groupIdValueObj.id : null;

      dispatch(setGroupModalValues(item, groupIdValueObjValue, true));
    } else {
      dispatch(GuestUserModalShowAction(true));
    }
  };

  const onChangeGroupValue = (groupValueID) => {
    if (userToken) {
      if (!(groupValueID == groupItemIdValue)) {
        var empty = JSON.stringify({
          design_code_id: parseInt(item.design_code_id),
          items_group_id: parseInt(groupValueID),
        });

        var config = {
          method: "post",
          url: "http://rd.ragingdevelopers.com/svira/svira1api/items/product_details_change",
          headers: {
            "If-Range": userToken,
            "Content-Type": "application/json",
          },
          data: empty,
        };

        setStateLoading(true);

        axios(config)
          .then(function (response) {
            setStateLoading(false);

            if (response && response.data && response.data.data) {
              setProItemObject(response.data.data);
              setProIdValue(response.data.data.id ? response.data.data.id : "");
              setPriceValue(
                response.data.data.amount ? response.data.data.amount : ""
              );
              setTypeValue(
                response.data.data.item ? response.data.data.item : ""
              );
              setCategoryValue(
                response.data.data.item_category
                  ? response.data.data.item_category
                  : ""
              );
              setStoneValue(
                response.data.data.stone_per ? response.data.data.stone_per : ""
              );
              setGrossWeight(
                response.data.data.gr ? response.data.data.gr : ""
              );
              setStoneWeightValue(
                response.data.data.ls ? response.data.data.ls : ""
              );
              setNetWeightValue(
                response.data.data.nt ? response.data.data.nt : ""
              );
            }
          })
          .catch(function (error) {
            setStateLoading(false);
          });
      }

      const groupIdValueObj = groupListItems.find(
        (values) => values.id === groupValueID
      );
      const groupIdValueObjValue =
        groupIdValueObj && groupIdValueObj.name ? groupIdValueObj.name : null;

      setGroupItemValue(groupIdValueObjValue);
    } else {
      dispatch(GuestUserModalShowAction(true));
    }
  };

  return (
    <View bgColor={"#FFFEFD"}>
      <CustomStatusBar backgroundColor="#db9b7b" />
      <AviraHeader navigation={navigation} />
      <SeachModal navigation={navigation} />
      <Spinner
        visible={
          incAndDecCardServerLoading || likeItemServerLoading || stateLoading
        }
        textContent={"Loading..."}
        textStyle={{ color: "#fff", fontSize: vsc(14) }}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <SIzeSelectionModal onChangeSizeValue={onChangeSizeValue} />

      <GroupModelSelectoion onChangeGroupValue={onChangeGroupValue} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          // onPress={() => {
          //   setModalVisible(!modalVisible);
          // }}
          style={{ backgroundColor: "rgba(0,0,0,0.6)", flex: 1 }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <View
              style={{
                height: vsc(180),
                backgroundColor: "white",
                borderRadius: sc(15),
                paddingHorizontal: sc(10),
                paddingVertical: vsc(20),
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
                <Text style={{ fontSize: 20, marginBottom: vsc(10) }}>
                  Sub Category{" "}
                </Text>

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
                      <View
                        style={{
                          marginVertical: 10,
                          marginHorizontal: 5,
                          flexDirection: "row",

                          alignItems: "center",
                        }}
                      >
                        <RadioButton
                          value="first"
                          color="#db9b7b"
                          uncheckedColor="grey"
                          status={checked === index ? "checked" : "unchecked"}
                          onPress={() => setChecked(index)}
                        />
                        <Text
                          style={{
                            // borderWidth: sc(1),
                            // borderColor: "#db9b7b",

                            backgroundColor: "white",
                            color: "#db9b7b",
                            paddingHorizontal: sc(5),
                            paddingVertical: vsc(5),
                            // borderRadius: sc(5),
                            fontSize: vsc(20),
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View style={{ marginRight: sc(20) }}>
                    <CustomButton
                      borderWidth={sc(1)}
                      borderColor={"#c79248"}
                      buttoncolor={"white"}
                      buttonwidth={sc(150)}
                      buttonheight={vsc(35)}
                      text={"CANCEL"}
                      fontcolor={"#c79248"}
                      fontSize={sc(17)}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    />
                  </View>
                  <CustomButton
                    buttoncolor={"#db9b7b"}
                    buttonwidth={sc(150)}
                    buttonheight={vsc(35)}
                    text={"ADD TO CART"}
                    fontcolor={"white"}
                    fontSize={sc(17)}
                    onPress={() => {
                      if (checked == null) {
                        Toast.show({
                          text1: "Please Select Item",
                          visibilityTime: 3000,
                          autoHide: true,
                          position: "top",
                          type: "error",
                        });
                      } else {
                        addToCardItemFun();
                        setModalVisible(!modalVisible);
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={imageViewShow}
        transparent={true}
        style={{ backgroundColor: "#FFFFFF", position: "relative" }}
      >
        <CustomStatusBar backgroundColor="#db9b7b" />
        <TouchableOpacity
          onPress={() => {
            setImageViewShow(false);
          }}
          style={{
            top: Platform.OS === "ios" ? 60 : 20,
            zIndex: 5,
            position: "absolute",
            // left: Dimensions.get('window').width - (Platform.OS === 'ios' ? 60 : 50),
            right: vsc(20),
          }}
        >
          <AntDesign name="close" size={sc(27)} color={"#db9b7b"} />
        </TouchableOpacity>

        <ImageViewer backgroundColor={"#FFFFFF"} imageUrls={images} />
        <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
          <Image
            style={{
              width: sc(70),
              height: sc(70),
              resizeMode: "stretch",
            }}
            source={
              item.image
                ? {
                    uri: item.image,
                  }
                : require("../../assets/empty.jpg")
            }
          />
        </SafeAreaView>
      </Modal>

      {/* sizeModal toggle::end */}
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
              style={{
                color: "#db9b7b",
                fontWeight: "normal",
                fontSize: vsc(19),
              }}
            >
              {item.design_name ? item.design_name : ""}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* product items */}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              if (item.image) {
                setImageViewShow(true);
              }
            }}
          >
            <Image
              style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").width,
                resizeMode: "stretch",
              }}
              source={
                item.image
                  ? {
                      uri: item.image,
                    }
                  : require("../../assets/empty.jpg")
              }
            />
          </TouchableWithoutFeedback>

          {likeListIds.find((likeitemid) => likeitemid === item.id) ? (
            <TouchableOpacity
              onPress={LikeToUnLikeFun}
              style={{
                zIndex: 1,
                position: "absolute",
                top: vsc(10),
                left: "88%",
              }}
            >
              <AntDesign name="heart" size={sc(23)} color={"#db9b7b"} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={UnLikeToLikeFun}
              style={{
                zIndex: 1,
                position: "absolute",
                top: vsc(10),
                left: "88%",
              }}
            >
              <AntDesign name="hearto" size={sc(23)} color={"#db9b7b"} />
            </TouchableOpacity>
          )}
        </View>

        {/* quty === + 0 */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: vsc(15),
            marginHorizontal: sc(10),
          }}
        >
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontSize: vsc(14), color: "#000000" }}>
              Quantity:
            </Text>
          </View>

          <View
            style={{
              borderRadius: sc(5),
              borderWidth: sc(1),
              borderColor: "#DDDDDD",
              paddingVertical: vsc(8),
              paddingHorizontal: sc(10),
              flex: 0.4,
              alignItems: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Text style={{ fontSize: vsc(14), color: "#000000" }}>
              {qtyValue}
            </Text>
          </View>
          <View style={{ flex: 0.1 }} />

          <TouchableWithoutFeedback
            onPress={() => {
              if (qtyValue > 1) {
                setQtyValue((valueQty) => valueQty - 1);
              }
            }}
          >
            <View
              style={{
                borderWidth: sc(1),
                borderColor: "#DDDDDD",
                paddingVertical: vsc(8),
                paddingHorizontal: sc(10),
                borderTopLeftRadius: sc(5),
                borderBottomLeftRadius: sc(5),
                flex: 0.1,
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: vsc(14), color: "#000000" }}>-</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setQtyValue((valueQty) => valueQty + 1);
            }}
          >
            <View
              style={{
                borderWidth: sc(1),
                borderColor: "#DDDDDD",
                paddingVertical: vsc(8),
                paddingHorizontal: sc(10),
                borderTopRightRadius: sc(5),
                borderBottomRightRadius: sc(5),
                flex: 0.1,
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: vsc(14), color: "#000000" }}>+</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: sc(10),
            marginTop: vsc(15),
            justifyContent: "flex-start",
          }}
        >
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontSize: vsc(14), color: "#000000" }}>
              Remarks:
            </Text>
          </View>
          <View style={{ flex: 0.7, right: sc(20) }}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder=""
              placeholderTextColor="#000000"
              multiline
              numberOfLines={4}
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: sc(1),
                borderColor: "#dddddd",
                paddingVertical: vsc(4),
                borderRadius: vsc(5),
                paddingHorizontal: vsc(5),
                textAlignVertical: "top",
                fontSize: vsc(14),
              }}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginVertical: vsc(10),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSizeItemValuePress();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: vsc(5),
              paddingVertical: vsc(10),
              paddingHorizontal: sc(40),
              borderRadius: vsc(5),
              backgroundColor: "#db9b7b",
              flex: 0.4,
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <View style={{}}>
              <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>
                Size :
              </Text>
            </View>
            <View>
              <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>
                {selectionItemId ? selectionItemId : ""}
              </Text>
            </View>
            <View style={{ marginLeft: 2 }}>
              <AntDesign name="caretdown" color="#FFFFFF" size={sc(12)} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setGroupItemValuePress();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: vsc(5),
              paddingVertical: vsc(10),
              paddingHorizontal: sc(40),
              borderRadius: vsc(5),
              backgroundColor: "#db9b7b",
              flex: 0.4,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View>
              <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>
                Group :
              </Text>
            </View>
            <View>
              <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>
                {groupItemIdValue ? groupItemIdValue : ""}{" "}
              </Text>
            </View>
            <View style={{ marginLeft: sc(2), fontSize: vsc(14) }}>
              <AntDesign name="caretdown" color="#FFFFFF" size={sc(12)} />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: vsc(10),
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              padding: vsc(10),
              borderWidth: vsc(1),
              borderColor: "#DDDDDD",
            }}
          >
            <Text style={{ color: "#db9b7b", fontSize: vsc(18) }}>
              Product Details
            </Text>
          </View>

          <View
            style={{
              elevation: 0.4,
              width: "100%",
              marginTop: vsc(5),
            }}
          />

          <View style={{ marginHorizontal: sc(10) }}>
            <View
              style={{
                marginTop: vsc(5),
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: vsc(5),
              }}
            >
              <View style={{ flex: 0.4 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  Type
                </Text>
              </View>
              <View style={{ flex: 0.1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                ></Text>
              </View>
              <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  {typeValue ? typeValue : "-"}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingVertical: vsc(0.3),
                elevation: 0.4,
                backgroundColor: "#dddddd",
                width: "100%",
                marginTop: vsc(5),
              }}
            />

            <View
              style={{
                marginTop: vsc(5),
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: vsc(5),
              }}
            >
              <View style={{ flex: 0.5 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  Category
                </Text>
              </View>
              <View style={{ flex: 0.1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                ></Text>
              </View>
              <View style={{ flex: 0.4, alignItems: "flex-end" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  {categoryValue ? categoryValue : "-"}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingVertical: vsc(0.3),
                elevation: 0.4,
                backgroundColor: "#dddddd",
                width: "100%",
                marginTop: vsc(5),
              }}
            />

            <View
              style={{
                marginTop: vsc(5),
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: vsc(5),
              }}
            >
              <View style={{ flex: 0.5 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  Stone %
                </Text>
              </View>
              <View style={{ flex: 0.1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                ></Text>
              </View>
              <View style={{ flex: 0.4, alignItems: "flex-end" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  {stoneValue ? `${stoneValue} %` : "-"}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingVertical: vsc(0.3),
                elevation: 0.4,
                backgroundColor: "#dddddd",
                width: "100%",
                marginTop: vsc(5),
              }}
            />

            <View
              style={{
                marginTop: vsc(5),
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: vsc(5),
              }}
            >
              <View style={{ flex: 0.5 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  Gross weight
                </Text>
              </View>
              <View style={{ flex: 0.1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                ></Text>
              </View>
              <View style={{ flex: 0.4, alignItems: "flex-end" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  {grossWeight ? grossWeight : "-"}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingVertical: vsc(0.3),
                elevation: 0.4,
                backgroundColor: "#dddddd",
                width: "100%",
                marginTop: vsc(5),
              }}
            />

            <View
              style={{
                marginTop: vsc(5),
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: vsc(5),
              }}
            >
              <View style={{ flex: 0.5 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  Stone weight
                </Text>
              </View>
              <View style={{ flex: 0.1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                ></Text>
              </View>
              <View style={{ flex: 0.4, alignItems: "flex-end" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  {stoneWeightValue ? stoneWeightValue : "-"}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingVertical: vsc(0.3),
                elevation: 0.4,
                backgroundColor: "#dddddd",
                width: "100%",
                marginTop: vsc(5),
              }}
            />

            <View
              style={{
                marginTop: vsc(5),
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: vsc(5),
              }}
            >
              <View style={{ flex: 0.5 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  Net weight
                </Text>
              </View>
              <View style={{ flex: 0.1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                ></Text>
              </View>
              <View style={{ flex: 0.4, alignItems: "flex-end" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  {netWeightValue ? netWeightValue : "-"}
                </Text>
              </View>
            </View>

            <View
              style={{
                paddingVertical: vsc(0.3),
                elevation: 0.4,
                backgroundColor: "#dddddd",
                width: "100%",
                marginTop: vsc(5),
              }}
            />

            <View
              style={{
                marginTop: vsc(5),
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFFEFD",
                paddingVertical: vsc(5),
              }}
            >
              <View style={{ flex: 0.5 }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  Stone Rs.
                </Text>
              </View>
              <View style={{ flex: 0.1, alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                ></Text>
              </View>
              <View style={{ flex: 0.4, alignItems: "flex-end" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize:
                      Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                  }}
                >
                  {priceValue ? priceValue : "-"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingBottom: vsc(50) }} />
      </ScrollView>

      <View
        style={{
          backgroundColor: "#FFFFFF",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: vsc(10),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (
              likeListIds.find((likeitemid) => likeitemid === proItemObject?.id)
            ) {
              LikeToUnLikeFun();
            } else {
              UnLikeToLikeFun();
            }
          }}
          style={{
            backgroundColor: "#666666",
            paddingVertical: vsc(13),
            paddingHorizontal: sc(14),
            borderRadius: sc(6),
            flex: 0.45,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.1}
            style={{ color: "#FFFFFF", fontSize: vsc(14) }}
          >
            {likeListIds.find((likeitemid) => likeitemid === item?.id)
              ? "REMOVE TO WHSHILIST"
              : "ADD TO WHISHLIST"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addtocartmodel}
          style={{
            backgroundColor: "#db9b7b",
            paddingVertical: vsc(13),
            paddingHorizontal: sc(14),
            borderRadius: sc(6),
            flex: 0.45,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>
            ADD TO CART
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Polls);
