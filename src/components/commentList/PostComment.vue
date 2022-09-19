<template>
  <div class="commentpop-container">
    <van-field
      v-model.trim="message"
      rows="3"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    >
    </van-field>
    <van-button
      :disabled="!message.length"
      plain
      block
      size="small"
      type="info"
      @click="onPostComment"
      >发布</van-button
    >
  </div>
</template>

<script>
import { postCommentAPI } from '@/api'
export default {
  name: 'PostComment',
  props: {
    targertId: {
      type: [String, Number, Object],
      require: true
    }
  },
  inject: {
    artId: {
      type: [String, Number, Object],
      default: null
    }
  },

  data() {
    return {
      message: '' // 评论内容
    }
  },
  methods: {
    async onPostComment() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        const { data } = await postCommentAPI(
          this.targertId,
          this.message,
          this.artId
        )
        console.log(data)
        this.message = ''
        this.$emit('post-success', data)
        // 在父组件里绑定自定义事件
        // 子组件发布成功后通知父组件进行后续的处理
        this.$toast.success('发布成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.commentpop-container {
  display: flex;
  align-items: center;
  .van-button {
    flex: 1;
    border: 0;
    font-size: 32px;
    opacity: 0.6;
  }
  .van-field {
    flex: 5;
    :deep(.van-field__control) {
      background-color: #f5f7f9;
    }
    :deep(.van-field__word-limit) {
      background-color: #f5f7f9;
      margin-top: 0;
    }
  }
}
</style>
