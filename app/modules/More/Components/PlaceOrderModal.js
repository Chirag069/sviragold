import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
  ScrollView,
  ToastAndroid,
  AlertIOS,
  SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { RadioButton } from "react-native-paper";

import { sc, vsc, msc } from "../../../appConstants/Utils";

const PlaceOrderModal = ({
  placeOrderModal,
  onChangeStateMethod,
  setPlaceOrderModalAction,
}) => {
  const dispatch = useDispatch();
  const [finish, onChangeFinish] = useState("");
  const [rho, onChangeRho] = useState("");
  const [stamp, setStamp] = useState("750");
  const [screw, setScrew] = useState("north");
  const [path, setPath] = useState("with");

  const setPlaceOrderValues = () => {
    if (finish && rho && stamp && screw && path) {
      onChangeStateMethod(finish, rho, stamp, screw, path);
      onChangeFinish("");
      onChangeRho("");
      Keyboard.dismiss();
    } else {
      if (Platform.OS === "android") {
        ToastAndroid.show("please fill all the fields", ToastAndroid.SHORT);
      } else {
        alert("please fill all the fields");
      }
    }
  };

  return (
    <Modal animationIn="slideInUp" isVisible={placeOrderModal}>
      <ScrollView>
        <SafeAreaView>
          <View
            style={{
              backgroundColor: "#F6F7FB",
              borderRadius: vsc(10),
              marginHorizontal: vsc(0),
              paddingBottom: vsc(20),
              elevation: 2,
              paddingHorizontal: vsc(0),
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: vsc(15),
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: vsc(17),
                  color: "#000000",
                }}
              >
                {" "}
                Place Order Details:
              </Text>
            </View>

            <View
              style={{
                marginHorizontal: vsc(50),
              }}
            >
              <View style={{ marginTop: vsc(15) }}>
                <Text style={{ fontWeight: "bold", fontSize: vsc(14) }}>
                  Finishing :
                </Text>
              </View>
              <View
                style={{
                  marginTop: vsc(5),
                  marginBottom: vsc(0),
                }}
              >
                <TextInput
                  autoFocus={true}
                  underlineColorAndroid="transparent"
                  placeholder="Write about Finishing"
                  placeholderTextColor="#000000"
                  style={{
                    borderWidth: vsc(0),
                    color: "#000000",
                    fontSize: vsc(16),
                  }}
                  onChangeText={onChangeFinish}
                  value={finish}
                />
                <View
                  style={{
                    marginTop: vsc(7),
                    marginBottom: vsc(13),
                    elevation: 4,
                    backgroundColor: "#db9b7b",
                    paddingVertical: vsc(0.5),
                  }}
                />
              </View>

              <View style={{ marginTop: vsc(5) }}>
                <Text style={{ fontWeight: "bold", fontSize: vsc(14) }}>
                  Rhodium :
                </Text>
              </View>
              <View
                style={{
                  marginTop: vsc(5),
                  marginBottom: vsc(0),
                }}
              >
                <TextInput
                  autoFocus={false}
                  underlineColorAndroid="transparent"
                  placeholder="Write about Rhodium"
                  placeholderTextColor="#000000"
                  style={{
                    borderWidth: vsc(0),
                    color: "#000000",
                    fontSize: vsc(16),
                  }}
                  onChangeText={onChangeRho}
                  value={rho}
                />
                <View
                  style={{
                    marginTop: vsc(7),
                    marginBottom: vsc(13),
                    elevation: 4,
                    backgroundColor: "#db9b7b",
                    paddingVertical: vsc(0.5),
                  }}
                />
              </View>

              <View>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: vsc(14) }}>
                    Select Stamp :
                  </Text>
                </View>
                <RadioButton.Group
                  onValueChange={(newValue) => setStamp(newValue)}
                  value={stamp}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginRight: vsc(10),
                      }}
                    >
                      <Text style={{ fontSize: vsc(14), color: "#000000" }}>
                        750
                      </Text>
                      <RadioButton color="#db9b7b" value="750" />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: vsc(14), color: "#000000" }}>
                        916
                      </Text>
                      <RadioButton color="#db9b7b" value="916" />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>

              <View>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: vsc(14),
                      color: "#000",
                    }}
                  >
                    Select Screw :
                  </Text>
                </View>
                <RadioButton.Group
                  onValueChange={(newValue) => setScrew(newValue)}
                  value={screw}
                >
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginRight: vsc(10),
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: vsc(14),
                          color: "#000",
                        }}
                      >
                        North Screw
                      </Text>
                      <RadioButton color="#db9b7b" value="north" />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: vsc(14),
                          color: "#000",
                        }}
                      >
                        South Screw
                      </Text>
                      <RadioButton color="#db9b7b" value="south" />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>

              <View>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: vsc(14),
                      color: "#000",
                    }}
                  >
                    Select Patch Details :
                  </Text>
                </View>
                <RadioButton.Group
                  onValueChange={(newValue) => setPath(newValue)}
                  value={path}
                >
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginRight: vsc(10),
                      }}
                    >
                      <Text style={{ fontSize: vsc(14), color: "#000" }}>
                        With Patch
                      </Text>
                      <RadioButton color="#db9b7b" value="with" />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: vsc(14), color: "#000" }}>
                        With Out Patch
                      </Text>
                      <RadioButton color="#db9b7b" value="without" />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: vsc(20),
                marginBottom: vsc(5),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setPlaceOrderModalAction(false);
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: vsc(7),
                  paddingHorizontal: vsc(10),
                  marginVertical: vsc(0),
                  marginHorizontal: vsc(3),
                  borderColor: "#db9b7b",
                  backgroundColor: "#F6F7FB",
                  borderWidth: vsc(1),
                  borderRadius: vsc(2),
                  marginRight: vsc(5),
                  width: "35%",
                }}
              >
                <Text style={{ color: "#db9b7b", fontSize: vsc(14) }}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPlaceOrderValues();
                }}
                style={{
                  marginLeft: vsc(5),
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#db9b7b",
                  paddingVertical: vsc(7),
                  paddingHorizontal: vsc(10),
                  marginVertical: 0,
                  marginHorizontal: vsc(3),
                  borderColor: "#F6F7FB",
                  borderWidth: vsc(0.25),
                  borderRadius: vsc(2),
                  width: "35%",
                }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: vsc(14) }}>SET</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </Modal>
  );
};

export default PlaceOrderModal;
