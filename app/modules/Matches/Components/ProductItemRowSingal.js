import React, { memo, useState } from "react";
import {
  TouchableNativeFeedback,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import { GuestUserModalShowAction } from "../../../redux/actions/authActons.js";
import CustomButton from "../../../Custom/CustomButton.js";

import {
  addRemoveLikeItemsAction,
  addCardItemsAction,
} from "../../../redux/actions/productActions.js";
import { sc, vsc } from "../../../appConstants/Utils";
import { itemsubcategory } from "../../../redux/actions/productActions.js";
import { RadioButton } from "react-native-paper";

const ProductItemRowSingal = ({ item, Touchable, navigation }) => {
  const [qtyValue, setQtyValue] = useState(1);
  const dispatch = useDispatch();
  const { likeListIds, sizeListItems, itemsubcategory } = useSelector(
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

  console.log(checked);

  const addToCardItemFun = () => {
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

  const hardIconComponent = likeListIds.find(
    (likeitemid) => likeitemid === item.id
  ) ? (
    <TouchableOpacity
      onPress={LikeToUnLikeFun}
      style={{
        marginTop: vsc(5),
        zIndex: 1,
        padding: sc(5),
        borderWidth: sc(1.5),
        borderRadius: sc(19),
        borderColor: "#db9b7b",
      }}
    >
      <AntDesign name="heart" size={19} color={"#db9b7b"} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={UnLikeToLikeFun}
      style={{
        marginTop: vsc(5),
        zIndex: 1,
        padding: sc(5),
        borderWidth: sc(1.5),
        borderRadius: sc(19),
        borderColor: "#808080",
      }}
    >
      <AntDesign name="heart" size={19} color={"#808080"} />
    </TouchableOpacity>
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
      <View
        style={{
          // overflow: "hidden",
          borderRadius: sc(5),
          marginTop: vsc(10),
          marginHorizontal: sc(7),
          elevation: 4,
        }}
      >
        <Touchable
          underlayColor="rgba(252,186,3,0.9)"
          background={TouchableNativeFeedback.Ripple("#ECECEC")}
          onPress={() => navigation.navigate("Polls", { item: item })}
        >
          <View
            style={{
              // flex: 0.46,
              borderRadius: sc(5),
              backgroundColor: "#FFFFFF",
              elevation: 4,
            }}
          >
            <View
              style={{
                marginVertical: vsc(5),
                marginHorizontal: sc(5),
                flexDirection: "row",
                backgroundColor: "#FFFFFF",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <TouchableOpacity
                  onPress={addtocartmodel}
                  style={{
                    marginTop: vsc(5),
                    zIndex: 1,
                    padding: sc(5),
                    borderRadius: sc(19),
                    borderWidth: sc(1.5),
                    borderColor: "#808080",
                  }}
                >
                  <MaterialCommunityIcons
                    name="cart"
                    size={sc(19)}
                    color={"#808080"}
                  />
                </TouchableOpacity>
              </View>

              <View>{hardIconComponent}</View>
            </View>
            <View style={{}}>
              <View style={{ marginTop: vsc(0) }}>
                <Image
                  style={{
                    width: Dimensions.get("window").width - 15,
                    height: Dimensions.get("window").width - 30,
                    resizeMode: item.image ? "stretch" : "contain",
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

            <>
              <View
                style={{
                  marginVertical: vsc(7),
                  paddingHorizontal: sc(2),
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.1}
                    style={{ fontSize: vsc(14), color: "#000000" }}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.1}
                      style={{
                        fontWeight: "bold",
                        fontSize: vsc(15),
                        color: "#F6F7FB",
                      }}
                    ></Text>{" "}
                    {item.design_name ? item.design_name : ""}
                  </Text>
                </View>

                <View>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.1}
                    style={{ fontSize: vsc(14), color: "#000000" }}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.1}
                      style={{
                        fontWeight: "bold",
                        fontSize: vsc(15),
                        color: "#F6F7FB",
                      }}
                    ></Text>{" "}
                    {item.item_category
                      ? `Category: ${item.item_category}`
                      : ""}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginVertical: vsc(7),
                  paddingHorizontal: sc(2),
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.1}
                    style={{ fontSize: vsc(14), color: "#000000" }}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.1}
                      style={{
                        fontWeight: "bold",
                        fontSize: sc(15),
                        color: "#F6F7FB",
                      }}
                    ></Text>{" "}
                    {item.amount ? `RS: ${item.amount}` : ""}
                  </Text>
                </View>
                <View>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.1}
                    style={{ fontSize: vsc(14), color: "#000000" }}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.1}
                      style={{
                        fontWeight: "bold",
                        fontSize: vsc(15),
                        color: "#F6F7FB",
                      }}
                    ></Text>{" "}
                    {item.gr ? `GW: ${item.gr}` : ""}
                  </Text>
                </View>
              </View>
            </>

            {/*  item inpuit + -  */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: sc(2),
                paddingBottom: vsc(5),
              }}
            >
              <View
                style={{
                  borderRadius: sc(5),
                  borderWidth: sc(1),
                  borderColor: "#DDDDDD",
                  paddingVertical: vsc(7),
                  paddingHorizontal: sc(30),
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
                      paddingVertical: vsc(7),
                      paddingHorizontal: sc(30),
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
                      paddingVertical: vsc(7),
                      paddingHorizontal: sc(30),
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

            {/*  end item inpuit - + */}
          </View>
        </Touchable>
      </View>
    </>
  );
};

export default memo(ProductItemRowSingal);
