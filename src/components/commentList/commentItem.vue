<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        @click="onLikeFn"
        :loading="commentLoading"
        class="like-btn"
        :class="{ liked: comment.is_liking }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        >{{ comment.like_count || '赞' }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | myrelativeTime
        }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('replay-click', comment)"
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { unlikeCommentAPI, likeCommentAPI } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      require: true
    }
  },
  filters: {
    myrelativeTime: function (value) {
      if (!value) return ''
      return dayjs(value).fromNow()
    }
  },
  data() {
    return {
      commentLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLikeFn() {
      this.commentLoading = true
      try {
        if (this.comment.is_liking) {
          await unlikeCommentAPI(this.comment.com_id)
          this.$toast.success('取消点赞')
          // 触发自定义事件-1
          this.$emit('update-likeCount', -1)
        } else {
          await likeCommentAPI(this.comment.com_id)
          this.$toast.success('点赞成功')
          this.$emit('update-likeCount', 1)
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      } finally {
        this.$emit('update-liked')
        this.commentLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
