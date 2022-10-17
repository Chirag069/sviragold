/* eslint-disable radix */
import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_ERROR,
  GET_FILTER_VALUE,
  GET_FILTER_VALUE_LOADING,
  GET_FILTER_VALUE_ERROR,
  SET_GENDER_CHECK_VALUE,
  SET_SUB_CATEGORY_VALUE,
  SET_CATEGORY_VALUE,
  SET_ITEM_GROUP_VALUE,
  CLEAR_FILTERS,
  SET_FILTER,
  SET_LOADING_PAGINATION,
  SET_PAGINATION_OFFSET,
  SET_PAGINATION_LIST_END,
  GET_CARD_ITEMS,
  GET_CARD_ITEMS_LOADING,
  GET_CARD_ITEMS_ERROR,
  CARD_ITEM_INCREMENT,
  CARD_ITEM_DECREMENT,
  CARD_ITEM_VALUE_REMOVE,
  CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_LOADING,
  CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_ERROR_OR_DONE,
  CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_LOADING,
  CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_ERROR_OR_DONE,
  GET_LIKE_ITEMS,
  GET_LIKE_ITEMS_LOADING,
  GET_LIKE_ITEMS_ERROR,
  LIKE_UNLIKE_SERVER_SIDE_LOADING,
  LIKE_UNLIKE_SERVER_SIDE_ERROR_DONE,
  LIKE_ITEM_VALUE_ADD,
  UNLIKE_ITEM_VALUE_REMOVE,
  LIST_ORDER_ITEM_LOADING,
  LIST_ORDER_ITEM,
  LIST_ORDER_ITEM_ERROR,
  PLACE_ORDER_ITEMS_LOADING,
  PLACE_ORDER_ITEMS,
  PLACE_ORDER_ITEMS_ERROR,
  EDIT_ORDER_ITEM_LOADING,
  EDIT_ORDER_ITEM_BY_ID,
  EDIT_ORDER_ITEM_ERROR,
  TOGGLE_SEARCH_MODEL,
  SET_SEARCH,
  GET_GROUP_SIZE_LIST,
  GET_GROUP_SIZE_LOADING,
  GET_GROUP_SIZE_LIST_ERROR,
  SET_REMARK_MODEL,
  REMARK_ITEM_STATE_CHANGE,
  SET_GROUP_MODEL,
  SET_SIZE_MODEL,
  SET_GROUP_ID_STATE_CHANGE,
  SET_SIZE_ID_STATE_CHANGE,
  ORDER_PDF_PAGE_HTML,
  ORDER_PED_PAGE_HTML_LOADING,
  ORDER_PDF_PAGE_HTML_ERROR,
  SET_CARD_QTY_AND_TOTAL,
  ITEM_SUBCATEGORY,
} from "../actions/types";

