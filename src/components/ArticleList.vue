<template>
  <div class="diy-articl">
    <!-- @load 事件 滚动条与底部距离小于 offset 时触发 -->
    <!-- offset 属性 滚动条与底部距离小于 offset 时触发load事件 默认值是300-->
    <!-- immediate-check 属性 初渲染的时候是都执行load事件 -->

    <!-- v-model="loading" 初始值给false load 事件会被触发，然后loading变量在load事件执行后
    被van-list 自动设置为true就不能执行下一次load事件， 需要手动设置为false 是否处于加载状态，加载过程中不触发load事件 -->
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了~"
      >
        <article-item
          v-for="article in articles"
          :key="article.art_id"
          :article="article"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesApi } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: { ArticleItem },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      loading: false,
      preTimeStamp: '',
      finished: false,
      error: false,
      refreshing: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        // new Date().valueof()
        // +new Date()
        const { data } = await getArticlesApi(this.id, Date.now())
        this.articles = data.data.results
        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        // js 错误 507错误 直接上抛 400 上抛中文
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          throw new Error(error.response.data.message)
        }
      }
    },
    async getNextPageArticle() {
      try {
        // 1.发送请求获取下一页文章
        const { data } = await getArticlesApi(this.id, this.preTimeStamp)

        // 5.判断是否还有下一页文章
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 如果是下拉刷新把数据放在前面
        // 如果是下滑加载就把数组放在后面
        // 2.添加到articles
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        // 3.更新时间戳
        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // finally 语句一定会执行
        // 4.更改loading 解决并发问题
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// !! 如何给盒子设置自己的滚动条 1、给盒子设置固定的高度 2、overflow：auto/scroll/overlay
.diy-articl {
  height: calc(100vh - 92px - 82px - 100px);
  overflow: scroll;
  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  //  修改滚动条的样式
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
