import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import { colors } from "../../../theme/colors.js";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import styled from "styled-components/native";

import { stoneValueChangeAction } from "../../../redux/actions/authActons";
import { sc, vsc, msc } from "../../../appConstants/Utils";

const SliderWrapper = styled.View`
  margin: ${vsc(10)}px ${vsc(5)}px 0px ${vsc(5)}px;
  width: ${Dimensions.get("window").width / 2}px;
  height: ${vsc(300)}px;
  justify-content: flex-start;
  align-items: center;
`;

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
`;
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${vsc(20)}px 0;
  width: ${Dimensions.get("window").width / 2}px;
`;

const LabelWrapper2 = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${vsc(10)}px 0px 0px 0px;
  width: ${Dimensions.get("window").width / 2}px;
`;

const LabelText = styled.Text`
  font-size: ${vsc(20)}px;
  text-align: center;
`;

const StoneValue = () => {
  const dispatch = useDispatch();
  const { stoneValue } = useSelector((state) => state.authState);

  const multiSliderValuesChange = (values) => {
    dispatch(stoneValueChangeAction(values));
  };

  return (
    <ViewContainer>
      <SliderWrapper>
        <MultiSlider
          markerStyle={{
            ...Platform.select({
              ios: {
                height: vsc(30),
                width: vsc(30),
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: vsc(3),
                },
                shadowRadius: vsc(1),
                shadowOpacity: 0.1,
              },
              android: {
                height: vsc(30),
                width: vsc(30),
                borderRadius: vsc(50),
                backgroundColor: "#db9b7b",
              },
            }),
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: vsc(30),
                width: vsc(30),
                borderRadius: vsc(20),
                backgroundColor: "#db9b7b",
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: "#db9b7b",
          }}
          trackStyle={{
            backgroundColor: "#CECECE",
          }}
          touchDimensions={{
            height: vsc(40),
            width: vsc(40),
            borderRadius: vsc(20),
            slipDisplacement: vsc(40),
          }}
          values={[stoneValue[0], stoneValue[1]]}
          sliderLength={Dimensions.get("window").width / 2}
          onValuesChange={multiSliderValuesChange}
          min={0}
          max={40}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
        />
        <LabelWrapper2>
          <View style={{}}>
            <LabelText>From </LabelText>
          </View>
          <View style={{}}>
            <LabelText>To</LabelText>
          </View>
        </LabelWrapper2>

        <LabelWrapper>
          <View
            style={{
              padding: vsc(10),
              borderRadius: vsc(5),
              borderColor: "#db9b7b",
              borderWidth: vsc(1),
              alignSelf: "center",
            }}
          >
            <LabelText>{stoneValue[0]} </LabelText>
          </View>
          <View
            style={{
              padding: vsc(10),
              borderRadius: vsc(5),
              borderColor: "#db9b7b",
              borderWidth: vsc(1),
              alignSelf: "center",
            }}
          >
            <LabelText>{stoneValue[1]}</LabelText>
          </View>
        </LabelWrapper>
      </SliderWrapper>
    </ViewContainer>
  );
};

export default StoneValue;
