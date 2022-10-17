/* eslint-disable radix */
import React, { memo } from "react";
import {
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import AntDesign from "react-native-vector-icons/AntDesign";

import { addRemoveLikeItemsAction } from "../../../redux/actions/productActions.js";
import { sc, vsc, msc } from "../../../appConstants/Utils";

const LikeItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

  const { likeListIds } = useSelector((state) => state.productState);

  const LikeUnlikeItemFun = () => {
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
  };

  return (
    <View style={{ elevation: 2 }}>
      {likeListIds.find((likeitemid) => likeitemid === item.id) ? (
        <View
          style={{
            overflow: "hidden",
            borderRadius: sc(5),
            marginTop: vsc(10),
            marginHorizontal: sc(10),
            elevation: 4,
          }}
        >
          <Touchable
            underlayColor="rgba(252,186,3,0.9)"
            background={TouchableNativeFeedback.Ripple("rgba(252,186,3,0.9)")}
            onPress={() => navigation.navigate("Polls", { item: item })}
          >
            <View
              style={{
                borderRadius: vsc(5),
                backgroundColor: "#FFFFFF",
                flexDirection: "row",
              }}
            >
              <View style={{ position: "relative", flex: 0.5 }}>
                <View style={{ marginTop: vsc(0) }}>
                  <Image
                    style={{
                      borderTopLeftRadius: vsc(5),
                      width: Dimensions.get("window").width * 0.46,
                      height: Dimensions.get("window").width * 0.4,
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
                <TouchableOpacity
                  onPress={LikeUnlikeItemFun}
                  style={{
                    marginTop: vsc(5),
                    position: "absolute",
                    top: 0,
                    left: "80%",
                    zIndex: 1,
                  }}
                >
                  <AntDesign name="heart" size={sc(23)} color={"#db9b7b"} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginVertical: vsc(5),
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flex: 0.5,
                }}
              >
                <View>
                  {item.design_name ? (
                    <View style={{ marginTop: vsc(5) }}>
                      <Text style={{ color: "#db9b7b", fontSize: vsc(18) }}>
                        {item.design_name ? item.design_name : ""}
                      </Text>
                    </View>
                  ) : null}
                  {item.item ? (
                    <View style={{ marginTop: vsc(5) }}>
                      <Text style={{ color: "#000000", fontSize: vsc(14) }}>
                        {" "}
                        {item.item ? item.item : "-"}{" "}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View>
                  {item.gr ? (
                    <View style={{ marginTop: vsc(4) }}>
                      <Text style={{ fontSize: vsc(15), color: "#808080" }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: vsc(15),
                            color: "#808080",
                          }}
                        ></Text>{" "}
                        GR: {item.gr}
                      </Text>
                    </View>
                  ) : null}
                  {item.ls ? (
                    <View style={{ marginTop: vsc(4) }}>
                      <Text style={{ fontSize: vsc(15), color: "#808080" }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: vsc(15),
                            color: "#808080",
                          }}
                        ></Text>{" "}
                        LS: {item.ls}
                      </Text>
                    </View>
                  ) : null}
                  {item.nt ? (
                    <View style={{ marginTop: vsc(4) }}>
                      <Text style={{ fontSize: vsc(15), color: "#808080" }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: vsc(15),
                            color: "#808080",
                          }}
                        ></Text>{" "}
                        NT: {item.nt}
                      </Text>
                    </View>
                  ) : null}

                  {item.gender ? (
                    <View style={{ marginTop: vsc(10) }}>
                      <Text style={{ fontSize: vsc(16), color: "#808080" }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: vsc(17),
                            color: "#808080",
                          }}
                        ></Text>{" "}
                        Gender: {item.gender}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </Touchable>
        </View>
      ) : null}
    </View>
  );
};

export default memo(LikeItem);
