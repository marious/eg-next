import { combineReducers } from "redux";
import { featuredProductsReducer } from "./productReducer";
import demoReducer from "../initial/demo";
import wishlistReducer from "../initial/wishlist";
import cartReducer from "../initial/cart";
import compareReducer from "../initial/compare";

const reducers = combineReducers({
  cartlist: cartReducer,
  featuredProducts: featuredProductsReducer,
  demo: demoReducer,
  wishlist: wishlistReducer,
  comparelist: compareReducer,
});

export default reducers;
