/* eslint-disable radix */
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import { LogOutAction } from "../actions/authActons";

import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_ERROR,
  GET_FILTER_VALUE,
  GET_FILTER_VALUE_LOADING,
  GET_FILTER_VALUE_ERROR,
  GET_PRODUCT_LOADING,
  SET_GENDER_CHECK_VALUE,
  SET_SUB_CATEGORY_VALUE,
  SET_CATEGORY_VALUE,
  SET_ITEM_GROUP_VALUE,
  CLEAR_FILTERS,
  SET_FILTER,
  SET_LOADING_PAGINATION,
  SET_PAGINATION_LIST_END,
  GET_CARD_ITEMS,
  GET_CARD_ITEMS_LOADING,
  GET_CARD_ITEMS_ERROR,
  CARD_ITEM_INCREMENT,
  CARD_ITEM_DECREMENT,
  CARD_ITEM_VALUE_REMOVE,
  ADD_CARD_ITEM,
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
  PLACE_ORDER_ITEMS,
  PLACE_ORDER_ITEMS_LOADING,
  PLACE_ORDER_ITEMS_ERROR,
  EDIT_ORDER_ITEM_LOADING,
  EDIT_ORDER_ITEM_BY_ID,
  EDIT_ORDER_ITEM_ERROR,
  TOGGLE_SEARCH_MODEL,
  SET_SEARCH,
  GET_GROUP_SIZE_LOADING,
  GET_GROUP_SIZE_LIST,
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
} from "./types";

export const itemsubcategory =
  (item = "") =>
  (dispatch) => {
    // console.log(item);
    dispatch({
      type: ITEM_SUBCATEGORY,
      payload: item,
    });
  };

export const setRemarkModalValues = (productObj, remark) => (dispatch) => {
  dispatch({
    type: SET_REMARK_MODEL,
    payloadProductObj: productObj,
    payloadRemark: remark,
  });
};

export const setSizeModalValues =
  (productObj, sizeId, isProduuctDetails = false) =>
  (dispatch) => {
    dispatch({
      type: SET_SIZE_MODEL,
      payloadProductObj: productObj,
      payloadSizeId: sizeId,
      payloadProductDetails: isProduuctDetails,
    });
  };

export const setGroupModalValues =
  (productObj, groupId, isProduuctDetails = false) =>
  (dispatch) => {
    dispatch({
      type: SET_GROUP_MODEL,
      payloadProductObj: productObj,
      payloadGroupId: groupId,
      payloadProductDetails: isProduuctDetails,
    });
  };

export const addToCardItem =
  ({ item }) =>
  (dispatch) => {
    dispatch({
      type: ADD_CARD_ITEM,
      payloadProductItem: item,
    });
  };

export const setGenderCheckValue = (itemId) => (dispatch) => {
  dispatch({
    type: SET_GENDER_CHECK_VALUE,
    payloadId: itemId,
  });
};

export const setSubCategoryCheckValue = (itemId) => (dispatch) => {
  dispatch({
    type: SET_SUB_CATEGORY_VALUE,
    payloadId: itemId,
  });
};

export const setCategoryCheckValue = (itemId) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_VALUE,
    payloadId: itemId,
  });
};

export const setItemGroupCheckValue = (itemId) => (dispatch) => {
  dispatch({
    type: SET_ITEM_GROUP_VALUE,
    payloadId: itemId,
  });
};

export const clearAllFilter = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILTERS,
  });
};

export const applyFilterAction =
  (Category = null) =>
  (dispatch) => {
    dispatch({
      type: SET_FILTER,
      payloadNavigation: Category,
    });
  };

