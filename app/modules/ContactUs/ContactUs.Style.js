import { SafeAreaView, StyleSheet } from "react-native";
import { List } from "react-native-paper";

import { colors } from "../../theme/colors.js";

import styled from "styled-components/native";

export const styles = StyleSheet.create({
  FlatListStyle: {
    paddingBottom: 40,
    paddingTop: 10,
  },
  sectionItem: {
    overflow: "hidden",
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 1,
    shadowColor: colors.text.disabled,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  DarkSectionItem: {
    overflow: "hidden",
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
});

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

export const PageContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  flex: 1;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  overflow: hidden;
`;

export const ListMainContainer = styled.View`
  margin: 0px 20px 0px 20px;
`;

export const ListSectionTitleContainer = styled.View`
  margin: 15px 0px 2px 10px;
`;

export const ListSectionTitle = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: ${(props) => props.color};
`;

export const ListItemSeasons = styled(List.Item).attrs((props) => ({
  titleStyle: { color: props.textColor, marginLeft: 5, fontSize: 14 },
  descriptionStyle: { color: props.textColor },
}))`
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
  padding: 3px 0px;
`;
