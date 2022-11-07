import React, { useState } from "react";
import {
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeArea } from "./Score.Style.js";
import AviraHeader from "../../components/aviraHeader.Component.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import { sc, vsc, msc } from "../../appConstants/Utils";
import SeachModal from "../../components/SeachModal.Component.js";
import GuestUserModal from "../../components/GuestUserModal.js";

const Score = ({ navigation }) => {
  const {
    userNumber,
    userName,
    AllowedDays,
    userCity,
    userToken,
    userType,
    userEmail,
  } = useSelector((state) => state.authState);

  const Touchable =
    Platform.OS === "iOS" ? TouchableHighlight : TouchableNativeFeedback;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "https://www.sviragold.com/",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeArea bgColor={"#FFFEFD"}>
      <AviraHeader navigation={navigation} />
      <SeachModal navigation={navigation} />
      <GuestUserModal navigation={navigation} />

      <View
        style={{
          paddingLeft: sc(15),
          paddingVertical: vsc(10),
          backgroundColor: "#FFFFFF",
          borderBottomColor: "#db9b7b",
          borderBottomWidth: sc(0.2),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="caret-back" size={sc(20)} color={"#db9b7b"} />

          <View>
            <Text
              style={{ color: "#db9b7b", fontWeight: "normal", fontSize: vsc(19) }}
            >
              {userToken ? (userName ? userName : "User") : "Guest User"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: vsc(100) }}
      >
        {/*  user iamge avarat */}

        <View
          style={{
            paddingHorizontal: sc(15),
            paddingVertical: vsc(10),
            backgroundColor: "#FFFFFF",
            marginHorizontal: sc(20),
            marginTop: vsc(10),
            elevation: 0.5,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: vsc(5),
            }}
          >
            <Image
              style={{
                resizeMode: "cover",
                width: vsc(100),
                height: vsc(100),
                borderRadius: vsc(100 / 2),
                overflow: "hidden",
              }}
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
              }}
            />
          </View>

          <View
            style={{
              paddingVertical: vsc(0.3),
              elevation: 0.4,
              backgroundColor: "#808080",
              width: "100%",
              marginTop: vsc(5),
            }}
          />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: vsc(5),
            }}
          >
            <Text
              style={{
                fontSize: vsc(17),
                color: "#db9b7b",
                textTransform: "capitalize",
              }}
            >
              {userToken ? userName : "GUEST USER"}
            </Text>
          </View>
        </View>

        {/* end------- user iamge avarat */}

        <View
          style={{
            paddingHorizontal: sc(15),
            paddingVertical: vsc(10),
            backgroundColor: "#FFFFFF",
            marginHorizontal: vsc(20),
            marginTop: vsc(10),
            elevation: 0.5,
          }}
        >
          <View style={{}}>
            <Text style={{ color: "#db9b7b", fontSize: vsc(18) }}>User Details</Text>
          </View>

          <View
            style={{
              paddingVertical: vsc(0.3),
              elevation: 0.4,
              backgroundColor: "#808080",
              width: "100%",
              marginTop: vsc(5),
              // marginHorizontal: 10
            }}
          />

          <View
            style={{
              marginTop: vsc(5),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  color: "#9C9C9C",
                  fontSize: Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                }}
              >
                Name
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#000000",
                  fontSize: Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                }}
              >
                {userToken ? userName : "Guest user"}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingVertical: vsc(0.2),
              elevation: 0.1,
              backgroundColor: "#808080",
              width: "100%",
              marginTop: vsc(5),
            }}
          />

          <View
            style={{
              marginTop: vsc(5),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.1}
                style={{
                  color: "#9C9C9C",
                  fontSize: Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                }}
              >
                Email ID
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#000000",
                  fontSize: Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                }}
              >
                {userEmail ? userEmail : "-"}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingVertical: vsc(0.2),
              elevation: 0.1,
              backgroundColor: "#808080",
              width: "100%",
              marginTop: vsc(5),
            }}
          />

          <View
            style={{
              marginTop: vsc(5),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.1}
                style={{
                  color: "#9C9C9C",
                  fontSize: Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                }}
              >
                Contact No.
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#000000",
                  fontSize: Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                }}
              >
                {userNumber ? userNumber : "-"}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingVertical: vsc(0.2),
              elevation: 0.1,
              backgroundColor: "#808080",
              width: "100%",
              marginTop: vsc(5),
            }}
          />

          <View
            style={{
              marginTop: vsc(5),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  color: "#9C9C9C",
                  fontSize: Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                }}
              >
                City
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#000000",
                  fontSize: Dimensions.get("window").height < 600 ? vsc(13) : vsc(15),
                }}
              >
                {userCity ? userCity.toLowerCase() : "-"}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingVertical: vsc(0.2),
              elevation: 0.1,
              backgroundColor: "#808080",
              width: "100%",
              marginTop: vsc(5),
            }}
          />
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default Score;
