import { Map } from "immutable";
import * as actionTypes from "./constants";


const defaultState = Map({
  songList: [
      {
        id:562598065,
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
      let indexPrev = -1
      list.forEach((item,index)=>{
        if(item.id === action.res.id){
          indexPrev = index
        }
      })
      if(indexPrev!==-1){
        list.splice(indexPrev,1)
      }
      return state.set("songList", [action.res,...list]);
    case actionTypes.CHANGE_SONG_LIST_NEXT:
      let indexNum = -1
      list.forEach((item,index)=>{
        if(item.id === action.res.id){
          indexNum = index
        }
      })
      if(indexNum!==-1){
        list.splice(indexNum,1)
      }
      return state.set("songList", [...list,action.res]);
    case actionTypes.CHANGE_SONG_LIST_PREV:
      return state.set("songList", [action.res,...list]);
    case actionTypes.DELETE_SONG:
      list.splice(action.res,1)
      return state.set("songList", [...list]);
    default:
      return state;
  }
}

export default reducer;
