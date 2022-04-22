import request from "./request";

export function getAlbumList(){
  return request({
    url:'/personalized?limit=5'
  })
}
