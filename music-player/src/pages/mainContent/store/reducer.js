import { Map } from "immutable";
import * as actionTypes from "./constants";


const defaultState = Map({
  songList: [{name: "STAY",picUrl:"https://p1.music.126.net/e5cvcdgeosDKTDrkTfZXnQ==/109951166155165682.jpg",url:"http://music.163.com/song/media/outer/url?id=562598065.mp3"}],
});

function reducer(state = defaultState, action) {
  const list = state.get('songList')
  switch (action.type) {
    case actionTypes.CHANGE_SONG_LIST:
      return state.set("songList", [action.res,...list]);
    case actionTypes.CHANGE_SONG_LIST_NEXT:
      return state.set("songList", [...list,action.res]);
    case actionTypes.CHANGE_SONG_LIST_PREV:
      return state.set("songList", [action.res,...list]);
    default:
      return state;
  }
}

export default reducer;
