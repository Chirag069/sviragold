import styled from "styled-components/native";
import AppConstants from "../../appConstants/AppConstants";
import { List } from "react-native-paper";
import { StyleSheet } from "react-native";

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

export const MorePageListItemContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  height: 0.4px;
  margin: 0px 20px;
`;

export const MorePageItemSeprator = styled.View`
  background-color: ${(props) => props.bgColor};
  margin: 20px 20px 0px 20px;
`;

export const ListItemLeftIconContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

export const SectionTitle = styled.Text`
  font-weight: bold;
  color: ${(props) => props.color};
`;

export const MoreTabListStyle = styled(List.Item).attrs((props) => ({
  titleStyle: { color: props.TitleColor, fontSize: 13.5 },
}))`
  background-color: ${(props) => props.bgColor};
  margin: 0px 20px 0px 20px;
  border-top-left-radius: ${(props) =>
    props.shadowRadius === "top" ? "5px" : "0px"};
  border-top-right-radius: ${(props) =>
    props.shadowRadius === "top" ? "5px" : "0px"};
  border-bottom-left-radius: ${(props) =>
    props.shadowRadius === "bottom" ? "5px" : "0px"};
  border-bottom-right-radius: ${(props) =>
    props.shadowRadius === "bottom" ? "5px" : "0px"};
  shadow-color: ${(props) => props.bgColor};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.4;
  shadow-radius: 2px;
  elevation: 4;
  padding: 6px 0px;
`;

export const styles = StyleSheet.create({
  FlatListStyle: {
    marginTop: -5,
    paddingBottom: 40,
  },
  SectionTitleContainer: {
    marginHorizontal: 25,
    marginVertical: 10,
  },
});
