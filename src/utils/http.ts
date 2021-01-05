import axios from "axios";
import { stringify } from "querystring";

const instance = axios.create({
  timeout: 30000,
  // 处理请求参数中的特殊字符，防止后端无法处理
  paramsSerializer: (params) => {
    return stringify(params, undefined, undefined, { encodeURIComponent });
  },
  baseURL: process.env.REACT_APP_API_SERVER,
  responseType: "json",
});

instance.interceptors.request.use(
  (config) => {
    /** 所有get请求追加时间戳，防止缓存 */
    if (config.method?.toLocaleUpperCase() === "GET") {
      if (!config.params) {
        config.params = {};
      }
      config.params["_"] = +new Date();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      alert("NETWORK ERROR");
    } else {
      const code = error.response.status;
      const originalRequest = error.config;

      if (code === 401 && !originalRequest._retry) {
        console.error("跳转到登录页");
      }

      return Promise.reject(error);
    }
  }
);

export default instance;
export const http = instance;
