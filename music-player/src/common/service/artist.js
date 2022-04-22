import request from "./request";

export function getArtistList(type,limit){
  return request({
    url:`/artist/list?type=${type}&area=96&initial=-1&limit=${limit}`
  })
}
