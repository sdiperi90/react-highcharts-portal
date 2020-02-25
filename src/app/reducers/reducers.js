import { combineReducers } from "redux";

import stockReducer from "./stocks-reducer";
import forexReducer from "./forex-reducer";

export default combineReducers({
  stockReducer,
  forexReducer
});
