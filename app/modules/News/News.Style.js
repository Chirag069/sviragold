import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

import AppConstants from "../../appConstants/AppConstants";

export const styles = StyleSheet.create({
  FlatlistStyle: {
    marginTop: 10,
    paddingBottom: 20,
  },
});

export const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

export const BackgroundContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  flex: 1;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  padding-bottom: ${AppConstants.isiPhoneX ? "100px" : "80px"};
  overflow: hidden;
`;

export const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 8px 0px;
  position: relative;
`;

export const ImageStyle = styled(FastImage)`
  width: ${Dimensions.get("window").width / 1.1}px;
  height: ${Dimensions.get("window").height / 3.5}px;
  /* resize-mode: stretch; */
  overflow: hidden;
  background-color: transparent;
  shadow-color: #808080;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.4;
  shadow-radius: 2px;
  /* elevation: 3; */
`;

export const ImaageUpperTitleContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  margin: 0px 30px;
  align-self: stretch;
  z-index: 3;
`;

export const ImaageUpperTitle = styled.Text`
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.colors.bg.primary};
  font-size: ${AppConstants.isSmallDevice ? "13px" : "14px"};
  background-color: transparent;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const NewsImageContatiner = styled.View`
  width: ${Dimensions.get("window").width / 1.1}px;
  height: ${Dimensions.get("window").height / 3.5}px;
  border-radius: ${Dimensions.get("screen").height < 650 ? 20 : 15}px;
  overflow: hidden;
`;
