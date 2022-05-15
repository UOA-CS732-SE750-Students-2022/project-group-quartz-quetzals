import * as actionTypes from "./constants";

export const changeSongListAction = (res) => ({
  type: actionTypes.CHANGE_SONG_LIST,
  res,
});

export const changeSongListPrevAction = (res) => ({
  type: actionTypes.CHANGE_SONG_LIST_PREV,
  res,
});

export const changeSongListNextAction = (res) => ({
  type: actionTypes.CHANGE_SONG_LIST_NEXT,
  res,
});

export const deleteSongAction =(res) => ({
  type: actionTypes.DELETE_SONG,
  res,
})


// export const getSongListAction = () =>{
//   return (dispatch) => {
//     getAlbumList().then((res) => {
//       const data = res && res.result;
//       dispatch(changeSongListAction(data));
//     });
//   };
// }

// export const getAlbumListAction = () => {
//   return (dispatch) => {
//     getAlbumList().then((res) => {
//       const data = res && res.result;
//       dispatch(changeAlbumListAction(data));
//     });
//   };
// };
// export const getArtistListAction = (type,limit) =>{
//   return (dispatch) => {
//     getArtistList(type,limit).then((res) => {
//       const data = res && res.artists;
//       dispatch(changeArtistListAction(data));
//     });
//   };
// }
//
// export const getRankingAction = (id) => {
//   return (dispatch) => {
//     getRankingList(id).then((res) => {
//       const data = res && res.playlist;
//       // console.log(data)
//       switch (id) {
//         case 3778678:
//           dispatch(changeRankingAction1(data));
//           break;
//         case 3779629:
//           dispatch(changeRankingAction2(data));
//           break;
//         case 19723756:
//           dispatch(changeRankingAction3(data));
//           break;
//         default:
//       }
//     })
//   }
// };
