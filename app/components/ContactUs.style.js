import { Dimensions, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import styled from "styled-components/native";
import { sc, vsc, msc } from "../appConstants/Utils";

export const styles = StyleSheet.create({
  scrollViewStyle: {
    paddingVertical: vsc(25),
  },
  emojiAlertStyle: {
    marginTop: vsc(2),
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  redTextColor: {
    color: "red",
  },
  formTextErrorContainerStyle: {
    marginLeft: sc(5),
    marginTop: vsc(0),
    marginBottom: vsc(-5),
  },
  formTextColorText: {
    fontSize: vsc(13),
  },
  contactusnetworkContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vsc(10),
  },
  contactusEmailContainer: {
    borderRadius: vsc(5),
    overflow: "hidden",
    elevation: 0.6,
  },
  contactusWebContainer: {
    borderRadius: 5,
    overflow: "hidden",
    elevation: 0.6,
    marginTop: vsc(10),
  },
  contactusEmailContainerDark: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: sc(Dimensions.get("window").width - 40),
    borderRadius: 5,
    paddingVertical: vsc(5),
    backgroundColor: "#161616",
  },
  contactusEmailContainerLight: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: sc(Dimensions.get("window").width - 40),
    borderRadius: 5,
    paddingVertical: vsc(5),
    backgroundColor: "#000000",
  },
  marginLeft10: {
    marginLeft: sc(10),
  },
  socialLinkContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: vsc(15),
  },
  faceBookContainer: {
    backgroundColor: "#4267B2",
    borderRadius: sc(30),
    paddingVertical: sc(10),
    paddingHorizontal: sc(15),
    marginHorizontal: sc(3),
  },
  faceBook2Container: {
    backgroundColor: "#EA462F",
    borderRadius: 30,
    paddingVertical: vsc(10),
    paddingHorizontal: sc(12),
    marginHorizontal: sc(3),
  },
});

export const IconsContianer = styled.TouchableHighlight`
  background-color: ${(props) => props.bgColor};
  border-radius: 30px;
  padding: 10px;
  margin: 0px 3px;
`;
