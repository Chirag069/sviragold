import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

import {
  addCardItemsAction,
  setSizeModalValues,
} from "../../../redux/actions/productActions";
import { sc, vsc, msc } from "../../../appConstants/Utils";

const SIzeSelectionModal = ({ onChangeSizeValue }) => {
  const dispatch = useDispatch();
  const {
    isProductDetailsState,
    sizeSetId,
    sizeProductObj,
    sizeModelState,
    sizeListItems,
  } = useSelector((state) => state.productState);
  const [selectionItemId, setSelectionItemID] = useState(
    sizeSetId === "0" ? null : sizeSetId ? sizeSetId : null
  );

  useEffect(() => {
    setSelectionItemID(sizeSetId === "0" ? null : sizeSetId ? sizeSetId : null);
  }, [sizeSetId]);

  const setMarkValue = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (isProductDetailsState) {
          onChangeSizeValue(selectionItemId);
        } else {
          dispatch(
            addCardItemsAction(
              sizeProductObj.id,
              "0",
              "*",
              sizeProductObj.items_group_id,
              selectionItemId,
              sizeProductObj.remark,
              "size"
            )
          );
        }
        dispatch(setSizeModalValues({}, ""));
        // selectionItemId("");
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
    <Modal animationIn="slideInUp" isVisible={sizeModelState}>
      <View
        style={{
          backgroundColor: "#F6F7FB",
          borderRadius: vsc(10),
          marginHorizontal: vsc(10),
          paddingBottom: vsc(20),
          elevation: 2,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: vsc(15),
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: vsc(17), color: "#000000" }}>
            {" "}
            Select Item Size
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: sc(50),
          }}
        >
          <View
            style={{
              marginTop: vsc(20),
              marginBottom: vsc(10),
            }}
          >
            {/* list item */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: vsc(10),
                flexWrap: "wrap",
              }}
            >
              {sizeListItems &&
              Array.isArray(sizeListItems) &&
              sizeListItems.length > 0 ? (
                <>
                  {sizeListItems.map((item, index) => (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setSelectionItemID(item.id);
                      }}
                    >
                      <View
                        style={{
                          borderColor: "#db9b7b",
                          backgroundColor:
                            selectionItemId === item.id ? "#db9b7b" : "#F6F7FB",
                          paddingVertical: vsc(8),
                          paddingHorizontal: vsc(6),
                          borderWidth: vsc(1),
                          alignSelf: "flex-start",
                          borderRadius: vsc(5),
                          margin: vsc(5),
                        }}
                      >
                        <Text
                          style={{
                            color: !(selectionItemId == item.id)
                              ? "#db9b7b"
                              : "#F6F7FB",
                            fontSize: vsc(16),
                          }}
                        >
                          {item.size}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </>
              ) : null}
            </View>

            {/* end--ListItem */}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: vsc(5),
            marginBottom: vsc(5),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(setSizeModalValues({}, ""));
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: vsc(7),
              paddingHorizontal: vsc(10),
              marginVertical: 0,
              marginHorizontal: vsc(3),
              borderColor: "#db9b7b",
              backgroundColor: "#F6F7FB",
              borderWidth: vsc(1),
              borderRadius: vsc(2),
              marginRight: vsc(5),
              width: "35%",
            }}
          >
            <Text style={{ color: "#db9b7b", fontSize: vsc(14) }}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={setMarkValue}
            style={{
              marginLeft: vsc(5),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#db9b7b",
              paddingVertical: vsc(7),
              paddingHorizontal: vsc(10),
              marginVertical: 0,
              marginHorizontal: vsc(3),
              borderColor: "#F6F7FB",
              borderWidth: vsc(0.25),
              borderRadius: vsc(2),
              width: "35%",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>SET</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SIzeSelectionModal;
