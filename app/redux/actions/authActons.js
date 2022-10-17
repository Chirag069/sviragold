/* eslint-disable radix */
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import {
  GET_HOME_PAGE_DETAILS,
  GET_HOME_PAGE_DETAILS_LOADING,
  GET_HOME_PAGE_DETAILS_ERROR,
  LOGIN_TO_GET_A_TOKEN,
  LOGIN_LOADING,
  LOGIN_ERROR,
  LOG_OUT,
  CHECK_UPDATE,
  ONCHANGE_STONE_VALUE,
  GUEST_USER_MODAL,
} from "./types";

import AppConstants from "../../appConstants/AppConstants.js";

export const LogOutAction = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("@user_token");
    await AsyncStorage.removeItem("@user_obj");

    dispatch({
      type: LOG_OUT,
    });
  } catch (e) {}
};

export const stoneValueChangeAction = (listValue) => (dispatch) => {
  dispatch({
    type: ONCHANGE_STONE_VALUE,
    payload: listValue,
  });
};

export const signInAction =
  (mobileNumber = "", Password = "") =>
  async (dispatch) => {
    dispatch({
      type: LOGIN_LOADING,
    });

    try {
      var loginValus = {
        mobile: mobileNumber,
        password: Password,
      };

      var config = {
        method: "post",
        url: "http://rd.ragingdevelopers.com/svira/svira1api/login",
        headers: {
          "If-Match": "LOGIN",
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://rd.ragingdevelopers.com/svira/svira1api/login",
        loginValus,
        config
      );

      var myHeaders = new Headers();
      myHeaders.append("If-Match", "LOGIN");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ mobile: mobileNumber, password: Password });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "http://rd.ragingdevelopers.com/svira/svira1api/login",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data?.status) {
            if (data && data.data && data.data.token) {
              let localUserObject = JSON.stringify(data.data.user);
              (async () => {
                await AsyncStorage.setItem("@user_token", data.data.token);
                await AsyncStorage.setItem("@user_obj", localUserObject);
              })();
            }
            dispatch({
              type: LOGIN_TO_GET_A_TOKEN,
              payloadUserToken:
                data && data.data && data.data.token ? data.data.token : null,
              payloadPayloadUserName:
                data && data.data && data.data.user.name
                  ? data.data.user.name
                  : null,
              payloadAllowedDays:
                data && data.data && data.data.user.allowed_days
                  ? data.data.user.allowed_days
                  : null,
              payloadUserCity:
                data && data.data && data.data.user.city
                  ? data.data.user.city
                  : null,
              payloadUserType:
                data && data.data && data.data.user.customer_category
                  ? data.data.user.customer_category
                  : null,
              payloadUserEmail:
                data && data.data && data.data.user.email
                  ? data.data.user.email
                  : null,
              payloadUserNumber:
                data && data.data && data.data.user.mobile
                  ? data.data.user.mobile
                  : null,
              payloadUserOpeningBalance:
                data && data.data && data.data.user.opening_balance
                  ? data.data.user.opening_balance
                  : null,
              payloadUserOpeningBalanceType:
                data && data.data && data.data.user.opening_balance_type
                  ? data.data.user.opening_balance_type
                  : null,
              payloadUserOpeningFine:
                data && data.data && data.data.user.opening_fine
                  ? data.data.user.opening_fine
                  : null,
              payloadUserOpeningFindType:
                data && data.data && data.data.user.opening_fine_type
                  ? data.data.user.opening_fine_type
                  : null,
              payloadUserPaid:
                data && data.data && data.data.user.paid
                  ? data.data.user.paid
                  : null,
              payloadUserServiceProvider:
                data && data.data && data.data.user.service_provider
                  ? data.data.user.service_provider
                  : null,
            });
          } else {
            dispatch({
              type: LOGIN_ERROR,
            });

            NetInfo.fetch().then((state) => {
              if (state.isConnected) {
                Toast.show({
                  text1: "Your Username or password is wrong",
                  visibilityTime: 3000,
                  autoHide: true,
                  position: "bottom",
                  type: "error",
                });
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
          }
        })
        .catch((error) => {
          dispatch({
            type: LOGIN_ERROR,
          });
        });
    } catch (err) {
      dispatch({
        type: LOGIN_ERROR,
      });
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          Toast.show({
            text1: "Your Username or password is wrong",
            visibilityTime: 3000,
            autoHide: true,
            position: "bottom",
            type: "error",
          });
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
    }
  };

