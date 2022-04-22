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


// import axios from "axios";
//
// axios.defaults.timeout = 100000;
// axios.defaults.baseURL = "http://test.mediastack.cn/";
//
// /**
//  * http request 拦截器
//  */
// axios.interceptors.request.use(
//     (config) => {
//       config.data = JSON.stringify(config.data);
//       config.headers = {
//         "Content-Type": "application/json",
//       };
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
// );
//
// /**
//  * http response 拦截器
//  */
// axios.interceptors.response.use(
//     (response) => {
//       if (response.data.errCode === 2) {
//         console.log("过期");
//       }
//       return response;
//     },
//     (error) => {
//       console.log("请求出错：", error);
//     }
// );
//
// /**
//  * 封装get方法
//  * @param url  请求url
//  * @param params  请求参数
//  * @returns {Promise}
//  */
// export function get(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     axios.get(url, {
//       params: params,
//     }).then((response) => {
//       resolve(response.data);
//     }).catch((error) => {
//           reject(error);
//     });
//   });
// }
//
// /**
//  * 封装post请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */
//
// export function post(url, data) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, data).then(
//         (response) => {
//           resolve(response.data);
//         },
//         (err) => {
//           reject(err);
//         }
//     );
//   });
// }


