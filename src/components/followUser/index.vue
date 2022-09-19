<template>
  <van-button
    v-if="isfollowed"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :loading="loading"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { followUserAPI, unfollowUserAPI } from '@/api'

// 关注用户按钮的抽成组件
export default {
  props: {
    isfollowed: {
      type: Boolean,
      require: true
    },
    userId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow() {
      this.loading = true

      // 关注
      try {
        if (this.isfollowed) {
          // 如果关注了就取消关注
          await unfollowUserAPI(this.userId)
        } else {
          // 如果没有关注就添加关注
          await followUserAPI(this.userId)
        }
        this.$emit('updataIsFollowed', !this.isfollowed)
      } catch (error) {
        console.log(error)
        // 用户不能关注自己400报错
        if (error.response && error.response.status === 400) {
          this.$toast('不能关注自己哦')
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
