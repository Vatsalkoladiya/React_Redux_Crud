import Reducer from "./Reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  list: Reducer,
});

export default rootReducer;
