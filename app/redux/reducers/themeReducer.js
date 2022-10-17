import { SET_DARK_MODE, TOGGLE_MODAL, BG_COLOR_CHANGE } from "../actions/types";

import { colors } from "../../theme/colors.js";

const initialState = {
  primaryColor: colors.brand.primary,
  secondaryColor: colors.brand.secondary,
  themeBackgroundColor: colors.bg.primary,
  lightBackgroundColor: colors.brand.muted,
  lightColor: colors.bg.primary,
  darkColor: colors.bg.dark,
  lightGrey: colors.text.primary,
  lightGrey2: colors.text.secondary,
  lightGrey3: colors.text.inverse,
  darkGrey: colors.text.darkGrey,
  darkGrey2: colors.text.darkGrey2,
  textColor: colors.bg.dark,
  isDarkTheme: false,
  modalShow: false,
  bgColorset: "#F6F7FB",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme,
        lightBackgroundColor: state.isDarkTheme
          ? colors.brand.muted
          : colors.brand.secondary,
        textColor: state.isDarkTheme ? colors.bg.dark : colors.bg.primary,
        themeBackgroundColor: state.isDarkTheme
          ? colors.bg.primary
          : colors.brand.darker,
        secondaryColor: state.isDarkTheme
          ? colors.brand.secondary
          : colors.brand.primary,
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modalShow: !state.modalShow,
      };
    case BG_COLOR_CHANGE:
      return {
        ...state,
        bgColorset: action.payload,
      };
    default:
      return state;
  }
};
