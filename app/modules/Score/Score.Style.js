import { SafeAreaView, TextInput, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

export const styles = StyleSheet.create({
  countryTextContainer: {
    marginLeft: 5,
  },
  marginRight: {
    marginRight: 5,
  },
  marginThree: {
    margin: 3,
  },
  overSeeionTextContainer: {
    marginLeft: 20,
  },
  overSessionPointContainer: {
    marginRight: 10,
    marginTop: 10,
  },
  overSessionResultContainer: {
    marginVertical: 10,
  },
  commentContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  scorePageMainCardStyle: {
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 2,
  },
  rightLeftRow: {
    flex: 0.33,
  },
  leftTableContainer: { flex: 0.6, marginLeft: 30 },
  BatsManTableLeftContainer: {
    flex: 0.55,
    marginLeft: 0,
    flexDirection: "row",
  },
  BatsmanTableTitleContainer: {
    width: 20,
    marginLeft: 10,
  },
  BatsmanTableTitleContainerHide: {
    width: 20,
    marginLeft: 10,
    height: 0,
    opacity: 0,
  },
  BatmanTableRightSizeFirstItem: {
    flex: 0.25,
    paddingRight: 15,
  },
  BatmanTableRightSizeItem: {
    flex: 0.25,
  },
  scoreListItemDeviderContainer: {
    marginHorizontal: 4,
  },
  scoreListItemOverDeviderContainer: {
    paddingHorizontal: 5,
  },
});

export const ScoreOverListItemStyle = styled.View`
  padding: 2px 4px;
  border-radius: 6px;
  margin: 0px 4px;
  width: 15px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isDarkTheme ? "#333333" : "#F8F9FC")};
`;

export const ScoreOverListItemTotalStyle = styled.View`
  padding: 2px 4px;
  border-radius: 6px;
  margin: 0px 4px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isDarkTheme ? "#F6F7FB" : "#000000")};
`;

export const CenterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TableRowValueContainer = styled.View`
  flex: 0.4;
  flex-direction: row;
  margin-right: 20px;
`;

export const ScoreTableConatiner = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.bgColor};
  border-top-color: ${(props) => props.borderColor};
  /* border-top-width: 0.2px; */
  padding: 10px 0px;
  shadow-color: #808080;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.4;
  shadow-radius: 1px;
  elevation: 3;
`;

export const TotalPointScoreContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  padding: 5px 10px;
  border-radius: 5px;
`;

export const SpaceAroundContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const OverScoreContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  margin-top: 2px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2px;
`;

export const BackgroundColor = styled.View`
  background-color: ${(props) => props.bgColor};
`;

export const ScoreTextContainer = styled.View`
  margin-left: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.bgColor};
  padding: 5px 10px;
`;

export const SpaceComponenet = styled.View`
  background-color: ${(props) => props.bgColor};
  padding: 3px 0px;
`;

export const BowlingContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  padding: 5px 8px;
  border-radius: 4px;
  margin: 3px;
`;

export const TotalScoreContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  margin-top: 0px;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
`;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

export const CountryTeamCardContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  border-radius: 15px;
  elevation: 0;
  padding: 25px 0px;
`;
// margin: 0px 20px;

export const CountryTeamCardWarrper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0px 10px;
`;

export const TextColor = styled.Text`
  font-size: ${(props) => props.size}px;
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
`;

export const FlageImage = styled.Image`
  width: 35px;
  height: 20px;
`;

export const MiddleSpacerLine = styled.View`
  width: 1px;
  height: 25px;
  background-color: ${(props) => props.bgColor};
  margin: 4px 0px;
`;

export const MiddleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackgroundContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  flex: 1;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  margin-top: 15px;
  overflow: hidden;
`;

export const RoundScoreContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  padding: 0px 0px 10px 0px;
`;

export const CountryScoreContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
`;

export const SingalInputCotainer = styled.View`
  margin-bottom: 5px;
  margin-top: 10px;
`;

export const SingalInputTextCotainer = styled.View`
  margin: 5px 4px 5px 0px;
`;

export const SingalInputText = styled.Text`
  font-size: 15px;
  color: ${(props) => props.color};
`;

export const InputCart = styled(Card)`
  background-color: ${(props) =>
    props.isDarkTheme
      ? props.theme.colors.brand.darker
      : props.theme.colors.bg.primary};
  border-radius: 8px;
`;

export const TextCartInput = styled(TextInput).attrs((props) => ({
  underlineColorAndroid: "transparent",
  placeholderTextColor: "#808080",
}))`
  padding: 0px 5px;
  margin: 15px 0px 0px 10px;
  font-size: 15px;
  border-radius: 12px;
  color: ${(props) => props.color};
  border-bottom-color: transparent;
  height: ${(props) => (props.multiline ? "80px" : "auto")};
  background-color: ${(props) =>
    props.isDarkTheme
      ? props.theme.colors.brand.darker
      : props.theme.colors.bg.primary};
  padding-top: 0px;
  padding-bottom: 0px;
  text-align-vertical: top;
`;
