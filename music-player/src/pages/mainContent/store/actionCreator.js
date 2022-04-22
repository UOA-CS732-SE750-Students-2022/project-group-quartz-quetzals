import * as actionTypes from "./constants";

import { getAlbumList } from "../../../common/service/album";
import { getArtistList } from "../../../common/service/artist";
import { getRankingList } from "../../../common/service/ranking";
const changeAlbumListAction = (res) => ({
  type: actionTypes.CHANGE_ALBUM_LIST,
  res,
});

const changeArtistListAction = (res) => ({
  type: actionTypes.CHANGE_ARTIST_LIST,
  res,
});


const changeRankingAction1 = (res) => ({
  type: actionTypes.CHANGE_RANKING_LIST1,
  res,
});
const changeRankingAction2 = (res) => ({
  type: actionTypes.CHANGE_RANKING_LIST2,
  res,
});
const changeRankingAction3 = (res) => ({
  type: actionTypes.CHANGE_RANKING_LIST3,
  res,
});

export const getAlbumListAction = () => {
  return (dispatch) => {
    getAlbumList().then((res) => {
      const data = res && res.result;
      dispatch(changeAlbumListAction(data));
    });
  };
};
export const getArtistListAction = (type,limit) =>{
  return (dispatch) => {
    getArtistList(type,limit).then((res) => {
      const data = res && res.artists;
      dispatch(changeArtistListAction(data));
    });
  };
}

export const getRankingAction = (id) => {
  return (dispatch) => {
    getRankingList(id).then((res) => {
      const data = res && res.playlist;
      // console.log(data)
      switch (id) {
        case 3778678:
          dispatch(changeRankingAction1(data));
          break;
        case 3779629:
          dispatch(changeRankingAction2(data));
          break;
        case 19723756:
          dispatch(changeRankingAction3(data));
          break;
        default:
      }
    })
  }
};