export const getProductsAction = () => (dispatch, getState) => {
  try {
    const {
      authState: { userToken, stoneValue },
      productState: {
        filterValue,
        paginationLoading,
        isListEndProduct,
        offsetProduct,
        searchTextState,
      },
    } = getState();

    if (!paginationLoading && !isListEndProduct) {
      dispatch({
        type: SET_LOADING_PAGINATION,
        payload: true,
      });

      var sendObj = JSON.stringify({
        offset: offsetProduct,
        limit: 10,
        sub_category: filterValue.subCategory,
        gender: filterValue.gender,
        item_group: filterValue.itemGroup,
        category: filterValue.category,
        search_text: searchTextState,
        // from_stone_percentage: stoneValue[0],
        // to_stone_percentage: stoneValue[1],
      });

      if (userToken) {
        var config = {
          method: "post",
          url: "https://rd.ragingdevelopers.com/svira/svira1api/items",
          headers: {
            "If-Range": userToken,
            "Content-Type": "application/json",
          },
          data: sendObj,
        };
      } else {
        var config = {
          method: "post",
          url: "https://rd.ragingdevelopers.com/svira/svira2api/items/item_config",
          headers: {
            Authorization: "Bearer xA7uZ1cH8oM7xX0qX2xG5aB7cY6xF2yE",
            "Content-Type": "application/json",
          },
          data: sendObj,
        };
      }

      axios(config)
        .then(function (response) {
          if (
            response &&
            response.data &&
            response.data.status === false &&
            response.data.msg.includes("Invalid Token")
          ) {
            dispatch(LogOutAction());
          }

          if (response.data.data.length > 0) {
            dispatch({
              type: GET_PRODUCT_LIST,
              payload: response.data.data,
            });
          } else {
            dispatch({
              type: SET_LOADING_PAGINATION,
              payload: false,
            });
            dispatch({
              type: SET_PAGINATION_LIST_END,
              payload: true,
            });
          }
        })
        .catch(function (error) {
          dispatch({
            type: GET_PRODUCT_ERROR,
            payload: "server response failed",
          });
          dispatch({
            type: SET_LOADING_PAGINATION,
            payload: false,
          });
          dispatch({
            type: SET_PAGINATION_LIST_END,
            payload: true,
          });
        });
    }
  } catch (e) {
    dispatch({
      type: GET_PRODUCT_ERROR,
      payload: "server response failed",
    });
    dispatch({
      type: SET_LOADING_PAGINATION,
      action: false,
    });
    dispatch({
      type: SET_PAGINATION_LIST_END,
      action: true,
    });
  }
};

export const filterTypesAction = () => async (dispatch, getState) => {
  try {
    const {
      authState: { userToken },
    } = getState();

    var emptyObj = JSON.stringify({});

    if (userToken) {
      var config = {
        method: "post",
        url: "https://rd.ragingdevelopers.com/svira/svira1api/filter",
        headers: {
          "If-Range": userToken,
          "Content-Type": "application/json",
        },
        data: emptyObj,
      };
    } else {
      var config = {
        method: "get",
        url: "https://rd.ragingdevelopers.com/svira/svira2api/filter",
        headers: {
          Authorization: "Bearer xA7uZ1cH8oM7xX0qX2xG5aB7cY6xF2yE",
        },
      };
    }

    axios(config)
      .then(function (response) {
        let genderAddCheck;
        let SubCategoryAddCheck;
        let CategoryAddCheck;
        let ItemGroupAddCheck;

        if (
          response &&
          response.data &&
          response.data.status === false &&
          response.data.msg.includes("Invalid Token")
        ) {
          dispatch(LogOutAction());
        }

        if (response && response.data && response.data.data) {
          genderAddCheck = response.data.data.gender
            ? response.data.data.gender.map((item) => ({
                ...item,
                check: false,
              }))
            : [];

          SubCategoryAddCheck = response.data.data.sub_category
            ? response.data.data.sub_category.map((item) => ({
                ...item,
                check: false,
              }))
            : [];

          CategoryAddCheck = response.data.data.category
            ? response.data.data.category.map((item) => ({
                ...item,
                check: false,
              }))
            : [];

          ItemGroupAddCheck = response.data.data.item_group
            ? response.data.data.item_group.map((item) => ({
                ...item,
                check: false,
              }))
            : [];
        } else {
          genderAddCheck = [];
          SubCategoryAddCheck = [];
          CategoryAddCheck = [];
          ItemGroupAddCheck = [];
        }

        dispatch({
          type: GET_FILTER_VALUE,
          payloadGender: genderAddCheck,
          payloadSubCategory: SubCategoryAddCheck,
          payloadCategory: CategoryAddCheck,
          payloadItemGroup: ItemGroupAddCheck,
        });
      })
      .catch(function (error) {});
  } catch (e) {}
};

