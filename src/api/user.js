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

export const getCodeApi = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
