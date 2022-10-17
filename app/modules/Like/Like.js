/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FlatList, View, Text, Image, ActivityIndicator } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { useSelector, useDispatch } from "react-redux";
import AviraHeader from "../../components/aviraHeader.Component.js";
import { getLikeCardItemsAction } from "../../redux/actions/productActions.js";
import Spinner from "react-native-loading-spinner-overlay";

import LikeItem from "./Components/LikeItem.Compomnent.js";

import { sc, vsc, msc } from "../../appConstants/Utils";


const Like = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    likeItemServerLoading,
    likeItemsLoading,
    likeItemsError,
    likeItems,
    likeListIds,
  } = useSelector((state) => state.productState);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getLikeCardItemsAction());
    });

    return unsubscribe;
  }, [navigation]);

  const renderCardItem = ({ item }) => {
    return <LikeItem navigation={navigation} item={item} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFEFD" }}>
      <AviraHeader navigation={navigation} />

      <Spinner
        visible={likeItemServerLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#fff", fontSize: vsc(14)}}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <View
        style={{
          paddingLeft: sc(15),
          paddingVertical: vsc(10),
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text style={{ color: "#db9b7b", fontWeight: "normal", fontSize: vsc(19) }}>
          Wish List
        </Text>
      </View>

      {likeItemsLoading ? (
        <View
          style={{
            bottom: vsc(30),
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size={sc(40)} color="#db9b7b" />
          <View style={{ marginTop: vsc(10) }}>
            <Text style={{ color: "#000000", fontSize: vsc(17) }}>Loading</Text>
          </View>
        </View>
      ) : likeItemsError ||
        likeListIds.length === 0 ||
        (Array.isArray(likeItems) && likeItems.length === 0) ? (
        <View
          style={{
            bottom: vsc(30),
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ marginTop: vsc(10) }}>
            {(Array.isArray(likeItems) && likeItems.length === 0) ||
            likeListIds.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome5 color="#000000" name="user-alt" size={sc(55)} />
                  <FontAwesome5
                    color="#000000"
                    name="heart"
                    size={sc(20)}
                    style={{ right: sc(5) }}
                  />
                </View>
                <View>
                  <Text style={{ top: vsc(10), color: "#000000", fontSize: vsc(17) }}>
                    your wish list is empty
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{ color: "#000000", fontSize: vsc(17) }}>
                {likeItemsError ? likeItemsError : "something is wrong"}
              </Text>
            )}
          </View>
        </View>
      ) : (
        <>
          {/* cart-prodcit item */}

          <FlatList
            removeClippedSubviews={true}
            maxToRenderPerBatch={15} // 5
            updateCellsBatchingPeriod={5} // 50
            initialNumToRender={10} // 3
            windowSize={5} // 5
            legacyImplementation={true}
            data={likeItems}
            renderItem={renderCardItem}
            contentContainerStyle={{
              paddingBottom: vsc(100),
              marginBottom: vsc(100),
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

export default Like;
