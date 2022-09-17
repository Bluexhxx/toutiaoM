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
/**
 * 上传图片
 * @param {*} file 裁剪后的file对象
 * @returns Promise
 */
export const uploadImg = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
/**
 * 获取用户资料
 * @returns Promise
 */
export const getUserProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
/**
 * 编辑用户个人资料  请求的字段参数 发送几个保存几个，不发送的不修改
 * @param {string} name 昵称 必须
 * @param {string} gender 性别，0-男，1-女 必须
 * @param {string} birthday 生日，格式'2018-12-20' 必须
 * @param {string} real_name 真实姓名 必须
 * @param {string} intro 个人介绍 必须
 * @returns Promise
 */
export const editUserNameAPI = (name) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name
    }
  })
}
export const editUserGenderAPI = (gender) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      gender
    }
  })
}
export const editUserBirthdayAPI = (birthday) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      birthday
    }
  })
}
