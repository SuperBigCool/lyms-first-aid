import axios from 'axios';
import { ElMessage } from 'element-plus'
import { getToken, setToken } from './token-util';
import { API_BASE_URL, TOKEN_HEADER_NAME } from '@/config/setting';

const service = axios.create({
    baseURL: API_BASE_URL
});

/**
 * 添加请求拦截器
 */
 service.interceptors.request.use(
    (config) => {
      // 添加 token 到 header
      const token = getToken();
      if (token && config.headers) {
        config.headers.common[TOKEN_HEADER_NAME] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
    (res) => {
        // 登录过期处理
        if (res.data?.code === 401) {
            ElMessage.error('登录已过期,请重新登录.')
            return Promise.reject(new Error(res.data.message));
        }
        // token 自动续期
        const token = res.headers[TOKEN_HEADER_NAME.toLowerCase()];
        if (token) {
            setToken(token);
        }
        return res;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;