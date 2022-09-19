<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      @click-left="$router.back()"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="articleDetails.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleDetails.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDetails.aut_photo"
          />
          <div slot="title" class="user-name">
            {{ articleDetails.aut_name }}
          </div>
          <div slot="label" class="publish-date">
            {{ ftime }}
          </div>
          <follow-user
            class="follow-btn"
            :isfollowed="articleDetails.is_followed"
            :userId="articleDetails.aut_id"
            @updataIsFollowed="articleDetails.is_followed = $event"
          ></follow-user>
          <!-- <van-button
            v-if="articleDetails.is_followed"
            class="follow-btn"
            round
            size="small"
            :loading="followLoading"
            @click="focusOnFn"
            >已关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            :loading="followLoading"
            icon="plus"
            @click="focusOnFn"
            >关注</van-button
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleDetails.content"
          ref="articleCon"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 发布评论弹出层 组件 -->
        <van-popup
          v-model="isShowPostComm"
          position="bottom"
          :style="{ height: '17%' }"
        >
          <post-comment
            v-if="isShowPostComm"
            @post-success="onPostSuccess"
            :targertId="articleDetails.art_id"
          ></post-comment>
        </van-popup>
        <!-- 评论列表 -->
        <comment-list
          @replay-click="replayClick"
          :list="commentList"
          :source="articleDetails.art_id"
          @updata-totalCount="totoalCount = $event.total_count"
        ></comment-list>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isShowPostComm = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="totoalCount" color="#777" />
          <!-- 收藏组件 -->
          <collect-article
            v-model="articleDetails.is_collected"
            :artId="articleDetails.art_id"
          ></collect-article>
          <!-- 点赞组件 -->
          <like-article
            v-model="articleDetails.attitude"
            :artId="articleDetails.art_id"
          ></like-article>

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errstatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="getNewsDetails" class="retry-btn"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup
      v-if="isShowReplayComm"
      v-model="isShowReplayComm"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <comment-replay
        v-if="isShowReplayComm"
        @close="isShowReplayComm = false"
        :currentComment="currentComment"
      ></comment-replay>
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { ImagePreview } from 'vant'
import { getNewsDetailsAPI } from '@/api'
import followUser from '@/components/followUser'
import collectArticle from '@/components/collectArticle'
import likeArticle from '@/components/likeArticle'
import commentList from '@/components/commentList'
import PostComment from '@/components/commentList/PostComment.vue'
import CommentReplay from '@/components/commentList/CommentReplay.vue'
export default {
  name: 'ArticleIndex',
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
    followUser,
    collectArticle,
    likeArticle,
    commentList,
    PostComment,
    CommentReplay
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  provide: function () {
    return {
      artId: this.articleDetails.art_id
    }
  },
  computed: {
    ftime() {
      const { pubdate } = this.articleDetails
      return dayjs(pubdate).fromNow()
    }
  },
  data() {
    return {
      articleDetails: {},
      loading: true, // 加载中flag
      errstatus: 0,
      followLoading: false,
      totoalCount: 0,
      isShowPostComm: false,
      commentList: [], // 评论列表
      isShowReplayComm: false, // 回复弹层,
      currentComment: ''
    }
  },
  watch: {},
  created() {
    this.getNewsDetails()
  },
  mounted() {},
  methods: {
    replayClick(comment) {
      // console.log(comment)
      // 把从孙子组件传上来的数据给保存 再给子组件
      this.currentComment = comment
      this.isShowReplayComm = !this.isShowReplayComm
    },
    onPostSuccess(data) {
      // 关闭弹层
      this.isShowPostComm = false
      // 把数据放到最前面
      this.commentList.unshift(data.data.new_obj)
    },
    async getNewsDetails() {
      this.loading = true
      try {
        const { data } = await getNewsDetailsAPI(this.articleId)
        // if (Math.random() < 0.5) JSON.parse('vsgfdcfgbvcvfgb') 错误测试
        this.articleDetails = data.data // 接受返回值

        // 初始化图片点击预览
        setTimeout(() => {
          this.PreviewImg()
          // console.log(this.$refs.articleCon)
        }, 0)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errstatus = 404
        }
        console.log(error)
      } finally {
        // 无论请求成功或失败都关闭loading
        this.loading = false
      }
    },
    PreviewImg() {
      const articleCon = this.$refs.articleCon
      const imgdom = articleCon.querySelectorAll('img')
      const images = []
      console.log(imgdom)
      imgdom.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 图片其实位置 index 0开始
            startPosition: index
          })
        }
      })
    }
    // 抽组件
    // async focusOnFn() {
    //   this.followLoading = true

    //   // 关注
    //   try {
    //     if (this.articleDetails.is_followed) {
    //       // 如果关注了就取消关注
    //       await unfollowUserAPI(this.articleDetails.aut_id)
    //     } else {
    //       // 如果没有关注就添加关注
    //       await followUserAPI(this.articleDetails.aut_id)
    //     }
    //     this.articleDetails.is_followed = !this.articleDetails.is_followed
    //   } catch (error) {
    //     console.log(error)
    //     // 用户不能关注自己400报错
    //     if (error.response && error.response.status === 400) {
    //       this.$toast('不能关注自己哦')
    //     }
    //   } finally {
    //     this.followLoading = false
    //   }
    // }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
