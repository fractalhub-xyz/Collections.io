import { createStore, combineReducers, applyMiddleware } from "redux";
import { toastsReducer } from "./reducers";

const logger = (store) => (next) => (action) => {
  console.log(`Starting action ${action}: ${store.getState()}`);
  next(action);
  console.log(`Action Over ${action}: ${store.getState()}`);
};

const store = createStore(toastsReducer, applyMiddleware(logger));

export default store;
