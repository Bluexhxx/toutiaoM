import request from '@/utils/request'
/*  : {
    type,
    source,
    offset,
    limit
  } */
export const getCommentsOrCommentRepliesAPI = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}
/**
 * 对评论或评论回复点赞
 * @param {String} target 点赞的评论id
 * @returns Promsie
 */
export const likeCommentAPI = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消对评论或评论回复点赞
 * @param {String} target 取消点赞的评论id
 * @returns Promsie
 */
export const unlikeCommentAPI = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

/**
 * 对文章或者评论进行评论
 * @param {String} target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {String} content 评论内容
 * @param {String} artId 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns Promise
 */
export const postCommentAPI = (target, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}
