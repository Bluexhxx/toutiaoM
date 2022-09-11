import request from '@/utils/request'
/**
 * 发送用户登录post请求
 * @param {String} mobile 手机号
 * @param {Number} code   验证码
 * @returns Promise
 */
export const loginApi = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns  Promise
 */
export const getCodeApi = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserInfoApi = () => {
  return request({
    url: '/v1_0/user'
    // 使用请求拦截器优化
    // headers: {
    //   // 箭头函数中没有this 不适合用this.$store
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}
