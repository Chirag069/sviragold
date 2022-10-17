import { Dimensions, StyleSheet } from "react-native";
import { Card, Surface, Paragraph } from "react-native-paper";
import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../../theme/colors";

import AppConstants from "../../appConstants/AppConstants";

export const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

export const GradientButtonIconStyle = styled(MaterialCommunityIcons)`
  position: absolute;
  top: ${(props) => (props.Top ? `${props.Top}px` : "0px")};
  left: ${(props) => (props.Left ? `${props.Left}px` : "0px")};
`;

export const RemoveOutSideRippele = styled(Card)`
  overflow: hidden;
  border-radius: 20px;
  margin: 20px 20px 10px 20px;
  elevation: 2;
  shadow-color: #000000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.4;
  shadow-radius: 1px;
`;

export const HomePageContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  flex: 1;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  overflow: hidden;
`;

export const HomePageCard = styled(Surface)`
  background-color: ${(props) => props.bgColor};
  border-radius: 20px;
  height: 100%;
  padding-bottom: 40px;
  overflow: hidden;
`;

export const CartItemTitleContainer = styled.View`
  margin: 10px 0px 20px 0px;
  justify-content: center;
  align-items: center;
`;

export const CartItemTitle = styled.Text`
  color: ${(props) => props.color};
  font-size: 15px;
  font-family: Cairo-Regular;
`;

export const CartTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
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
  width: 45px;
  height: 28px;
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
  font-size: 13px;
  color: ${(props) => props.color};
`;

export const TeamScoreValueInfo = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.colors.text.darkGrey};
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

export const DotContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  width: 5px;
  height: 5px;
  border-radius: 4px;
  margin: 0px 3px -5px 3px;
`;

export const ViewConatiner = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${(props) => (props.TopMargin ? props.TopMargin : 0)}px;
`;

export const ImageButton = styled.Image`
  width: ${Dimensions.get("window").width / 2.3}px;
  height: 55px;
  border-radius: 10px;
  margin: 5px 10px 5px 5px;
`;

export const NewsHeadlineContinaer = styled.View`
  margin: 10px 20px 0px 20px;
`;

export const NewsHeadlineTitle = styled.Text`
  color: ${(props) => props.color};
  font-size: 15px;
  font-weight: bold;
`;

export const ReadMoreContainer = styled.View`
  margin: 10px 20px 0px 20px;
`;

export const ReadMoreTitle = styled.Text`
  color: grey;
  text-align: center;
  font-size: 12px;
  text-decoration-line: underline;
`;

export const NewListItemContainer = styled.View`
  flex-direction: row;
  margin: 10px 20px;
`;

export const ImageNewsContainer = styled.Image`
  width: 100px;
  height: 70px;
  border-radius: 5px;
`;

export const NewsContainer = styled.View`
  margin: 0px 100px 0px 10px;
  text-align: justify;
`;

export const NewsText = styled(Paragraph)`
  color: ${(props) =>
    props.isDarkTheme ? props.colors : props.theme.colors.text.darkGrey};
  font-size: ${AppConstants.isSmallDevice ? "10px" : "15px"};
`;

export const styles = StyleSheet.create({
  swiperPagination: {
    marginBottom: 10,
    position: "absolute",
    top: "100%",
    color: colors.text.primary,
  },
  flatlistLastContextShow: {
    paddingBottom: 100,
  },
  homePageGradientButton: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    height: 55,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    overflow: "hidden",
  },
  homePageLeftGradientButton: {
    flex: 0.5,
    marginHorizontal: 4,
    marginTop: 8,
  },
  homePageRightGradientButton: {
    flex: 1,
    marginLeft: 4,
    marginRight: 20,
  },
  homeGradientButtontextColor: {
    fontSize: AppConstants.isSmallDevice ? 9 : 14,
    textAlign: "center",
    margin: 10,
    color: colors.bg.primary,
    backgroundColor: "transparent",
  },
  gradientButtonListContianer: {
    marginHorizontal: 16,
    marginTop: 10,
  },
});
