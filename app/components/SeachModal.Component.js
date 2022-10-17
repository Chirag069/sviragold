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

import {
  toggleSearchModelAction,
  setSearchModelAction,
  getProductsAction,
  clearAllFilter,
  applyFilterAction,
} from "../redux/actions/productActions.js";
import { sc, vsc, msc } from "../appConstants/Utils";

const SeachModal = ({ navigation }) => {
  const dispatch = useDispatch();
  const { searchModalShow, searchTextState } = useSelector(
    (state) => state.productState
  );
  const [text, onChangeText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchModalShow) {
      Platform.OS === "ios"
        ? inputRef.current.focus()
        : setTimeout(() => inputRef.current.focus(), 40);
    }
  }, [searchModalShow]);

  const SeachModelProductPress = () => {
    dispatch(setSearchModelAction(text));
    dispatch(applyFilterAction());
    dispatch(toggleSearchModelAction());
    dispatch(getProductsAction());
    navigation.navigate("Matches");
  };

  const clearSeachInputStatePress = () => {
    onChangeText("");
    dispatch(setSearchModelAction(""));
    dispatch(applyFilterAction());
    dispatch(toggleSearchModelAction());
    dispatch(getProductsAction());
    navigation.navigate("Matches");
  };

  return (
    <Modal animationIn="slideInUp" isVisible={searchModalShow}>
      <View
        style={{
          backgroundColor: "#F6F7FB",
          borderRadius: sc(10),
          marginHorizontal: sc(10),
          paddingBottom: sc(20),
          elevation: 2,
        }}
      >
        {searchTextState ? (
          <TouchableOpacity
            onPress={clearSeachInputStatePress}
            style={{
              marginTop: vsc(5),
              alignItems: "flex-end",
              marginHorizontal: sc(15),
            }}
          >
            <Text
              style={{
                fontSize: vsc(14),
                color: "#000000",
                textDecorationLine: "underline",
              }}
            >
              clear search
            </Text>
          </TouchableOpacity>
        ) : null}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: vsc(15),
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: vsc(17), color: "#000000" }}>
            {" "}
            Search Any Product
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
            <TextInput
              autoFocus={true}
              ref={inputRef}
              underlineColorAndroid="transparent"
              placeholder="Search Product"
              placeholderTextColor="#000000"
              style={{
                borderWidth: sc(0),
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
                elevation: (4),
                backgroundColor: "#db9b7b",
                paddingVertical: 0.5,
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
              dispatch(toggleSearchModelAction());
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: vsc(7),
              paddingHorizontal: sc(10),
              marginVertical: vsc(0),
              marginHorizontal: sc(3),
              borderColor: "#db9b7b",
              backgroundColor: "#F6F7FB",
              borderWidth: sc(1),
              borderRadius: sc(2),
              marginRight: sc(5),
              width: "35%",
            }}
          >
            <Text style={{ color: "#db9b7b", fontSize: vsc(14) }}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={SeachModelProductPress}
            style={{
              marginLeft: sc(5),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#db9b7b",
              paddingVertical: sc(7),
              paddingHorizontal: sc(10),
              marginVertical: sc(0),
              marginHorizontal: sc(3),
              borderColor: "#F6F7FB",
              borderWidth: sc(0.25),
              borderRadius: sc(2),
              width: "35%",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>SEARCH</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SeachModal;
