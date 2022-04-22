import { Map } from "immutable";
import * as actionTypes from "./constants";


const defaultState = Map({
  albumList: [],
  artistList: [],
  ranking1: {},
  ranking2: {},
  ranking3: {},
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_ALBUM_LIST:
      return state.set("albumList", action.res);
    case actionTypes.CHANGE_ARTIST_LIST:
      return state.set("artistList", action.res);
    case actionTypes.CHANGE_RANKING_LIST1:
      return state.set("ranking1", action.res);
    case actionTypes.CHANGE_RANKING_LIST2:
      return state.set("ranking2", action.res);
    case actionTypes.CHANGE_RANKING_LIST3:
      return state.set("ranking3", action.res);
    default:
      return state;
  }
}

export default reducer;
