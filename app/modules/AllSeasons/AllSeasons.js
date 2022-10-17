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
  TextInput,
} from "react-native";
import { SafeArea } from "./AllSeasons.Style.js";
import { RadioButton } from "react-native-paper";

import AviraHeader from "../../components/aviraHeader.Component.js";

const AllSeasons = ({ navigation }) => {
  const [value, setValue] = React.useState("first");
  const [checked, setChecked] = React.useState("first");
  const [text, setText] = useState("");
  const [text1, onChangeText] = React.useState("");
  const [text12, onChangeText2] = React.useState("");
  const [text13, onChangeText3] = React.useState("");
  const [text14, onChangeText4] = React.useState("");
  const [text15, onChangeText5] = React.useState("");
  const [text16, onChangeText6] = React.useState("");
  const [text17, onChangeText7] = React.useState("");

  const Touchable =
    Platform.OS === "iOS" ? TouchableHighlight : TouchableNativeFeedback;

  return (
    <SafeArea bgColor={"#F6F7FB"}>
      <AviraHeader navigation={navigation} />

      <View
        style={{
          paddingLeft: 15,
          paddingVertical: 10,
          backgroundColor: "#202020",
        }}
      >
        <Text style={{ color: "#db9b7b", fontWeight: "normal", fontSize: 19 }}>
          Checkout
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: 40, paddingBottom: 40 }}
      >
        {/* order sumary */}
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: "#202020",
            marginHorizontal: 20,
            marginTop: 10,
            elevation: 0.5,
          }}
        >
          <View style={{}}>
            <Text style={{ color: "#db9b7b", fontSize: 18 }}>
              Order Summary
            </Text>
          </View>

          <View
            style={{
              paddingVertical: 0.3,
              elevation: 0.4,
              backgroundColor: "#DDDDDD",
              width: "100%",
              marginTop: 5,
            }}
          />

          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: "#000000", fontSize: 15 }}>
                Total Items
              </Text>
            </View>
            <View>
              <Text style={{ color: "#000000", fontSize: 15 }}>2</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: "#000000", fontSize: 15 }}>Discount</Text>
            </View>
            <View>
              <Text style={{ color: "#000000", fontSize: 15 }}>1000.00</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: "#000000", fontSize: 15 }}>
                Amount Payable
              </Text>
            </View>
            <View>
              <Text style={{ color: "#000000", fontSize: 15 }}>28870.00</Text>
            </View>
          </View>
        </View>
        {/* 2 option radio button */}
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <RadioButton
              color="#000000"
              uncheckedColor="#808080"
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
            />
            <View>
              <Text
                style={{
                  color: "#000000",
                  fontSize: Dimensions.get("window").height < 600 ? 13 : 14,
                }}
              >
                Billing address same as shipping address
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: -5,
            }}
          >
            <RadioButton
              color="#000000"
              value="second"
              uncheckedColor="#808080"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked("second")}
            />
            <View>
              <Text
                style={{
                  color: "#000000",
                  fontSize: Dimensions.get("window").height < 600 ? 13 : 14,
                }}
              >
                Add new shipping address
              </Text>
            </View>
          </View>
        </View>
        {/* shipping Adddress form */}
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: "#202020",
            marginHorizontal: 20,
            marginTop: 10,
            elevation: 0.5,
          }}
        >
          <View style={{}}>
            <Text style={{ color: "#db9b7b", fontSize: 18 }}>
              Shipping Address
            </Text>
          </View>

          <View
            style={{
              paddingVertical: 0.3,
              elevation: 0.4,
              backgroundColor: "#DDDDDD",
              width: "100%",
              marginTop: 5,
            }}
          />

          <View style={{}}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Name"
              placeholderTextColor="#000000"
              style={{
                borderBottomWidth: 1,
                borderColor: "#DDDDDD",
                paddingVertical: 1,
                paddingBottom: 5,
                marginTop: 4,
              }}
              onChangeText={onChangeText}
              value={text1}
            />
          </View>
          <View style={{}}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Email ID"
              placeholderTextColor="#000000"
              style={{
                borderBottomWidth: 1,
                borderColor: "#DDDDDD",
                paddingVertical: 1,
                paddingBottom: 5,
                marginTop: 4,
              }}
              onChangeText={onChangeText2}
              value={text12}
            />
          </View>
          <View style={{}}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Contact No."
              placeholderTextColor="#000000"
              style={{
                borderBottomWidth: 1,
                borderColor: "#DDDDDD",
                paddingVertical: 1,
                paddingBottom: 5,
                marginTop: 4,
              }}
              onChangeText={onChangeText3}
              value={text13}
            />
          </View>
          <View style={{}}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Address"
              placeholderTextColor="#000000"
              style={{
                borderBottomWidth: 1,
                borderColor: "#DDDDDD",
                paddingVertical: 1,
                paddingBottom: 5,
                marginTop: 4,
              }}
              onChangeText={onChangeText4}
              value={text14}
            />
          </View>

          <View style={{}}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Pin code"
              keyboardType="numeric"
              placeholderTextColor="#000000"
              style={{
                borderBottomWidth: 1,
                borderColor: "#DDDDDD",
                paddingVertical: 1,
                paddingBottom: 5,
                marginTop: 4,
              }}
              onChangeText={onChangeText5}
              value={text15}
            />
          </View>
          <View style={{}}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="City"
              placeholderTextColor="#000000"
              style={{
                borderBottomWidth: 1,
                borderColor: "#DDDDDD",
                paddingVertical: 1,
                paddingBottom: 5,
                marginTop: 4,
              }}
              onChangeText={onChangeText6}
              value={text16}
            />
          </View>
          <View style={{}}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="State"
              placeholderTextColor="#000000"
              style={{
                borderBottomWidth: 1,
                borderColor: "#DDDDDD",
                paddingVertical: 1,
                paddingBottom: 5,
                marginTop: 4,
              }}
              onChangeText={onChangeText7}
              value={text17}
            />
          </View>
        </View>
        <View
          style={{
            paddingVertical: 0.3,
            elevation: 0.4,
            backgroundColor: "#DDDDDD",
            marginTop: 10,
            marginHorizontal: 20,
          }}
        />
        {/* list of image of maymeny options */}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#DDDDDD",
            }}
          >
            Select Payment Options
          </Text>
        </View>

        {/* 2 button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              overflow: "hidden",
              borderRadius: 50,
              marginLeft: 5,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <Touchable
              background={TouchableNativeFeedback.Ripple("#ECECEC")}
              onPress={() => {
                navigation.navigate("Players");
              }}
            >
              <View
                style={{
                  paddingHorizontal: 30,
                  borderRadius: 50,
                  paddingVertical: 12,
                  backgroundColor: "#db9b7b",
                  fontFamily: "Play-Regular",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#ECECEC",
                    fontSize: 14,
                  }}
                >
                  PROCEED TO PAY
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default AllSeasons;
