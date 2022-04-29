import request from "./request";
export function getTopBanners() {
  return request({
    url: "/banner",
  });
}
export function getSinger(){
  return request({
    url:'/artist/list?type=1&area=96&initial=b&limit=6'
  })
}

