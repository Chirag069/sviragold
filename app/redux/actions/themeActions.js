import AsyncStorage from "@react-native-async-storage/async-storage";

import { SET_DARK_MODE, TOGGLE_MODAL, BG_COLOR_CHANGE } from "./types";

export const setDefaultTheme = () => async (dispatch) => {
  (async () => {
    const value = await AsyncStorage.getItem("@local_Theme");
    if (
      (value !== null && value === "dark") ||
      (value == null && new Date().getHours() > 90)
    ) {
      dispatch({
        type: SET_DARK_MODE,
      });
      return true;
    }
  })();
};

export const setBgColor = (bgColor) => async (dispatch) => {
  dispatch({
    type: BG_COLOR_CHANGE,
    payload: bgColor,
  });
};

export const setDarkMode = (themeState) => async (dispatch) => {
  if (themeState) {
    (async () => {
      await AsyncStorage.setItem("@local_Theme", "light");
    })();
  } else {
    (async () => {
      await AsyncStorage.setItem("@local_Theme", "dark");
    })();
  }

  dispatch({
    type: SET_DARK_MODE,
  });
};

export const toggleModal = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
  });
};
