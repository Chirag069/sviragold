import React from "react";
import {
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { SafeArea } from "./ContactUs.Style.js";
import { Formik } from "formik";
import * as yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import { contcatUsAction } from "../../redux/actions/authActons.js";
import { sc, vsc, msc } from "../../appConstants/Utils";

const contactusSchema = yup.object({
  name: yup.string().required("name is required").min(4),
  email: yup
    .string()
    .required("email is required")
    .email("enter a valid email address"),
  message: yup.string().required("message is required").min(10),
  contactNumber: yup.string().required("contact No is required"),
  address: yup.string().required("address is required"),
  pincode: yup.string().required("pincode is required"),
  city: yup.string().required("city is required"),
  state: yup.string().required("state is required"),
});

const ContactUs = ({ navigation }) => {
  const dispatch = useDispatch();

  const Touchable =
    Platform.OS === "iOS" ? TouchableHighlight : TouchableNativeFeedback;

  return (
    <SafeArea bgColor={"#FFFEFD"}>
      <StatusBar backgroundColor={"#FFFEFD"} barStyle="dark-content" />

      <View
        style={{
          paddingLeft: sc(15),
          paddingVertical: vsc(10),
          backgroundColor: "#FFFEFD",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="caret-back" size={vsc(20)} color={"#db9b7b"} />

          <View>
            <Text
              style={{ color: "#db9b7b", fontWeight: "normal", fontSize: vsc(19) }}
            >
              Contact Us
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
       keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: vsc(40), paddingBottom: vsc(40) }}
      >
        {/* shipping Adddress form */}

        <Formik
          initialValues={{
            name: "",
            email: "",
            message: "",
            contactNumber: "",
            address: "",
            pincode: "",
            city: "",
            state: "",
          }}
          validationSchema={contactusSchema}
          onSubmit={(values, actions) => {
            NetInfo.fetch().then((state) => {
              if (state.isConnected) {
                actions.resetForm();
                dispatch(
                  contcatUsAction(
                    values.name,
                    values.contactNumber,
                    values.message
                  )
                );
              } else {
                Toast.show({
                  text1: "Check your Internet Connection",
                  visibilityTime: 3000,
                  autoHide: true,
                  position: "bottom",
                  type: "error",
                });
              }
            });
          }}
        >
          {(props) => (
            <View>
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
                <View style={{}}>
                  <Text style={{ color: "#db9b7b", fontSize: vsc(18) }}>
                    Submit Your Query
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: vsc(0.3),
                    elevation: 0.4,
                    backgroundColor: "#DDDDDD",
                    width: "100%",
                    marginTop: vsc(5),
                  }}
                />

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Name"
                    placeholderTextColor="#666666"
                    onChangeText={props.handleChange("name")}
                    onBlur={props.handleBlur("name")}
                    value={props.values.name}
                    style={{
                      fontSize: vsc(18),
                      borderBottomWidth: vsc(1),
                      borderColor: "#DDDDDD",
                      paddingVertical: vsc(1),
                      paddingBottom: vsc(5),
                      marginTop: vsc(8),
                      color: "#000000",
                    }}
                  />
                </View>
                <View>
                  <Text style={{ color: "red", fontSize: vsc(14) }}>
                    {props.touched.name && props.errors.name}
                  </Text>
                </View>
                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Email ID"
                    placeholderTextColor="#666666"
                    style={{
                      fontSize: vsc(18),
                      borderBottomWidth: sc(1),
                      borderColor: "#DDDDDD",
                      paddingVertical: vsc(1),
                      paddingBottom: vsc(5),
                      marginTop: vsc(4),
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("email")}
                    onBlur={props.handleBlur("email")}
                    value={props.values.email}
                  />
                </View>
                <View>
                  <Text style={{ color: "red", fontSize: vsc(14) }}>
                    {props.touched.email && props.errors.email}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Contact No."
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                    style={{
                      fontSize: vsc(18),
                      borderBottomWidth: sc(1),
                      borderColor: "#DDDDDD",
                      paddingVertical: vsc(1),
                      paddingBottom: vsc(5),
                      marginTop: vsc(4),
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("contactNumber")}
                    onBlur={props.handleBlur("contactNumber")}
                    value={props.values.contactNumber}
                  />
                </View>
                <View>
                  <Text style={{ color: "red", fontSize: vsc(14) }}>
                    {props.touched.contactNumber && props.errors.contactNumber}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Your Message"
                    placeholderTextColor="#666666"
                    style={{
                      fontSize: vsc(18),
                      borderBottomWidth: sc(1),
                      borderColor: "#DDDDDD",
                      paddingVertical: vsc(1),
                      paddingBottom: vsc(5),
                      marginTop: vsc(4),
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("message")}
                    onBlur={props.handleBlur("message")}
                    value={props.values.message}
                  />
                </View>
                <View>
                  <Text style={{ color: "red", fontSize: vsc(14) }}>
                    {props.touched.message && props.errors.message}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Address"
                    placeholderTextColor="#666666"
                    style={{
                      fontSize: vsc(18),
                      borderBottomWidth: sc(1),
                      borderColor: "#DDDDDD",
                      paddingVertical: vsc(1),
                      paddingBottom: vsc(5),
                      marginTop: vsc(4),
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("address")}
                    onBlur={props.handleBlur("address")}
                    value={props.values.address}
                  />
                </View>
                <View>
                  <Text style={{ color: "red", fontSize: vsc(14) }}>
                    {props.touched.address && props.errors.address}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Pin code"
                    keyboardType="numeric"
                    placeholderTextColor="#666666"
                    style={{
                      fontSize: vsc(18),
                      borderBottomWidth: sc(1),
                      borderColor: "#DDDDDD",
                      paddingVertical: vsc(1),
                      paddingBottom: vsc(5),
                      marginTop: vsc(4),
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("pincode")}
                    onBlur={props.handleBlur("pincode")}
                    value={props.values.pincode}
                  />
                </View>
                <View>
                  <Text style={{ color: "red", fontSize: vsc(14) }}>
                    {props.touched.pincode && props.errors.pincode}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="City"
                    placeholderTextColor="#666666"
                    style={{
                      fontSize: vsc(18),
                      borderBottomWidth: sc(1),
                      borderColor: "#DDDDDD",
                      paddingVertical: vsc(1),
                      paddingBottom: vsc(5),
                      marginTop: vsc(4),
                      color: "#000000",

                    }}
                    onChangeText={props.handleChange("city")}
                    onBlur={props.handleBlur("city")}
                    value={props.values.city}
                  />
                </View>
                <View>
                  <Text style={{ color: "red", fontSize: vsc(14) }}>
                    {props.touched.city && props.errors.city}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="State"
                    placeholderTextColor="#666666"
                    style={{
                      fontSize: vsc(18),
                      borderBottomWidth: sc(1),
                      borderColor: "#DDDDDD",
                      paddingVertical: vsc(1),
                      paddingBottom: vsc(5),
                      marginTop: vsc(4),
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("state")}
                    onBlur={props.handleBlur("state")}
                    value={props.values.state}
                  />
                </View>
                <View>
                  <Text style={{ color: "red", fontSize: vsc(14) }}>
                    {props.touched.state && props.errors.state}
                  </Text>
                </View>
              </View>
              {/* 2 button */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: vsc(20),
                }}
              >
                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: sc(50),
                    // flex: 1,
                    marginLeft: sc(5),
                    marginRight: sc(20),
                    marginBottom: vsc(10),
                  }}
                >
                  <Touchable
                    background={TouchableNativeFeedback.Ripple("#ECECEC")}
                    onPress={() => {
                      props.handleSubmit();
                    }}
                  >
                    <View
                      style={{
                        marginTop: vsc(10),
                        // paddingHorizontal: 100,                         
                         width: Dimensions.get("window").width / 1.5,
                        borderRadius: sc(50),
                        paddingVertical: vsc(15),
                        backgroundColor: "#db9b7b",
                        fontFamily: "Play-Regular",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#ECECEC",
                          fontSize: vsc(14),
                        }}
                      >
                        SUBMIT
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeArea>
  );
};

export default ContactUs;
