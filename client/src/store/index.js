import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from "../reducers";

// const reduxDevtools =
//   typeof window !== "undefined" && process.env.NODE_ENV !== "production"
//     ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__()
//     : f => f;

const composeEnhancers = composeWithDevTools({
  trace: true, traceLimit: 25
});

const enhancers = compose(
  applyMiddleware(thunk)
);

export const store = initialState => {
  return createStore(rootReducer, initialState, composeEnhancers(enhancers));
};