export const HomePageAction = () => async (dispatch, getState) => {
  try {
    const {
      authState: { userToken },
    } = getState();
    var emptyObj = JSON.stringify({});

    if (userToken) {
      var config = {
        method: "post",
        url: "http://rd.ragingdevelopers.com/svira/svira1api/home",
        headers: {
          "If-Range": userToken,
          "Content-Type": "application/json",
        },
        data: emptyObj,
      };
    } else {
      var config = {
        method: "post",
        url: "https://rd.ragingdevelopers.com/svira/svira2api/home",
        headers: {
          Authorization: "Bearer xA7uZ1cH8oM7xX0qX2xG5aB7cY6xF2yE",
        },
        data: emptyObj,
      };
    }

    axios(config)
      .then(function (response) {
        if (
          response &&
          response.data &&
          response.data.msg &&
          response.data.status === false &&
          response.data.msg.includes("Invalid Token")
        ) {
          dispatch(LogOutAction());
        }

        let homeSliderImage =
          response.data &&
          response.data.data &&
          response.data.data.slider &&
          Array.isArray(response.data.data.slider) &&
          response.data.data.slider.length > 0
            ? response.data.data.slider
            : [];

        let homeCategory =
          response.data &&
          response.data.data &&
          response.data.data.sub_category &&
          Array.isArray(response.data.data.sub_category) &&
          response.data.data.sub_category.length > 0
            ? response.data.data.sub_category
            : [];

        let yearInfo =
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.evolution_of_group) &&
          response.data.data.evolution_of_group.length > 0 &&
          response.data.data.evolution_of_group
            ? response.data.data.evolution_of_group
            : [];

        let appVersionObj = response.data.data.app.find(
          (o) => o.key === "AppVersion"
        );

        if (
          appVersionObj &&
          appVersionObj.value &&
          parseInt(appVersionObj.value.replace(".", "")) >
            parseInt(AppConstants.APP_VERSION.replace(".", ""))
        ) {
          let IsForceUpdateObj = response.data.data.app.find(
            (o) => o.key === "IsForceUpdate"
          );

          dispatch({
            type: CHECK_UPDATE,
            payload: true,
            payload2:
              IsForceUpdateObj && parseInt(IsForceUpdateObj.value) === 1
                ? true
                : false,
          });
        }

        dispatch({
          type: GET_HOME_PAGE_DETAILS,
          payload: homeSliderImage,
          payload2: homeCategory,
          payload3: yearInfo,
        });
      })
      .catch(function (error) {});
  } catch (err) {}
};

export const LaterUpdate = () => (dispatch) => {
  dispatch({
    type: CHECK_UPDATE,
    payload: false,
    payload2: false,
  });
};

export const GuestUserModalShowAction =
  (value = false) =>
  (dispatch) => {
    dispatch({
      type: GUEST_USER_MODAL,
      payload: value,
    });
  };

export const contcatUsAction =
  (Name = "", mobileNumber = "", description = "") =>
  async (dispatch) => {
    var contactValue = {
      name: Name ? Name : "",
      mobile: mobileNumber ? mobileNumber : "",
      description: description ? description : "",
    };

    var config = {
      method: "post",
      url: "http://rd.ragingdevelopers.com/svira/svira1api/ContactInquiry",
      headers: {
        "If-Match": "CONTACT_INQUIRY",
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://rd.ragingdevelopers.com/svira/svira1api/ContactInquiry",
      contactValue,
      config
    );
    if (data.status) {
      Toast.show({
        text1: "Inquiry Submitted Successfully",
        visibilityTime: 3000,
        autoHide: true,
        position: "bottom",
        type: "success",
      });
    }
  };

export const setTokenValueAction =
  (userToken, userObjValues) => async (dispatch) => {
    dispatch({
      type: LOGIN_TO_GET_A_TOKEN,
      payloadUserToken: userToken ? userToken : null,
      payloadPayloadUserName: userObjValues?.name ? userObjValues.name : null,
      payloadAllowedDays: userObjValues?.allowed_days
        ? userObjValues.allowed_days
        : null,
      payloadUserCity: userObjValues?.city ? userObjValues.city : null,
      payloadUserType: userObjValues?.customer_category
        ? userObjValues?.customer_category
        : null,
      payloadUserEmail: userObjValues?.email ? userObjValues.email : null,
      payloadUserNumber: userObjValues?.mobile ? userObjValues.mobile : null,
      payloadUserOpeningBalance: userObjValues?.opening_balance
        ? userObjValues.opening_balance
        : null,
      payloadUserOpeningBalanceType: userObjValues?.opening_balance_type
        ? userObjValues.opening_balance_type
        : null,
      payloadUserOpeningFine: userObjValues?.opening_fine
        ? userObjValues.opening_fine
        : null,
      payloadUserOpeningFindType: userObjValues?.opening_fine_type
        ? userObjValues.opening_fine_type
        : null,
      payloadUserPaid: userObjValues?.paid ? userObjValues.paid : null,
      payloadUserServiceProvider: userObjValues?.service_provider
        ? userObjValues?.service_provider
        : null,
    });
  };
