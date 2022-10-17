import { SafeAreaView, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import styled from "styled-components/native";

export const styles = StyleSheet.create({
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  flatlistLastContextShow: {
    paddingVertical: 30,
  },
});

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

export const PlayersPageContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  flex: 1;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  /* padding-top: 30px; */
  overflow: hidden;
`;

export const ListItemContainer = styled.View`
  margin: 0px 20px 0px 20px;
`;

export const PlayerListItem = styled(List.Item).attrs((props) => ({
  titleStyle: { color: props.textColor },
  descriptionStyle: { color: "#808080", fontSize: 11 },
}))`
  margin: 5px 0px;
  background-color: ${(props) => props.bgColor};
  shadow-color: ${(props) => (props.isDarkTheme ? "#000000" : "#DDDDDD")};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.4;
  shadow-radius: 2px;
  elevation: 4;
`;

export const ViewConatiner = styled.View`
  justify-content: center;
  align-items: center;
`;
