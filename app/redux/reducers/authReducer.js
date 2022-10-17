import {
  LOGIN_TO_GET_A_TOKEN,
  LOGIN_LOADING,
  LOGIN_ERROR,
  GET_HOME_PAGE_DETAILS,
  GET_HOME_PAGE_DETAILS_LOADING,
  GET_HOME_PAGE_DETAILS_ERROR,
  LOG_OUT,
  CHECK_UPDATE,
  ONCHANGE_STONE_VALUE,
  GUEST_USER_MODAL,
} from "../actions/types";

const initialState = {
  guestUserModal: false,
  yearInfoList: [],
  userToken: null,
  userName: null,
  AllowedDays: null,
  userCity: null,
  userType: null,
  userEmail: null,
  userNumber: null,
  userOpeningBalance: null,
  userOpeningBalanceType: null,
  userOpeningFine: null,
  userOpeningFindType: null,
  userPaid: null,
  userServiceProvider: null,
  LoginInLoading: false,
  LoadingError: null,
  sliderList: [],
  homeItemList: [],
  homePageDetailsLoading: false,
  homePageDetailsError: null,
  updateModal: false,
  forceUpdateModal: false,
  stoneValue: [0, 40],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GUEST_USER_MODAL:
      return {
        ...state,
        guestUserModal: action.payload,
      };
    case ONCHANGE_STONE_VALUE:
      return {
        ...state,
        stoneValue: action.payload,
      };
    case CHECK_UPDATE:
      return {
        ...state,
        updateModal: action.payload,
        forceUpdateModal: action.payload2,
      };
    case LOG_OUT:
      return {
        ...state,
        userToken: null,
        userName: null,
        AllowedDays: null,
        userCity: null,
        userType: null,
        userEmail: null,
        userNumber: null,
        userOpeningBalance: null,
        userOpeningBalanceType: null,
        userOpeningFine: null,
        userOpeningFindType: null,
        userPaid: null,
        userServiceProvider: null,
        LoginInLoading: false,
        LoadingError: null,
        sliderList: [],
        homeItemList: [],
        homePageDetailsLoading: false,
        homePageDetailsError: null,
      };
    case GET_HOME_PAGE_DETAILS:
      return {
        ...state,
        sliderList: action.payload,
        homeItemList: action.payload2,
        yearInfoList: action.payload3,
        homePageDetailsLoading: false,
        homePageDetailsError: null,
      };
    case GET_HOME_PAGE_DETAILS_LOADING:
      return {
        ...state,
        sliderList: [],
        homeItemList: [],
        homePageDetailsLoading: true,
        homePageDetailsError: null,
      };
    case GET_HOME_PAGE_DETAILS_ERROR:
      return {
        ...state,
        sliderList: [],
        homeItemList: [],
        homePageDetailsError: action.payload,
      };
    case LOGIN_TO_GET_A_TOKEN:
      return {
        ...state,
        userToken: action.payloadUserToken,
        userName: action.payloadPayloadUserName,
        AllowedDays: action.payloadAllowedDays,
        userCity: action.payloadUserCity,
        userType: action.payloadUserType,
        userEmail: action.payloadUserEmail,
        userNumber: action.payloadUserNumber,
        userOpeningBalance: action.payloadUserOpeningBalance,
        userOpeningBalanceType: action.payloadUserOpeningBalanceType,
        userOpeningFine: action.payloadUserOpeningFine,
        userOpeningFindType: action.payloadUserOpeningFindType,
        userPaid: action.payloadUserPaid,
        userServiceProvider: action.payloadUserServiceProvider,
        LoginInLoading: false,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        LoginInLoading: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        LoginInLoading: false,
      };
    default:
      return state;
  }
};
