/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeArea } from "./Players.Style.js";
import { useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import { addCardItemsAction } from "../../redux/actions/productActions.js";

import AviraHeader from "../../components/aviraHeader.Component.js";
import Ionicons from "react-native-vector-icons/Ionicons";

import { sc, vsc, msc } from "../../appConstants/Utils";

const CardSetting = ({ navigation }) => {
  const dispatch = useDispatch();
  const { sizeListItems, groupListItems, cardItems } = useSelector(
    (state) => state.productState
  );
  const [selectionItemId, setSelectionItemID] = useState(null);
  const [selectionGroupId, setSelectionGroupId] = useState(null);

  const [text, onChangeText] = useState("");

  const applySetting = () => {
    cardItems.forEach(function (item, i) {
      dispatch(
        addCardItemsAction(
          item.id,
          "0",
          "*",
          selectionGroupId ? selectionGroupId : null,
          selectionItemId ? selectionItemId : null,
          text ? text : "",
          ""
        )
      );
    });
  };

  return (
    <SafeArea bgColor={"#F6F7FB"}>
      <AviraHeader navigation={navigation} />
      <Spinner
        visible={false}
        textContent={"Loading..."}
        textStyle={{ color: "#fff", fontSize: vsc(14)}}
        overlayColor="rgba(0,0,0, 0.5)"
      />
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
              style={{ color: "#db9b7b", fontWeight: "normal", fontSize: vsc(19) }}
            >
              Settings Card Items
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* list item */}
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
            flexDirection: "row",
            justifyContent: "flex-start",
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

        {/* list item */}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: vsc(15),
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: vsc(17), color: "#000000" }}>
            {" "}
            Select Group Size
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: vsc(10),
            flexWrap: "wrap",
          }}
        >
          {groupListItems &&
          Array.isArray(groupListItems) &&
          groupListItems.length > 0 ? (
            <>
              {groupListItems.map((item, index) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setSelectionGroupId(item.id);
                  }}
                >
                  <View
                    style={{
                      borderColor: "#db9b7b",
                      backgroundColor:
                        selectionGroupId == item.id ? "#db9b7b" : "#F6F7FB",
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
                        color: !(selectionGroupId == item.id)
                          ? "#db9b7b"
                          : "#F6F7FB",
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

        {/* end--ListItem */}

        {/* product items */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: vsc(15),
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: vsc(17), color: "#000000" }}>
            {" "}
            Write Your Remark:
          </Text>
        </View>
        <View style={{ flex: 0.7, marginTop: vsc(10), paddingHorizontal: vsc(30) }}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="write your remark"
            placeholderTextColor="#DDDDDD"
            multiline
            numberOfLines={4}
            style={{
              backgroundColor: "#FFFFFF",
              borderWidth: vsc(1),
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
        <View style={{ paddingBottom: vsc(50) }} />
      </ScrollView>

      <View
        style={{
          backgroundColor: "#FFFFFF",
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: vsc(10),
        }}
      >
        <TouchableOpacity
          onPress={applySetting}
          style={{
            backgroundColor: "#db9b7b",
            paddingVertical: vsc(13),
            paddingHorizontal: vsc(14),
            borderRadius: vsc(6),
            flex: 0.7,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};

export default CardSetting;
