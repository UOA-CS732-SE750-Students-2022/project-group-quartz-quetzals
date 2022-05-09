import { Map } from "immutable";
import * as actionTypes from "./constants";


const defaultState = Map({
  songList: [
      {
        name: "Lights Still On",
        picUrl:"http://p2.music.126.net/oQylwqRKWLJ-cPEcrBnRsQ==/109951163302663890.jpg",
        url:"http://music.163.com/song/media/outer/url?id=562598065.mp3",
        ar:[{name:'The Loafers'}]
      }],
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
    case actionTypes.DELETE_SONG:
      console.log(action.res)
      console.log(list.splice(action.res,1))
      return state.set("songList", [...list]);
    default:
      return state;
  }
}

export default reducer;
