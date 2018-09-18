import { combineReducers } from "redux";
import * as types from "./types";

const listReducer = (state = { stations: [] }, { type, payload }) => {
  switch (type) {
    case types.FETCH_STATION_LIST_REQUESTED:
    case types.FETCH_STATION_LIST_RECEIVED:
      return { ...payload };
    default:
      return state;
  }
};

// export default combineReducers({
//   listReducer,
// });

export default listReducer;