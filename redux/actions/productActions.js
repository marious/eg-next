import axios from "axios";

import {
  FEATURED_PRODUCTS,
  FEATURED_PRODUCTS_FAILED,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const getFeaturedProducts = (req) => async (dispatch) => {
  // try {
  const res = await axios.get("http://myshop.test/api/v1/product/latest/10", {
    "Content-Type": "application/json",
  });
  //console.log("raya" + JSON.stringify(res.data.data));

  dispatch({
    type: FEATURED_PRODUCTS,
    payload: res.data.data,
  });
  // } catch (error) {
  //   dispatch({
  //     type: FEATURED_PRODUCTS_FAILED,
  //     payload: error.message,
  //   });
  // }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
