import React from "react";
import { View, Text, Modal, Image, Dimensions, StyleSheet } from "react-native";
import { sc, vsc, msc } from "../appConstants/Utils";

const NoNetwork = () => {
  return (
    <Modal>
      <View style={noNetworkStyles.noNetWorkContainer}>
        <View style={noNetworkStyles.noNetworkImageContainer}>
          <Image
            style={noNetworkStyles.noNetworkImageStyle}
            source={require("../assets/sad.png")}
          />
        </View>
        <View style={noNetworkStyles.noNetworkTextContianer}>
          <Text style={noNetworkStyles.nonetworkTextStyle}>
            No Internet Connection
          </Text>
        </View>
        <View style={noNetworkStyles.nonetworkInfoContianer}>
          <Text style={noNetworkStyles.nonetworkInfoText}>
            Please check your internet connection and try again
          </Text>
        </View>
        <View style={noNetworkStyles.noNetworkTryAgainContainer}>
          <Text style={noNetworkStyles.tryAgainText}>Try again</Text>
        </View>
      </View>
    </Modal>
  );
};

export default NoNetwork;

const noNetworkStyles = StyleSheet.create({
  headerComponentStyle: {
    marginHorizontal: sc(30),
    justifyContent: "center",
    alignItems: "center",
    marginTop: vsc(Dimensions.get("window").height * 0.027285129604365622),
    marginBottom: vsc(Dimensions.get("window").height * 0.0068212824010914054),
  },
  noNetWorkContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noNetworkImageContainer: {
    backgroundColor: "#fff2f2",
    paddingVertical: vsc(30),
    paddingHorizontal: sc(30),
    borderRadius: sc(30 * 2),
  },
  noNetworkImageStyle: {
    zIndex: 1,
    width: sc(40),
    height: sc(40),
  },
  noNetworkTextContianer: {
    marginTop: vsc(30),
    marginHorizontal: sc(30),
  },
  nonetworkTextStyle: {
    textAlign: "center",
    color: "#000000",
    fontSize: vsc(28),
    fontWeight: "bold",
  },
  nonetworkInfoContianer: {
    marginHorizontal: sc(30),
    marginTop: sc(5),
  },
  nonetworkInfoText: {
    textAlign: "center",
    color: "#000000",
    fontSize: vsc(16),
  },
  noNetworkTryAgainContainer: {
    marginTop: vsc(30),
    backgroundColor: "#000000",
    paddingVertical: vsc(13),
    paddingHorizontal: sc(40),
    borderRadius: sc(4),
  },
  tryAgainText: {
    color: "#FFFFFF",
    fontSize: vsc(18),
  },
});
