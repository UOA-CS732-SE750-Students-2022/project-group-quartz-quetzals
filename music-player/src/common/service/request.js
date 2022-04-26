import axios from "axios";


const instance = axios.create({
  baseURL: "https://netease-cloud-music-bn6p2obor-adamliu327.vercel.app",
  timeout: 100000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {}
);

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log("400");
          break;
        case 401:
          console.log("401");
          break;
        default:
          console.log("error");
      }
    }
    return err;
  }
);

export default instance;
