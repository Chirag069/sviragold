/* eslint-disable radix */
import React, { memo, useState, useEffect } from "react";
import {
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  Image,
  Alert,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  addCardItemsAction,
  RemoveCardItemsAction,
  setRemarkModalValues,
  setSizeModalValues,
  setGroupModalValues,
  getCardItemsAction,
} from "../../../redux/actions/productActions.js";

import { sc, vsc, msc } from "../../../appConstants/Utils";

import { RadioButton } from "react-native-paper";
import CustomButton from "../../../Custom/CustomButton.js";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors.js";

const CardItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.authState);
  const { sizeListItems, groupListItems, cardItems } = useSelector(
    (state) => state.productState
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [addtocartsubitem, setAddtocartsubitem] = useState([]);

  const itemsubdata = cardItems.find((values) => values.id === item.id);
  const itemsubdatasingal = cardItems.find((values) => values.id == item.id);

  // const itemsubdatasingle = itemsubdata.item_sub_data_single;

  let itemsub = itemsubdata.item_sub_data + "";
  var itemsubcat = itemsub.split(",");

  const Touchable =
    Platform.OS === "iOS" ? TouchableHighlight : TouchableNativeFeedback;

  const addtocartmodel = () => {
    setAddtocartsubitem(item?.item_sub_data);
    if (item.item_sub_data?.length > 1) {
      setModalVisible(true);
    } else {
      addToCardItemFun();
    }
  };

  const addToCardItemFun = () => {
    if (userToken) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          dispatch(
            addCardItemsAction(
              item.id,
              0,
              "*",
              item.items_group_id ? item.items_group_id : null,
              item.size_id
                ? item.size_id
                : Array.isArray(sizeListItems) &&
                  sizeListItems.length > 0 &&
                  sizeListItems[0] &&
                  sizeListItems[0].id
                ? sizeListItems[0].id
                : null,
              null,
              "addtocart",
              checked
            )
          );
          dispatch(getCardItemsAction());
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

    // add to card application
  };

  const IncementCardItemValueFun = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        dispatch(
          addCardItemsAction(
            item.id,
            item.cart_qty,
            "+",
            item.items_group_id,
            item.size_id,
            item.remark,
            "+"
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
  };

  const DecementCardItemValueFun = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (item.cart_qty > parseInt("1")) {
          dispatch(
            addCardItemsAction(
              item.id,
              item.cart_qty,
              "-",
              item.items_group_id,
              item.size_id,
              item.remark,
              "+"
            )
          );
        }
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
  };

  const RemovecardItemFun = () => {
    Alert.alert(
      //title
      "",
      //body
      "Are you sure you want to remove this item?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Ok",
          onPress: () => {
            NetInfo.fetch().then((state) => {
              if (state.isConnected) {
                dispatch(RemoveCardItemsAction(item.id));
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
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

  const RemarkValuePress = () => {
    dispatch(setRemarkModalValues(item, item.remark));
  };

  const setSizeItemValuePress = () => {
    dispatch(setSizeModalValues(item, item.size_id));
  };

  const setGroupItemValuePress = () => {
    dispatch(setGroupModalValues(item, item.items_group_id));
  };

  const sizeIdValueObj = sizeListItems.find(
    (values) => values.id === item.size_id
  );

  const sizeIdValueValue =
    sizeIdValueObj && sizeIdValueObj.size ? sizeIdValueObj.size : null;

  const groupIdValueObj = groupListItems.find(
    (values) => values.id === item.items_group_id
  );
  const groupIdValueValue =
    groupIdValueObj && groupIdValueObj.name ? groupIdValueObj.name : null;

  const subcategoryobj = cardItems.find((values) => values.id === item.id);

  const [checked, setChecked] = React.useState(
    subcategoryobj.item_sub_data_single
  );

  return (
    <>
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
                <Text style={{ fontSize: vsc(20), marginBottom: vsc(10) }}>
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
                          marginVertical: vsc(5),
                          marginHorizontal: sc(5),
                          flexDirection: "row",

                          alignItems: "center",
                        }}
                      >
                        <View style={{}}>
                          <RadioButton
                            value="first"
                            color="#db9b7b"
                            uncheckedColor="grey"
                            status={checked === index ? "checked" : "unchecked"}
                            onPress={() => setChecked(index)}
                          />
                        </View>
                        <Text
                          style={{
                            // borderWidth: sc(1),
                            // borderColor: "#db9b7b",

                            backgroundColor: "white",
                            color: "#db9b7b",
                            paddingHorizontal: sc(5),
                            paddingVertical: vsc(5),
                            // borderRadius: sc(5),
                            fontSize: sc(22),
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
                        addToCardItemFun(), setModalVisible(!modalVisible);
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
      <View
        style={{
          ...Platform.select({
            android: {
              elevation: 3,
            },
            ios: {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
            },
          }),
          marginHorizontal: sc(10),
          overflow: "hidden",
          borderRadius: sc(5),
          marginTop: vsc(10),
          elevation: 3,
        }}
      >
        <View
          onPress={() => navigation.navigate("Polls", { item: item })}
          underlayColor="rgba(252,186,3,0.9)"
          background={TouchableNativeFeedback.Ripple("rgba(252,186,3,0.9)")}
        >
          <View
            style={{
              borderRadius: sc(5),
              backgroundColor: "#FFFFFF",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 0.5 }}>
              <View style={{ marginTop: 0 }}>
                <Image
                  style={{
                    borderTopLeftRadius: sc(5),
                    width: Dimensions.get("window").width * 0.46,
                    height: Dimensions.get("window").width * 0.48,
                    resizeMode: "stretch",
                  }}
                  source={
                    item.image
                      ? {
                          uri: item.image,
                        }
                      : require("../../../assets/empty.jpg")
                  }
                />
              </View>
            </View>

            <View style={{ flex: 0.5, justifyContent: "space-between" }}>
              <View style={{ marginTop: vsc(5), flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: vsc(16), color: "#000000" }}>
                    {item.design_name
                      ? item.design_name
                      : item.item
                      ? item.item
                      : ""}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Polls", { item: item })}
                    style={{
                      marginLeft: "auto",
                      marginRight: sc(10),
                      marginTop: vsc(3),
                    }}
                  >
                    <SimpleLineIcons name="size-fullscreen" size={vsc(20)} />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: vsc(5) }}>
                  <Text style={{ fontSize: vsc(16), color: "#db9b7b" }}>
                    {item.item_category ? item.item_category : ""}
                  </Text>
                </View>
              </View>

              {/* size component */}
              <TouchableOpacity
                onPress={setSizeItemValuePress}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: vsc(-20),
                }}
              >
                <View style={{}}>
                  <Text style={{ color: "#000000", fontSize: vsc(14) }}>
                    Size :
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "#808080", fontSize: vsc(14) }}>
                    {sizeIdValueValue}
                  </Text>
                </View>
                <View style={{ marginLeft: vsc(2) }}>
                  <AntDesign name="caretdown" color="#808080" size={vsc(12)} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={setGroupItemValuePress}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: vsc(5),
                  marginRight: vsc(10),
                }}
              >
                <View>
                  <Text style={{ color: "#000000", fontSize: vsc(14) }}>
                    Group :
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "#808080", fontSize: vsc(14) }}>
                    {groupIdValueValue}
                  </Text>
                </View>
                <View style={{ marginLeft: sc(2) }}>
                  <AntDesign name="caretdown" color="#808080" size={vsc(12)} />
                </View>
              </TouchableOpacity>
              {/* end size and group */}

              {/* remark */}
              <TouchableOpacity
                onPress={RemarkValuePress}
                style={{ flexDirection: "row", marginBottom: vsc(5) }}
              >
                <View>
                  <Text style={{ color: "#000000", fontSize: vsc(14) }}>
                    Remark:{" "}
                  </Text>
                </View>
                <View>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.1}
                    style={{
                      color: "#808080",
                      textDecorationLine: "underline",
                      fontSize: vsc(14),
                    }}
                  >
                    {item.remark && item.remark.length > 20
                      ? `${item.remark.substring(0, 20)}...`
                      : item.remark
                      ? item.remark
                      : "write your remark"}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* remark */}

              {/* {Sub Category} */}
              {subcategoryobj?.item_sub_data_single?.length == 0 ? (
                <View />
              ) : (
                <TouchableOpacity
                  onPress={addtocartmodel}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: vsc(5),
                  }}
                >
                  <View style={{}}>
                    <Text style={{ color: "#000000", fontSize: vsc(14) }}>
                      Sub Category :
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "#808080", fontSize: vsc(14) }}>
                      {subcategoryobj.item_sub_data_single}
                    </Text>
                  </View>
                  <View style={{ marginLeft: vsc(2) }}>
                    <AntDesign
                      name="caretdown"
                      color="#808080"
                      size={vsc(12)}
                    />
                  </View>
                </TouchableOpacity>
              )}

              {/* sub Category end */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    borderRadius: sc(50),
                    borderWidth: sc(1),
                    borderColor: "#808080",
                    backgroundColor: "#FFFEFD",
                    width: vsc(100),
                    // marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: vsc(2),
                      paddingHorizontal: sc(2),
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        borderRadius: vsc(50),
                        overflow: "hidden",
                      }}
                    >
                      <Touchable
                        background={TouchableNativeFeedback.Ripple("#db9b7b")}
                        onPress={DecementCardItemValueFun}
                      >
                        <View
                          style={{
                            height: vsc(25),
                            width: vsc(25),
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#FFFFFF",
                            borderWidth: vsc(1),
                            borderColor: "#000000",
                            borderRadius: vsc(50),
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: "#808080",
                              fontSize: vsc(14),
                            }}
                          >
                            -
                          </Text>
                        </View>
                      </Touchable>
                    </View>

                    <View style={{ paddingHorizontal: sc(5) }}>
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.1}
                        style={{
                          textAlign: "center",
                          color: "#000000",
                          fontSize:
                            item.cart_qty && item.cart_qty.length == 2
                              ? vsc(13)
                              : item.cart_qty.length == 3
                              ? vsc(12)
                              : vsc(14),
                        }}
                      >
                        {item.cart_qty ? item.cart_qty : 1}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRadius: vsc(50),
                        overflow: "hidden",
                      }}
                    >
                      <Touchable
                        background={TouchableNativeFeedback.Ripple("#db9b7b")}
                        onPress={IncementCardItemValueFun}
                      >
                        <View
                          style={{
                            height: vsc(25),
                            width: vsc(25),
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#FFFFFF",
                            borderWidth: vsc(1),
                            borderColor: "#000000",
                            borderRadius: vsc(50),
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: "#808080",
                              fontSize: vsc(14),
                            }}
                          >
                            +
                          </Text>
                        </View>
                      </Touchable>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    borderRadius: vsc(25),
                    marginRight: vsc(5),
                    marginTop: sc(10),
                  }}
                >
                  <TouchableOpacity onPress={RemovecardItemFun}>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      color="#808080"
                      size={vsc(26)}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* space */}
              <View style={{ marginVertical: vsc(3) }} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default memo(CardItem);
