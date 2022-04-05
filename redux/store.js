import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import reducers from "./reducers/reducers";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return reducers(state, action);
  }
};

const initStore = (context) => {
  const store = createStore(
    reducer,
    bindMiddleware([thunkMiddleware, createSagaMiddleware])
  );
  store.__persistor = persistStore(store);
  return store;
};

export const wrapper = createWrapper(initStore, { debug: true });
