<template>
  <van-button
    :loading="loading"
    :icon="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    @click="onCollect"
  />
</template>

<script>
import { unfavoriteArticlesAPI, favoriteArticlesAPI } from '@/api'
export default {
  name: 'collectArticle',
  props: {
    value: {
      type: Boolean,
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
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          // 已搜藏就取消收藏
          await unfavoriteArticlesAPI(this.artId)
        } else {
          await favoriteArticlesAPI(this.artId)
        }
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        console.log(error)
      } finally {
        // 更新视图
        this.$emit('input', !this.value)
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
