import React from "react";
import { View, TextInput } from "react-native";
import { useSelector } from "react-redux";

import AviraInfoItem from "./AviraInfoItem.component";
import { sc, vsc, msc } from "../../../appConstants/Utils";

const AviraInfo = () => {
  const { yearInfoList } = useSelector((state) => state.authState);

  return (
    <>
      {yearInfoList &&
      Array.isArray(yearInfoList) &&
      yearInfoList.length > 0 ? (
        <>
          <View
            style={{
              alignItems: "flex-start",
              marginHorizontal: sc(10),
              marginTop: vsc(20),
              top: vsc(1),
              zIndex: 6,
            }}
          >
            <TextInput
              underlineColorAndroid="transparent"
              textAlign={"center"}
              keyboardType="numeric"
              editable={false}
              style={{
                borderBottomWidth: vsc(2),
                paddingBottom: vsc(5),
                borderColor: "#db9b7b",
                color: "#db9b7b",
              }}
              value={"EVOLUTION OF GROUP"}
            />
          </View>
          <View
            style={{
              paddingVertical: vsc(0.4),
              backgroundColor: "#000000",
            }}
          />

          {yearInfoList.map((item, index) => (
            <>
              <AviraInfoItem key={index} item={item} />
            </>
          ))}
        </>
      ) : null}
    </>
  );
};

export default AviraInfo;
