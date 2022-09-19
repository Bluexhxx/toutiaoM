<template>
  <div class="comment-replay">
    <van-nav-bar
      :title="
        currentComment.reply_count > 0
          ? `${currentComment.reply_count}条回复`
          : '暂无回复'
      "
    >
      <template #left>
        <van-icon name="cross" @click="$emit('close')" />
      </template>
    </van-nav-bar>
    <div class="scroll-auto">
      <!-- 当前评论项 -->
      <comment-item :comment="currentComment"></comment-item>

      <!-- 全部回复 -->
      <van-cell title="全部回复"></van-cell>
      <comment-list :list="commentList" :source="currentComment.com_id" :type="'c'"></comment-list>
    </div>

    <!-- 发布评论 -->
    <div class="footer-button">
      <van-button plain round @click="isPostShow = true">写评论</van-button>
    </div>
    <!-- 发布评论弹层 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{ height: '17%' }"
    >
      <post-comment
        @post-success="postsuccess"
        :targertId="currentComment.com_id"
      ></post-comment>
    </van-popup>
  </div>
</template>

<script>
import commentList from './index.vue'
import commentItem from './commentItem.vue'
import PostComment from './PostComment.vue'
export default {
  name: 'CommentReplay',
  props: {
    currentComment: {
      type: Object,
      require: true
    }
  },
  components: {
    commentItem,
    commentList,
    PostComment
  },
  data() {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    postsuccess(data) {
      // 更新回复数量
      /* eslint-disable */
      this.currentComment.reply_count++
      // 关闭弹层
      // 将最新内容展示
      // 关闭弹层
      this.isPostShow = false
      // 把数据放到最前面
      this.commentList.unshift(data.data.new_obj)
    }
  }
}
</script>

<style scpoed lang="less">
.scroll-auto {
  height: calc(100vh - 420px);
  overflow: auto;
}
.footer-button {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ccc;
  .van-button {
    width: 60%;
    height: 60%;
  }
}
</style>
