import store from '@/store'
import axios from 'axios'
import JSONBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000,
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data) {
      try {
        return JSONBig.parse(data)
      } catch (error) {
        return data
      }
    }
  ]
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // config 是每一次请求的配置对象
    // 在发送请求之前做些什么
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