export const getCardItemsAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_CARD_ITEMS_LOADING,
  });

  try {
    const {
      authState: { userToken },
    } = getState();

    var emptyObj = JSON.stringify({});

    var config = {
      method: "post",
      url: "https://rd.ragingdevelopers.com/svira/svira1api/home/cart",
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: emptyObj,
    };

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

        if (response && response.data && response.data.status) {
          let totalReposneQty =
            response.data.totaldata && response.data.totaldata.total_qty
              ? response.data.totaldata.total_qty
              : 0;
          let totalReponseGr =
            response.data.totaldata && response.data.totaldata.total_gr
              ? response.data.totaldata.total_gr
              : 0;

          dispatch({
            type: SET_CARD_QTY_AND_TOTAL,
            payloadTotalCardvalue: parseFloat(totalReponseGr),
            payloadQty: parseInt(totalReposneQty),
          });
        }

        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.length !== 0
        ) {
          dispatch({
            type: GET_CARD_ITEMS,
            payloadCardList: response.data.data,
          });
        } else {
          dispatch({
            type: GET_CARD_ITEMS_ERROR,
            payload: "your card is empty",
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: GET_CARD_ITEMS_ERROR,
          payload: "server response failed",
        });
      });
  } catch (e) {}
};

export const addCardItemsAction =
  (
    projectId,
    productQty = "0",
    typeOfQty = "*",
    itemGroupId = null,
    itemSizeId = null,
    remark = null,
    editState = "", // addtocard, +,-,remark, size, group
    subcategory = ""
  ) =>
  async (dispatch, getState) => {
    dispatch({
      type: CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_LOADING,
    });

    let cardQtyForServer = productQty;
    console.log(subcategory);
    if (typeOfQty === "+") {
      // card Stateechange mate karlu che
      // add to card ma this not going to run
      cardQtyForServer = "1";
      // dispatch({
      //   type: CARD_ITEM_INCREMENT,
      //   payloadProductId: projectId,
      // });
    } else if (typeOfQty === "-") {
      // card Stateechange mate karlu che
      // add to card ma this not going to run
      cardQtyForServer = "-1";
      // dispatch({
      //   type: CARD_ITEM_DECREMENT,
      //   payloadProductId: projectId,
      // });
    }

    try {
      const {
        authState: { userToken },
      } = getState();

      var dataObj = JSON.stringify({
        item_config_id: projectId,
        qty: cardQtyForServer,
        action: "add",
        group_id: itemGroupId,
        size_id: itemSizeId,
        remark: remark,
        item_sub_data: subcategory,
      });

      var config = {
        method: "post",
        url: "https://rd.ragingdevelopers.com/svira/svira1api/home/update_cart",
        headers: {
          "If-Range": userToken,
          "Content-Type": "application/json",
        },
        data: dataObj,
      };

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

          if (response && response.data && response.data.status) {
            if (typeOfQty === "+") {
              // card Stateechange mate karlu che
              // add to card ma this not going to run
              // cardQtyForServer = "1";
              dispatch({
                type: CARD_ITEM_INCREMENT,
                payloadProductId: projectId,
              });
            } else if (typeOfQty === "-") {
              // card Stateechange mate karlu che
              // add to card ma this not going to run
              // cardQtyForServer = "-1";
              dispatch({
                type: CARD_ITEM_DECREMENT,
                payloadProductId: projectId,
              });
            }

            if (editState === "remark") {
              dispatch({
                type: REMARK_ITEM_STATE_CHANGE,
                payloadProductId: projectId,
                payloadRemark: remark,
              });
            } else if (editState === "size") {
              dispatch({
                type: SET_SIZE_ID_STATE_CHANGE,
                payloadProductId: projectId,
                payload: itemSizeId,
              });
            } else if (editState === "group") {
              dispatch({
                type: SET_GROUP_ID_STATE_CHANGE,
                payloadProductId: projectId,
                payload: itemGroupId,
              });
            }

            let totalReposneQty =
              response.data.totaldata && response.data.totaldata.total_qty
                ? response.data.totaldata.total_qty
                : 0;
            let totalReponseGr =
              response.data.totaldata && response.data.totaldata.total_gr
                ? response.data.totaldata.total_gr
                : 0;

            dispatch({
              type: SET_CARD_QTY_AND_TOTAL,
              payloadTotalCardvalue: parseFloat(totalReponseGr),
              payloadQty: parseInt(totalReposneQty),
            });

            Toast.show({
              text1: `Item successfully ${
                typeOfQty === "-" ? "removed from cart" : "added into cart"
              }`,
              visibilityTime: 15000,
              autoHide: true,
              position: "bottom",
              type: "success",
            });
            dispatch({
              type: CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_ERROR_OR_DONE,
            });

            // dispatch(getCardItemsAction());
          } else {
            Toast.show({
              text1: "something is wrong try again",
              visibilityTime: 15000,
              autoHide: true,
              position: "bottom",
              type: "error",
            });
            dispatch({
              type: CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_ERROR_OR_DONE,
            });
          }
        })
        .catch(function (error) {
          Toast.show({
            text1: "server response failed",
            visibilityTime: 3000,
            autoHide: true,
            position: "bottom",
            type: "error",
          });
          dispatch({
            type: CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_ERROR_OR_DONE,
          });
        });
    } catch (e) {}
  };

