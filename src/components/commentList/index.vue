<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      @load="onLoad"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="点击重试"
      :immediate-check="false"
    >
      <!-- 评论item 组件 -->
      <comment-item
        @replay-click="$emit('replay-click', $event)"
        :comment="item"
        v-for="(item, index) in list"
        :key="index"
        @update-likeCount="updatelikeCount(item, $event)"
        @update-liked="updateLiked(item)"
      ></comment-item>
    </van-list>
  </div>
</template>

<script>
import commentItem from './commentItem.vue'

import { getCommentsOrCommentRepliesAPI } from '@/api'
export default {
  name: 'commentList',
  props: {
    source: {
      type: [Number, String, Object],
      require: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  components: {
    commentItem
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 返回值里的last_id获取下一页的offset参数
      limit: 10,
      totalCount: 0,
      error: false
    }
  },
  methods: {
    async onLoad() {
      // 1.请求获取数据
      try {
        // if (Math.random() < 0.5) throw new Error('报错测试')
        const { data } = await getCommentsOrCommentRepliesAPI({
          type: this.type, // a-对文章(article)的评论
          source: this.source, // 文章id
          offset: this.offset,
          limit: this.limit
        })
        // !!!2.将数据添加到列表中
        /* eslint-disable */
        this.list.push(...data.data.results)
        // 5.把评论总数传父级显示
        this.$emit('updata-totalCount', data.data)

        // 3.将loading 设置为false
        this.loading = false
        // 4.判断是否还有数据
        if (data.data.results.length) {
          //  -有就获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          //  - 没有就将finished 设置结束
          this.finished = true // 没有数据了，关闭加载更多
        }
      } catch (error) {
        this.error = true
        this.loading = false
        console.log(error)
      }
    },
    updatelikeCount(item, $event) {
      item.like_count += $event
      console.log($event, item)
    },
    updateLiked(item) {
      item.is_liking = !item.is_liking
    }
  }
}
</script>

<style></style>
