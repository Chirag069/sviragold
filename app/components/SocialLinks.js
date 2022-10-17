import React from "react";
import { View, TouchableHighlight, Linking, Text } from "react-native";
import { styles, IconsContianer } from "./ContactUs.style.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

import { sc, vsc, msc } from "../appConstants/Utils";

const SocialLinks = ({
  socialLinksFaceBook = "https://www.facebook.com/Sviraornaments",
  socialLinksTwitter = "https://www.google.com",
  socialLinksInstagram = "https://instagram.com/s_vira_ornaments?igshid=YmMyMTA2M2Y=",
  socialLinksYoutubeUrl = "https://www.google.com",
}) => {
  return (
    <>
      <View style={styles.socialLinkContainer}>
        <TouchableHighlight
          style={styles.faceBookContainer}
          onPress={() => Linking.openURL(socialLinksFaceBook)}
        >
          <View>
            <FontAwesome name="facebook" size={sc(24)} color={"#FFFFFF"} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            backgroundColor: "#D22C71",
            borderRadius: sc(30),
            padding: sc(10),
            marginHorizontal: sc(3), 
          
          }}
          bgColor={"#D22C71"}
          onPress={() => Linking.openURL(socialLinksInstagram)}
        >
          <AntDesign name="instagram" size={sc(25)} color={"#FFFFFF"} />
        </TouchableHighlight>
      </View>
    </>
  );
};

export default SocialLinks;
