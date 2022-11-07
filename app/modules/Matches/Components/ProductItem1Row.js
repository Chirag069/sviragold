import React, { useState, memo } from "react";
import {
  TouchableNativeFeedback,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GuestUserModalShowAction } from "../../../redux/actions/authActons.js";

import {
  addRemoveLikeItemsAction,
  addCardItemsAction,
} from "../../../redux/actions/productActions.js";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

import { sc, vsc } from "../../../appConstants/Utils";
import CustomButton from "../../../Custom/CustomButton.js";
import { RadioButton } from "react-native-paper";

const ProductItem1Row = ({ item, Touchable, navigation }) => {
  const [qtyValue, setQtyValue] = useState(1);

  const dispatch = useDispatch();
  const { likeListIds, sizeListItems } = useSelector(
    (state) => state.productState
  );

  const { userToken } = useSelector((state) => state.authState);

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

  const LikeToUnLikeFun = () => {
    if (userToken) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          dispatch(addRemoveLikeItemsAction(item.id, "unlike"));
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
          dispatch(addRemoveLikeItemsAction(item.id, "like"));
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

  const addToCardItemFun = () => {
    setModalVisible(true);
    if (userToken) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          dispatch(
            addCardItemsAction(
              item.id,
              qtyValue.toString(),
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

  const hardIconComponent = likeListIds.find(
    (likeitemid) => likeitemid === item.id
  ) ? (
    <TouchableOpacity
      onPress={LikeToUnLikeFun}
      style={{
        top: 0,
        zIndex: 1,
        left: "77%",
        marginTop: vsc(5),
        position: "absolute",
      }}
    >
      <AntDesign name="heart" size={sc(23)} color={"#db9b7b"} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={UnLikeToLikeFun}
      style={{
        marginTop: vsc(5),
        position: "absolute",
        top: vsc(0),
        left: "77%",
        zIndex: 1,
      }}
    >
      <AntDesign name="hearto" size={sc(23)} color={"#db9b7b"} />
    </TouchableOpacity>
  );

  const cardIconItem = true ? (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        marginTop: vsc(5),
        position: "absolute",
        top: 0,
        left: "10%",
      }}
    >
      <MaterialCommunityIcons name="cart" size={sc(19)} color={"#808080"} />
    </TouchableOpacity>
  ) : null;

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
      <View style={{   
        shadowOffset: { width: 0, height: 0 },
          shadowColor: "black",
          shadowOpacity: 0.3 ,
          elevation: 3,
          backgroundColor: "#0000",}}>
      <View
        style={{
          marginHorizontal: sc(10),
          overflow: "hidden",
          borderRadius: sc(5),
          marginTop: vsc(10),
          elevation: 3,
       
        }}
      >
        <Touchable
          underlayColor="rgba(252,186,3,0.9)"
          background={TouchableNativeFeedback.Ripple("#ECECEC")}
          onPress={() => navigation.navigate("Polls", { item: item })}
        >
          <View
            style={{
              borderRadius: sc(5),
              backgroundColor: "#FFFFFF",
              flexDirection: "row",
              
            }}
          >
            <View style={{ position: "relative", flex: 0.5 }}>
              <View style={{ marginTop: 0 }}>
                <Image
                  style={{
                    borderTopLeftRadius: vsc(5),
                    width: Dimensions.get("window").width * 0.46,
                    height: Dimensions.get("window").width * 0.46,
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
              {hardIconComponent}
            </View>
            <View
              style={{
                marginVertical: vsc(5),
                justifyContent: "space-between",
                alignItems: "flex-start",
                flex: 0.5,
              }}
            >
              <>
                <View>
                  {item.design_name ? (
                    <View style={{ marginTop: vsc(5) }}>
                      <Text style={{ color: "#db9b7b", fontSize: vsc(16) }}>
                        {item.design_name ? item.design_name : ""}
                      </Text>
                    </View>
                  ) : null}
                  {item.item ? (
                    <View style={{ marginTop: vsc(5) }}>
                      <Text style={{ color: "#000000", fontSize: vsc(12) }}>
                        {" "}
                        {item.item ? item.item : "-"}{" "}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View>
                  {item.gr ? (
                    <View style={{ marginTop: vsc(5) }}>
                      <Text style={{ fontSize: vsc(15), color: "#808080" }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: vsc(15),
                            color: "#808080",
                          }}
                        ></Text>{" "}
                        Gross Rate: {item.gr}
                      </Text>
                    </View>
                  ) : null}
                  {item.gender ? (
                    <View style={{ marginTop: vsc(2) }}>
                      <Text style={{ fontSize: vsc(16), color: "#808080" }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: vsc(15),
                            color: "#808080",
                          }}
                        ></Text>{" "}
                        Gender: {item.gender}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </>

              {/* + - start card in and out */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  paddingHorizontal: vsc(2),
                  paddingBottom: vsc(5),
                }}
              >
                <View
                  style={{
                    borderRadius: vsc(5),
                    borderWidth: sc(1),
                    borderColor: "#DDDDDD",
                    paddingVertical: vsc(5),
                    paddingHorizontal: sc(13),
                    marginRight: sc(10),
                  }}
                >
                  <Text style={{ fontSize: vsc(14), color: "#000000" }}>
                    {qtyValue}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
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
                        paddingVertical: vsc(5),
                        paddingHorizontal: sc(13),
                        borderTopLeftRadius: sc(5),
                        borderBottomLeftRadius: sc(5),
                      }}
                    >
                      <Text style={{ fontSize: vsc(14), color: "#000000" }}>
                        -
                      </Text>
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
                        paddingVertical: vsc(5),
                        paddingHorizontal: sc(13),
                        borderTopRightRadius: sc(5),
                        borderBottomRightRadius: sc(5),
                      }}
                    >
                      <Text style={{ fontSize: vsc(14), color: "#000000" }}>
                        +
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              {/* card + - end */}

              {/* card icon */}

              <TouchableWithoutFeedback onPress={addtocartmodel}>
                <View
                  style={{
                    borderColor: "#db9b7b",
                    backgroundColor: "#db9b7b",
                    paddingHorizontal: sc(10),
                    flexDirection: "row",
                    paddingVertical: vsc(5),
                    borderWidth: sc(0.5),
                    paddingBottom: sc(5),
                    margin: "auto",
                    borderRadius: sc(5),
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginRight: sc(10) }}>
                    <MaterialCommunityIcons
                      name="cart"
                      size={vsc(15)}
                      color={"#FFFFFF"}
                    />
                  </View>
                  <View>
                    <Text style={{ color: "#FFFFFF", fontSize: vsc(12) }}>
                      Add to Cart
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              {/* card icon end */}
            </View>
          </View>
        </Touchable>
      </View>
      </View>
    </>
  );
};

export default memo(ProductItem1Row);