const initialState = {
  totalGrValue: 0,
  cardTotalQty: 0,
  isProductDetailsState: false,
  cardItems: [],
  cardItemsError: null,
  cardItemsLoading: false,
  likeItems: [],
  likeItemsError: null,
  likeItemsLoading: false,
  listOfProduct: [],
  listOfProductError: null,
  listOfProductLoading: false,
  filterGenderList: [],
  filterSubCategory: [],
  filterCategory: [],
  filterItemGroup: [],
  filterLoading: false,
  filterError: null,
  offsetProduct: 0,
  isListEndProduct: false,
  paginationLoading: false,
  filterValue: {
    subCategory: "",
    gender: "",
    itemGroup: "",
    category: "",
  },
  searchTextState: "",
  searchModalShow: false,
  incAndDecCardServerLoading: false,
  removeCardServerLoading: false,
  likeItemServerLoading: false,
  likeListIds: [],
  listOrderLoading: false,
  listOrderItems: [],
  listOrderError: null,
  serverPlaceServerLoadingError: false,
  serverEditOrderServerLoadingError: false,
  sizeListItems: [],
  groupListItems: [],
  groupSizeItemsLoading: false,
  groupSizeItemsError: null,
  remarKTextState: "",
  remarkModeState: false,
  remarkProjectObj: null,
  sizeSetId: null,
  sizeModelState: false,
  sizeProductObj: null,
  groupSetId: null,
  groupModelState: false,
  groupProjectObj: null,
  webviewOrder: "",
  webviewOrderLoading: false,
  webviewOrderError: null,
  itemsubcategory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_PDF_PAGE_HTML:
      return {
        ...state,
        webviewOrder: action.payload,
        webviewOrderLoading: false,
        webviewOrderError: null,
      };
    case ORDER_PED_PAGE_HTML_LOADING:
      return {
        ...state,
        webviewOrder: null,
        webviewOrderLoading: true,
        webviewOrderError: null,
      };
    case ORDER_PDF_PAGE_HTML_ERROR:
      return {
        ...state,
        webviewOrder: null,
        webviewOrderLoading: false,
        webviewOrderError: action.payload
          ? action.payload
          : "server response failed",
      };
    case SET_GROUP_MODEL:
      return {
        ...state,
        groupSetId: action.payloadGroupId,
        groupProjectObj: action.payloadProductObj,
        groupModelState: !state.groupModelState,
        isProductDetailsState: action.payloadProductDetails,
      };
    case SET_REMARK_MODEL:
      return {
        ...state,
        remarkProjectObj: action.payloadProductObj,
        remarKTextState: action.payloadRemark,
        remarkModeState: !state.remarkModeState,
      };
    case SET_SIZE_MODEL: {
      return {
        ...state,
        sizeSetId: action.payloadSizeId,
        sizeProductObj: action.payloadProductObj,
        sizeModelState: !state.sizeModelState,
        isProductDetailsState: action.payloadProductDetails,
      };
    }
    case GET_GROUP_SIZE_LOADING:
      return {
        ...state,
        sizeListItems: [],
        groupListItems: [],
        groupSizeItemsLoading: true,
        groupSizeItemsError: null,
      };
    case GET_GROUP_SIZE_LIST:
      return {
        ...state,
        sizeListItems: action.sizeList,
        groupListItems: action.groupListItems,
        groupSizeItemsLoading: false,
        groupSizeItemsError: null,
      };
    case GET_GROUP_SIZE_LIST_ERROR:
      return {
        ...state,
        sizeListItems: [],
        groupListItems: [],
        groupSizeItemsLoading: false,
        groupSizeItemsError: "Server response failed",
      };
    case SET_SEARCH:
      return {
        ...state,
        searchTextState: action.payload,
        // listOfProduct: [],
        // listOfProductLoading: false,
        // listOfProductError: null,
        // paginationLoading: false,
        // offsetProduct: 0,
      };
    case TOGGLE_SEARCH_MODEL:
      return {
        ...state,
        searchModalShow: !state.searchModalShow,
      };
    case EDIT_ORDER_ITEM_LOADING:
      return {
        ...state,
        serverEditOrderServerLoadingError: true,
      };
    case EDIT_ORDER_ITEM_BY_ID:
      return {
        ...state,
        serverEditOrderServerLoadingError: false,
      };
    case EDIT_ORDER_ITEM_ERROR:
      return {
        ...state,
        serverEditOrderServerLoadingError: false,
      };
    case PLACE_ORDER_ITEMS_LOADING:
      return {
        ...state,
        serverPlaceServerLoadingError: true,
      };
    case PLACE_ORDER_ITEMS:
      return {
        ...state,
        serverPlaceServerLoadingError: false,
      };
    case PLACE_ORDER_ITEMS_ERROR:
      return {
        ...state,
        serverPlaceServerLoadingError: false,
      };

    case LIST_ORDER_ITEM_LOADING:
      return {
        ...state,
        listOrderLoading: true,
        listOrderItems: [],
        listOrderError: null,
      };
    case LIST_ORDER_ITEM:
      return {
        ...state,
        listOrderLoading: false,
        listOrderItems: action.payloadOrderList,
        listOrderError: null,
      };
    case LIST_ORDER_ITEM_ERROR:
      return {
        ...state,
        listOrderLoading: false,
        listOrderItems: [],
        listOrderError: action.payloadOrderListError
          ? action.payloadOrderListError
          : "server repose failed",
      };
    case LIKE_ITEM_VALUE_ADD:
      return {
        ...state,
        likeListIds: [...new Set([action.payloadLikeId, ...state.likeListIds])],
      };
    case UNLIKE_ITEM_VALUE_REMOVE:
      return {
        ...state,
        likeListIds: state.likeListIds.filter(
          (item) => action.payloadUnLikeId !== item
        ),
      };
    case LIKE_UNLIKE_SERVER_SIDE_LOADING:
      return {
        ...state,
        likeItemServerLoading: true,
      };
    case LIKE_UNLIKE_SERVER_SIDE_ERROR_DONE:
      return {
        ...state,
        likeItemServerLoading: false,
      };
    case CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_LOADING:
      return {
        ...state,
        incAndDecCardServerLoading: true,
      };
    case CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_ERROR_OR_DONE:
      return {
        ...state,
        incAndDecCardServerLoading: false,
      };
    case CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_LOADING:
      return {
        ...state,
        removeCardServerLoading: true,
      };
    case CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_ERROR_OR_DONE:
      return {
        ...state,
        removeCardServerLoading: false,
      };
    case SET_LOADING_PAGINATION:
      return {
        ...state,
        paginationLoading: action.payload,
      };
    case SET_PAGINATION_OFFSET:
      return {
        ...state,
        offsetProduct: state.offsetProduct + 1,
      };
    case SET_PAGINATION_LIST_END:
      return {
        ...state,
        isListEndProduct: action.payload,
      };
    case SET_FILTER:
      let tempFilterValueObj;
      if (action && action.payloadNavigation) {
        tempFilterValueObj = {
          subCategory: "",
          category: action.payloadNavigation,
          itemGroup: "",
          gender: "",
        };
      } else {
        let tempListSubIds = [];
        state.filterSubCategory.forEach((item) => {
          if (item.check) {
            tempListSubIds.push(item.id);
          }
        });

        let tempListCategoryIds = [];
        state.filterCategory.forEach((item) => {
          if (item.check) {
            tempListCategoryIds.push(item.id);
          }
        });

        let tempListItemGroupIds = [];
        state.filterItemGroup.forEach((item) => {
          if (item.check) {
            tempListItemGroupIds.push(item.id);
          }
        });

        let tempListGenderNames = [];
        state.filterGenderList.forEach((item) => {
          if (item.check) {
            tempListGenderNames.push(item.name);
          }
        });

        tempFilterValueObj = {
          subCategory: Array.isArray(tempListSubIds)
            ? tempListSubIds.join(",")
            : "",
          category: Array.isArray(tempListCategoryIds)
            ? tempListCategoryIds.join(",")
            : "",
          itemGroup: Array.isArray(tempListItemGroupIds)
            ? tempListItemGroupIds.join(",")
            : "",
          gender: Array.isArray(tempListGenderNames)
            ? tempListGenderNames.join(",")
            : "",
        };
      }
      return {
        ...state,
        filterValue: tempFilterValueObj,
        offsetProduct: 0,
        isListEndProduct: false,
        paginationLoading: false,
        listOfProduct: [],
      };
    case CLEAR_FILTERS:
      let tempFilterGenderList = state.filterGenderList.map((item) =>
        item.check ? { ...item, check: false } : item
      );
      let tempFilterSubCategory = state.filterSubCategory.map((item) =>
        item.check ? { ...item, check: false } : item
      );
      let tempFilterCategory = state.filterCategory.map((item) =>
        item.check ? { ...item, check: false } : item
      );
      let tempFilterItemGroup = state.filterItemGroup.map((item) =>
        item.check ? { ...item, check: false } : item
      );
      return {
        ...state,
        searchTextState: "",
        filterGenderList: tempFilterGenderList,
        filterSubCategory: tempFilterSubCategory,
        filterCategory: tempFilterCategory,
        filterItemGroup: tempFilterItemGroup,
      };
    case SET_GENDER_CHECK_VALUE:
      return {
        ...state,
        filterGenderList: state.filterGenderList.map((item) =>
          item.id === action.payloadId ? { ...item, check: !item.check } : item
        ),
      };
    case SET_SUB_CATEGORY_VALUE:
      return {
        ...state,
        filterSubCategory: state.filterSubCategory.map((item) =>
          item.id === action.payloadId ? { ...item, check: !item.check } : item
        ),
      };
    case SET_CATEGORY_VALUE:
      return {
        ...state,
        filterCategory: state.filterCategory.map((item) =>
          item.id === action.payloadId ? { ...item, check: !item.check } : item
        ),
      };
    case SET_ITEM_GROUP_VALUE:
      return {
        ...state,
        filterItemGroup: state.filterItemGroup.map((item) =>
          item.id === action.payloadId ? { ...item, check: !item.check } : item
        ),
      };
    case GET_FILTER_VALUE_LOADING:
      return {
        ...state,
        filterGenderList: [],
        filterSubCategory: [],
        filterCategory: [],
        filterItemGroup: [],
        filterLoading: true,
        filterError: null,
      };
    case GET_FILTER_VALUE:
      return {
        ...state,
        filterGenderList: action.payloadGender,
        filterSubCategory: action.payloadSubCategory,
        filterCategory: action.payloadCategory,
        filterItemGroup: action.payloadItemGroup,
        filterLoading: false,
        filterError: null,
      };
    case GET_FILTER_VALUE_ERROR:
      return {
        ...state,
        filterGenderList: [],
        filterSubCategory: [],
        filterCategory: [],
        filterItemGroup: [],
        filterLoading: false,
        filterError: action.payload,
      };
    case GET_PRODUCT_LOADING:
      return {
        ...state,
        listOfProductLoading: true,
        listOfProduct: [],
        listOfProductError: null,
      };
    case GET_PRODUCT_LIST:
      return {
        ...state,
        listOfProduct: [...state.listOfProduct, ...action.payload],
        listOfProductLoading: false,
        listOfProductError: null,
        paginationLoading: false,
        offsetProduct: state.offsetProduct + 10,
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        listOfProduct: [],
        listOfProductLoading: false,
        listOfProductError: action.payload,
      };
    case SET_CARD_QTY_AND_TOTAL:
      return {
        ...state,
        totalGrValue: action.payloadTotalCardvalue
          ? action.payloadTotalCardvalue
          : action.payloadTotalCardvalue == 0
          ? 0
          : state.totalGrValue
          ? state.totalGrValue
          : 0.0,
        cardTotalQty: action.payloadQty
          ? action.payloadQty
          : action.payloadQty == 0
          ? 0
          : state.cardTotalQty
          ? state.cardTotalQty
          : 0.0,
      };
    case GET_CARD_ITEMS_LOADING:
      return {
        ...state,
        cardItemsLoading: true,
        cardItemsError: null,
        cardItems: [],
      };
    case GET_CARD_ITEMS:
      return {
        ...state,
        cardItemsError: null,
        cardItemsLoading: false,
        cardItems: action.payloadCardList,
      };
    case GET_CARD_ITEMS_ERROR:
      return {
        ...state,
        cardItemsLoading: false,
        cardItemsError: action.payload
          ? action.payload
          : "server response failed",
        cardItems: [],
      };
    case GET_LIKE_ITEMS:
      return {
        ...state,
        likeItems: action.payloadLikeItemsList,
        likeItemsLoading: false,
        likeItemsError: null,
        likeListIds: action.payloadLikeItemsList.map((item) => item.id),
      };
    case GET_LIKE_ITEMS_LOADING:
      return {
        ...state,
        likeItemsLoading: true,
        likeItemsError: null,
        likeItems: [],
      };
    case GET_LIKE_ITEMS_ERROR:
      return {
        ...state,
        likeItemsLoading: false,
        likeItemsError: action.payload
          ? action.payload
          : "server response failed",
        likeItems: [],
      };
    case CARD_ITEM_INCREMENT:
      return {
        ...state,
        cardItems: state.cardItems.map((item) =>
          item.id === action.payloadProductId
            ? { ...item, cart_qty: parseInt(item.cart_qty) + 1 }
            : item
        ),
      };
    case CARD_ITEM_DECREMENT:
      return {
        ...state,
        cardItems: state.cardItems.map((item) =>
          item.id === action.payloadProductId
            ? { ...item, cart_qty: parseInt(item.cart_qty) - 1 }
            : item
        ),
      };
    case CARD_ITEM_VALUE_REMOVE:
      return {
        ...state,
        cardItems: state.cardItems.filter(
          (item) => item.id !== action.payloadProductId
        ),
      };
    case REMARK_ITEM_STATE_CHANGE:
      return {
        ...state,
        cardItems: state.cardItems.map((item) =>
          item.id === action.payloadProductId
            ? { ...item, remark: action.payloadRemark }
            : item
        ),
      };
    case SET_SIZE_ID_STATE_CHANGE:
      return {
        ...state,
        cardItems: state.cardItems.map((item) =>
          item.id === action.payloadProductId
            ? { ...item, size_id: action.payload }
            : item
        ),
      };
    case SET_GROUP_ID_STATE_CHANGE:
      return {
        ...state,
        cardItems: state.cardItems.map((item) =>
          item.id === action.payloadProductId
            ? { ...item, items_group_id: action.payload }
            : item
        ),
      };
    case ITEM_SUBCATEGORY:
      return {
        ...state,
        itemsubcategory: action.payload,
      };

    default:
      return state;
  }
};