export const RemoveCardItemsAction =
  (projectId) => async (dispatch, getState) => {
    dispatch({
      type: CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_LOADING,
    });

    dispatch({
      type: CARD_ITEM_VALUE_REMOVE,
      payloadProductId: projectId,
    });

    try {
      const {
        authState: { userToken },
      } = getState();

      var dataObj = JSON.stringify({ id: projectId });

      var config = {
        method: "post",
        url: "https://rd.ragingdevelopers.com/svira/svira1api/home/remove_cart",
        headers: {
          "If-Range": userToken,
          "Content-Type": "application/json",
        },
        data: dataObj,
      };

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

          if (response && response.data && response.data.status) {
            let totalReposneQty =
              response.data.totaldata && response.data.totaldata.total_qty
                ? response.data.totaldata.total_qty
                : 0;
            let totalReponseGr =
              response.data.totaldata && response.data.totaldata.total_gr
                ? response.data.totaldata.total_gr
                : 0;

            dispatch({
              type: SET_CARD_QTY_AND_TOTAL,
              payloadTotalCardvalue: parseFloat(totalReponseGr),
              payloadQty: parseInt(totalReposneQty),
            });

            // dispatch(getCardItemsAction());

            Toast.show({
              text1: `Item successfully removed from cart`,
              visibilityTime: 15000,
              autoHide: true,
              position: "bottom",
              type: "success",
            });
            dispatch({
              type: CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_ERROR_OR_DONE,
            });
          } else {
            Toast.show({
              text1: "something is wrong try again",
              visibilityTime: 15000,
              autoHide: true,
              position: "bottom",
              type: "error",
            });
            dispatch({
              type: CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_ERROR_OR_DONE,
            });
          }
        })
        .catch(function (error) {
          dispatch({
            type: CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_ERROR_OR_DONE,
          });
          Toast.show({
            text1: "server response failed",
            visibilityTime: 15000,
            autoHide: true,
            position: "bottom",
            type: "error",
          });
        });
    } catch (e) {}
  };

export const getLikeCardItemsAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_LIKE_ITEMS_LOADING,
  });

  try {
    const {
      authState: { userToken },
    } = getState();

    var emptyObj = JSON.stringify({});

    var config = {
      method: "post",
      url: "https://rd.ragingdevelopers.com/svira/svira1api/home/wishlist",
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: emptyObj,
    };

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

        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.length !== 0
        ) {
          dispatch({
            type: GET_LIKE_ITEMS,
            payloadLikeItemsList: response.data.data,
          });
        } else {
          dispatch({
            type: GET_LIKE_ITEMS_ERROR,
            payload: "your wish list is empty",
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: GET_LIKE_ITEMS_ERROR,
          payload: "server response failed",
        });
      });
  } catch (e) {}
};

