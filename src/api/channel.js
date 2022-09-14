// 频道接口

import request from '@/utils/request'
/**
 * 获取用户自己的频道
 * @returns Promise
 */
export const getChannelApi = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 读取所有频道
 * @returns Promise
 */
export const getAllChannelsApi = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 *  删除制定频道
 * @param {Number | String} id 频道id
 * @returns Promise
 */
export const deleteChannelApi = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
/**
 * 新增频道
 * @param {Number | Srting} id 频道id
 * @param {Number} seq 新增频道添加的索引值
 * @returns  Promise
 */
export const addChannelApi = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
