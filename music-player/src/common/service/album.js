import request from "./request";

export function getAlbumList(){
  return request({
    url:'/album/new?limit=5'
  })
}

export function getSongInfo(id){
  return request({
    url:`/album?id=${id}`
  })
}

export function getSongPlay(id){
  return request({
    url:`/song/detail?ids=${id}`
  })
}

export function getSongUrl(id){
  return request({
    url: `/song/url?id=${id}`
  })
}