export const addRemoveLikeItemsAction =
  (projectId, type = "like") =>
  async (dispatch, getState) => {
    dispatch({
      type: LIKE_UNLIKE_SERVER_SIDE_LOADING,
    });

    if (type === "like") {
      dispatch({
        type: LIKE_ITEM_VALUE_ADD,
        payloadLikeId: projectId,
      });
    } else if (type === "unlike") {
      dispatch({
        type: UNLIKE_ITEM_VALUE_REMOVE,
        payloadUnLikeId: projectId,
      });
    }

    try {
      const {
        authState: { userToken },
      } = getState();

      var dataObj = JSON.stringify({ id: projectId });

      const likeUnlikeUrl =
        type === "like"
          ? "https://rd.ragingdevelopers.com/svira/svira1api/home/add_wishlist"
          : "https://rd.ragingdevelopers.com/svira/svira1api/home/remove_wishlist";

      var config = {
        method: "post",
        url: likeUnlikeUrl,
        headers: {
          "If-Range": userToken,
          "Content-Type": "application/json",
        },
        data: dataObj,
      };

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

          if (response && response.data && response.data.status) {
            Toast.show({
              text1:
                type === "like"
                  ? "Item successfully added into wishlist"
                  : "Item successfully removed from wishlist",
              visibilityTime: 15000,
              autoHide: true,
              position: "bottom",
              type: "success",
            });
            dispatch({
              type: LIKE_UNLIKE_SERVER_SIDE_ERROR_DONE,
            });
          } else {
            Toast.show({
              text1: "something is wrong",
              visibilityTime: 15000,
              autoHide: true,
              position: "bottom",
              type: "error",
            });
            dispatch({
              type: LIKE_UNLIKE_SERVER_SIDE_ERROR_DONE,
            });
          }
        })
        .catch(function (error) {
          Toast.show({
            text1: "something is wrong",
            visibilityTime: 15000,
            autoHide: true,
            position: "bottom",
            type: "error",
          });
          dispatch({
            type: LIKE_UNLIKE_SERVER_SIDE_ERROR_DONE,
          });
        });
    } catch (e) {}
  };

// list of order get

export const getOrderListAction = () => async (dispatch, getState) => {
  dispatch({
    type: LIST_ORDER_ITEM_LOADING,
  });

  try {
    const {
      authState: { userToken },
    } = getState();

    var emptyObj = JSON.stringify({});

    var config = {
      method: "post",
      url: "https://rd.ragingdevelopers.com/svira/svira1api/order/list_order",
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: emptyObj,
    };

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

        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.length !== 0
        ) {
          dispatch({
            type: LIST_ORDER_ITEM,
            payloadOrderList: response.data.data,
          });
        } else {
          dispatch({
            type: LIST_ORDER_ITEM_ERROR,
            payloadOrderListError: "your order list is empty",
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: LIST_ORDER_ITEM_ERROR,
          payloadOrderListError: "server response failed",
        });
      });
  } catch (e) {}
};

export const placeOrderCardItemAction =
  (
    stamp = "",
    finishing = "",
    rhodium = "",
    screw_type = "",
    patch_details = ""
  ) =>
  async (dispatch, getState) => {
    dispatch({
      type: PLACE_ORDER_ITEMS_LOADING,
    });

    try {
      const {
        authState: { userToken },
      } = getState();

      var emptyObj = JSON.stringify({
        stamp: stamp,
        finishing: finishing,
        rhodium: rhodium,
        screw_type: screw_type === "north" ? "North Screw" : "South Screw",
        patch_details:
          patch_details === "with" ? "With Patch" : "With Out Patch",
      });

      var config = {
        method: "post",
        url: "https://rd.ragingdevelopers.com/svira/svira1api/order",
        headers: {
          "If-Range": userToken,
          "Content-Type": "application/json",
        },
        data: emptyObj,
      };

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

          if (
            response &&
            response.data &&
            response.data.status &&
            response.data.status === true
          ) {
            Toast.show({
              text1: response.data.message
                ? response.data.message
                : "Order Placed Successfully",
              visibilityTime: 15000,
              autoHide: true,
              position: "bottom",
              type: "success",
            });

            dispatch(getCardItemsAction());

            dispatch({
              type: PLACE_ORDER_ITEMS,
            });
          } else {
            Toast.show({
              text1:
                response.data && response.data.message
                  ? response.data.message
                  : "something is wrong, try again",
              visibilityTime: 15000,
              autoHide: true,
              position: "bottom",
              type: "error",
            });

            dispatch({
              type: PLACE_ORDER_ITEMS_ERROR,
            });
          }
        })
        .catch(function (error) {
          Toast.show({
            text1: "server response failed, try again",
            visibilityTime: 15000,
            autoHide: true,
            position: "bottom",
            type: "error",
          });

          dispatch({
            type: PLACE_ORDER_ITEMS_ERROR,
          });
        });
    } catch (e) {}
  };

