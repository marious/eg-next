import { combineReducers, createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
// import storage from 'redux-persist/lib/storage';

// Import Reducers
import cartReducer from "./cart";
import wishlistReducer from "./wishlist";
import compareReducer from "./compare";
import demoReducer from "./demo";
import productsReducer from "./products";

const rootReducers = combineReducers({
  cartlist: cartReducer,
  wishlist: wishlistReducer,
  comparelist: compareReducer,
  demo: demoReducer,
  // products: productsReducer,
});

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducers)
const sagaMiddleware = createSagaMiddleware();

export const makeStore = (context) => {
  const middlewares = [sagaMiddleware];
  const store = createStore(rootReducers, applyMiddleware(...middlewares));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  store.__persistor = persistStore(store);
  return store;
};

// export default makeStore;

export const wrapper = createWrapper(makeStore, { debug: true });
