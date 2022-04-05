import {
  FEATURED_PRODUCTS,
  FEATURED_PRODUCTS_FAILED,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const featuredProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FEATURED_PRODUCTS:
      return {
        products: action.payload,
      };
    case FEATURED_PRODUCTS_FAILED:
      return {
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