export const editOrderItemAction =
  (orderId = "0") =>
  async (dispatch, getState) => {
    dispatch({
      type: EDIT_ORDER_ITEM_LOADING,
    });

    try {
      const {
        authState: { userToken },
      } = getState();

      var emptyObj = JSON.stringify({});

      var config = {
        method: "post",
        url: `https://rd.ragingdevelopers.com/svira/svira1api/order/edit_order/${orderId}`,
        headers: {
          "If-Range": userToken,
          "Content-Type": "application/json",
        },
        data: emptyObj,
      };

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

          if (
            response &&
            response.data &&
            response.data.status &&
            response.data.status === true
          ) {
            dispatch(getCardItemsAction());

            Toast.show({
              text1: response.data.message
                ? response.data.message
                : "Order added into cart successfully",
              visibilityTime: 15000,
              autoHide: true,
              position: "bottom",
              type: "success",
            });

            dispatch({
              type: EDIT_ORDER_ITEM_BY_ID,
            });
          } else {
            Toast.show({
              text1: "something is wrong, try again",
              visibilityTime: 15000,
              autoHide: true,
              position: "bottom",
              type: "error",
            });

            dispatch({
              type: EDIT_ORDER_ITEM_ERROR,
            });
          }
        })
        .catch(function (error) {
          Toast.show({
            text1: "server response failed, try again",
            visibilityTime: 15000,
            autoHide: true,
            position: "bottom",
            type: "error",
          });

          dispatch({
            type: EDIT_ORDER_ITEM_ERROR,
          });
        });
    } catch (e) {}
  };

export const setSearchModelAction =
  (searchValue = "") =>
  (dispatch) => {
    dispatch({
      type: SET_SEARCH,
      payload: searchValue,
    });
  };

export const toggleSearchModelAction = () => (dispatch) => {
  dispatch({
    type: TOGGLE_SEARCH_MODEL,
  });
};

export const getGroupAndSizeId = () => async (dispatch, getState) => {
  dispatch({
    type: GET_GROUP_SIZE_LOADING,
  });

  try {
    const {
      authState: { userToken },
    } = getState();

    var objData = JSON.stringify({
      offset: 0,
      limit: 0,
      sub_category: "",
      gender: "",
      item_group: "",
      category: "",
      search_text: "",
    });

    var config = {
      method: "post",
      url: "https://rd.ragingdevelopers.com/svira/svira1api/home/sizeandgroup",
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: objData,
    };

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

        if (response && response.data && response.data.data) {
          dispatch({
            type: GET_GROUP_SIZE_LIST,
            sizeList:
              Array.isArray(response.data.data.size) && response.data.data.size
                ? response.data.data.size
                : [],
            groupListItems:
              Array.isArray(response.data.data.group) &&
              response.data.data.group
                ? response.data.data.group
                : [],
          });
        } else {
          // dispatch({
          //   type: GET_CARD_ITEMS_ERROR,
          //   payload: "your card is empty",
          // });
        }
      })
      .catch(function (error) {
        dispatch({
          type: GET_GROUP_SIZE_LIST_ERROR,
          payload: "server response failed",
        });
      });
  } catch (e) {}
};

export const getOrderWebViewPdfData = (orderId) => (dispatch, getState) => {
  try {
    const {
      authState: { userToken },
    } = getState();

    dispatch({
      type: ORDER_PED_PAGE_HTML_LOADING,
    });

    var sendObj = JSON.stringify({});

    var config = {
      method: "post",
      url: `https://rd.ragingdevelopers.com/svira/svira1api/order/order_view/${orderId}`,
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: sendObj,
    };

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

        let newData = response.data;
        dispatch({
          type: ORDER_PDF_PAGE_HTML,
          payload: response.data,
        });
      })
      .catch(function (error) {
        dispatch({
          type: ORDER_PDF_PAGE_HTML_ERROR,
        });
      });
  } catch (e) {}
};
