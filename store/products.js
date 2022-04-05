import axios from "axios";

export const actionTypes = {
  featuredProducts: "FEATURED_PRODUCTS",
  featuredProductsFailed: "FEATURED_PRODUCTS_FAILED",
};

const initialState = {
  data: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.featuredProducts:
      return {
        products: action.payload.products,
      };
    default:
      return state;
  }
};

export const actions = {
  getFeatured: (req) => (dispatch) => {
    try {
      // const { data } = await axios.get(
      //   `http://myshop.test/api/v1/product/latest/10`
      // );
      axios.get("http://myshop.test/api/v1/product/latest/10").then((res) => {
        dispatch({
          type: actionTypes.featuredProducts,
          payload: JSON.stringify(res.data),
        });
      });
    } catch (error) {
      dispatch({
        type: actionTypes.featuredProductsFailed,
        payload: error.message,
      });
    }
  },
};

export default productsReducer;
