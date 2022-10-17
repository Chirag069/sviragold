import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

import {
  setRemarkModalValues,
  addCardItemsAction,
} from "../../../redux/actions/productActions";
import { sc, vsc, msc } from "../../../appConstants/Utils";

const RemarkModal = ({}) => {
  const dispatch = useDispatch();
  const { remarkProjectObj, remarKTextState, remarkModeState } = useSelector(
    (state) => state.productState
  );
  const [text, onChangeText] = useState(remarKTextState);
  const inputRef = useRef(null);

  useEffect(() => {
    if (remarkModeState) {
      Platform.OS === "ios"
        ? inputRef.current.focus()
        : setTimeout(() => inputRef.current.focus(), 40);
    }
  }, [remarkModeState]);

  const setMarkValue = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        dispatch(
          addCardItemsAction(
            remarkProjectObj.id,
            "0",
            "*",
            remarkProjectObj.items_group_id,
            remarkProjectObj.size_id,
            text,
            "remark"
          )
        );
        onChangeText("");
        dispatch(setRemarkModalValues({}, ""));
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
    <Modal animationIn="slideInUp" isVisible={remarkModeState}>
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
            Write Remark
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: vsc(50),
          }}
        >
          <View
            style={{
              marginTop: vsc(20),
              marginBottom: vsc(10),
            }}
          >
            <TextInput
              autoFocus={true}
              ref={inputRef}
              underlineColorAndroid="transparent"
              placeholder="Write your Remark"
              placeholderTextColor="#000000"
              style={{
                borderWidth: vsc(0),
                color: "#000000",
                fontSize: vsc(16),
              }}
              onChangeText={onChangeText}
              value={text}
            />
            <View
              style={{
                marginTop: vsc(7),
                marginBottom: vsc(13),
                elevation: 4,
                backgroundColor: "#db9b7b",
                paddingVertical: vsc(0.5),
              }}
            />
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
              dispatch(setRemarkModalValues({}, ""));
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: vsc(7),
              paddingHorizontal: vsc(10),
              marginVertical: vsc(0),
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
              marginVertical: vsc(0),
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

export default RemarkModal;
