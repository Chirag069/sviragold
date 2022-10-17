import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";

import { setTabBarColor } from "../../services/Utils.js";

import AppConstants from "../../appConstants/AppConstants";

export const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

export const styles = StyleSheet.create({
  flatlistLastContextShow: {
    paddingBottom: 30,
    paddingTop: 20,
  },
});

export const TabViewContainer = styled.View`
  background-color: ${(props) =>
    props.isDarkTheme
      ? props.theme.colors.brand.primary
      : props.theme.colors.brand.secondary};
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 3px 0px 10px 0px;
`;

export const TabTextColor = styled.Text`
  margin: 2px 2px 2px 2px;
  color: ${(props) => setTabBarColor(props.SelectTabColor, props.isDarkTheme)};
`;

export const TabInLIne = styled.View`
  background-color: ${(props) =>
    props.isDarkTheme ? props.theme.bg.dark : props.theme.colors.brand.primary};
  padding: 1.1px;
  margin-top: 5px;
`;

export const TabBackgroundContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  flex: 1;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  padding-bottom: ${AppConstants.isiPhoneX ? "100px" : "80px"};
`;

export const TabButtonListContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 15px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
`;

export const FocusTabButtonContainer = styled.View`
  background-color: ${(props) =>
    props.focus ? props.theme.colors.bg.dark : props.bgColor};
  border-radius: 10px;
  padding: 10px;
`;

export const ColorText = styled.Text`
  color: ${(props) => props.color};
  font-size: ${Dimensions.get("window").width > 340 ? "13px" : "10px"};
`;

export const RemoveOutSideRippele = styled.View`
  overflow: hidden;
  border-radius: 10px;
`;

export const GameCartContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin: ${(props) => (props.MT ? props.MT : "0px")} 20px 20px 20px;
  elevation: 8;
`;

export const CartTitleContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
`;

export const CartMiddleTitle = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color};
  font-family: Cairo-Regular;
`;

export const CartItemsContatiner = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const FlageItemCotainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const FlageImageContainer = styled.View`
  margin-left: 20px;
`;

export const FlageImage = styled.Image`
  width: 50px;
  height: 30px;
`;

export const FlatTitleContainer = styled.View`
  margin-left: 10px;
`;

export const FlageTitle = styled.Text`
  font-weight: bold;
  color: ${(props) => props.color};
`;

export const TeamScoreContainer = styled.View`
  justify-content: center;
  align-items: flex-end;
  margin-right: 20px;
`;

export const TeamScoreValue = styled.Text`
  color: ${(props) => props.color};
`;

export const VsContainer = styled.View`
  align-items: center;
`;

export const VsWrapper = styled.View`
  background-color: ${(props) => props.theme.colors.brand.primary};
  padding: 3px;
  border-radius: 5px;
`;

export const VsTitle = styled.Text`
  color: ${(props) => props.theme.colors.bg.primary};
  font-weight: bold;
`;

export const ResultContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.dark};
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 0px;
`;

export const ResultText = styled.Text`
  color: ${(props) => props.color};
  font-size: ${AppConstants.isSmallDevice ? "11px" : "14px"};
`;

export const GameCartContainerUpcoming = styled.View`
  background-color: ${(props) => props.bgColor};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin: ${(props) => (props.MT ? props.MT : "0px")} 20px 20px 20px;
  elevation: 8;
`;

export const AvailableRateTitleContainer = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
`;

export const AvailableRateFlagContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0px 40px;
`;

export const AvailableRateTitle = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

export const ViewStyle = styled.View`
  margin-top: 15px;
`;

export const AvaibleRateCartFlagTitle = styled.Text`
  color: ${(props) => props.color};
  font-weight: bold;
  font-size: 18px;
`;

export const MiddleContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const AvaibleRateTimeContainer = styled.View`
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const MathStartText = styled.Text`
  color: ${(props) => props.theme.colors.text.darkGrey};
  font-size: 12px;
`;

export const MatchTimeLine = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

export const ResultAvailableRateContainer = styled.View`
  background-color: ${(props) =>
    props.isDarkTheme
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.lightGrey2};
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 0px;
`;

export const ResultAvaibleText = styled.Text`
  color: ${(props) => props.color};
  font-size: 11px;
`;
