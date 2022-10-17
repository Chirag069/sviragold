import { SafeAreaView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";

import { colors } from "../../theme/colors.js";

export const styles = StyleSheet.create({
  flatlistLastContextShow: {
    paddingVertical: 25,
  },
});

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

export const PollPageContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  flex: 1;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  overflow: hidden;
  /* padding-top: 20px; */
`;

export const PollpageTitleContainer = styled.View`
  justify-content: center;
  align-items: center;
  /* margin-top: 5px; */
  margin-bottom: 15px;
`;

export const PollTitle = styled.Text`
  color: ${(props) => props.color};
  font-size: 25px;
`;

export const PollItemsContainer = styled.View`
  margin: 15px 20px 0px 20px;
`;

export const PollItemWrapper = styled.View`
  background-color: ${(props) => props.bgColor};
  margin: 5px 0px;
  justify-content: center;
  padding: 12px 0px 12px 15px;
  elevation: 0.7;
  border-radius: 5px;
`;

export const TeamName = styled.Text`
  font-size: 17px;
  color: ${(props) => props.color};
`;

export const PollVoteButton = styled(Button).attrs((props) => ({
  mode: "contained",
  labelStyle: {
    paddingVertical: 5,
    color: props.isDarkTheme ? colors.bg.dark : colors.bg.primary,
  },
}))`
  margin: 10px 0px;
  background-color: ${(props) => props.textColor};
`;

export const PollVoteItemContainer = styled.View`
  margin: 0% 5%;
  border-radius: 5px;
  margin-top: 5px;
  elevation: 0.5;
  margin-bottom: 7px;
  shadow-color: ${(props) => (props.isDarkTheme ? "#000000" : "#000000")};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.4;
  shadow-radius: 2px;
  elevation: 4;
`;

export const PollVoteItemFullSize = styled.View`
  width: 100%;
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  position: relative;
`;

export const PollVoteItemValueSize = styled.View`
  width: ${(props) => `${props.width}%`};
  background-color: ${(props) => props.VoteColor};
  border-top-left-radius: 3px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 0px;
`;

export const PollTextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 5px;
`;

export const PollTextItemValueContainer = styled.View`
  position: absolute;
  top: ${(props) => (props.Top ? `${props.Top}%` : "0%")};
  right: ${(props) => (props.Right ? `${props.Right}%` : "0%")};
`;

export const PollTextItemTitleContainer = styled.View`
  position: absolute;
  left: ${(props) => (props.Left ? `${props.Left}%` : "0%")};
  top: ${(props) => (props.Top ? `${props.Top}%` : "0%")};
`;

export const PollTextValue = styled.Text`
  font-size: 15px;
  font-family: Cairo-Regular;
  color: ${(props) => props.color};
`;
