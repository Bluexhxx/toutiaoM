<template>
  <van-button
    class="liked"
    :loading="loading"
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{ liked: value === 1 }"
    @click="onLike"
  />
</template>

<script>
import { unlikeArticleAPI, likeArticleAPI } from '@/api'
export default {
  props: {
    value: {
      type: Number,
      require: true
    },
    artId: {
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
    async onLike() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 说明已点赞 就取消点赞
          await unlikeArticleAPI(this.artId)
          status = 0
        } else {
          await likeArticleAPI(this.artId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败请重试')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
