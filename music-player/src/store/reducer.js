import { combineReducers } from "redux-immutable";


import { reducer as mainReducer } from "../pages/mainContent/store";

const cReducer = combineReducers({
  mainContent: mainReducer,
});

export default cReducer;
