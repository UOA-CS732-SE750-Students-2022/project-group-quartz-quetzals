import request from "./request";

export function getArtistList(type,limit){
  return request({
    url:`/artist/list?type=${type}&area=96&initial=-1&limit=${limit}`
  })
}
export function getArtistAlbum(id){
  return request({
    url:`/artist/top/song?id=${id}`
  })
}


export function getArtistSimilar(id){
  return request({
    url:`/simi/artist?id=${id}`
  })
}

export function getArtistDescription(id){
  return request({
    url:`/artist/detail?id=${id}`
  })
}
