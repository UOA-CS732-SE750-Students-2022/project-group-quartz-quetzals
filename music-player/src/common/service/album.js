import request from "./request";
const cookie = `MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/api/clientlog;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/api/feedback;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/eapi/feedback;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/weapi/feedback;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/wapi/feedback;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/api/feedback;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/weapi/feedback;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/neapi/feedback;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/wapi/feedback;;MUSIC_U=68879b246ef892676efd49ceb5b473380f50b79ae78fdcd7133ff7c4b1b89eed519e07624a9f005380ecdbe3ebbb91cf3d7f23ebde55f4357f37683f98f232b2b9dca67e059c307b7a561ba977ae766d; Max-Age=1296000; Expires=Wed, 11 May 2022 06:01:43 GMT; Path=/;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/openapi/clientlog;;MUSIC_SNS=; Max-Age=0; Expires=Tue, 26 Apr 2022 06:01:43 GMT; Path=/;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/eapi/feedback;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/neapi/feedback;;__remember_me=true; Max-Age=1296000; Expires=Wed, 11 May 2022 06:01:43 GMT; Path=/;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/api/clientlog;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/weapi/clientlog;;__csrf=e637cd5008c57017112351f558d3af11; Max-Age=1296010; Expires=Wed, 11 May 2022 06:01:53 GMT; Path=/;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/weapi/clientlog;`;
console.log(cookie);
export function getAlbumList(){
  return request({
    url:'/album/new?area=EA&limit=5'
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
    url: `/song/url?id=${id}&cookie=${cookie}`
  })
}

