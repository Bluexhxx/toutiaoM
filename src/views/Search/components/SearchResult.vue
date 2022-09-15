<template>
  <div class="allResult">
    <van-list
      v-model="loading"
      @load="getResult"
      :finished="finished"
      finished-text="没有更多了~~"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in resultsLst"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: {
              articleId: item.art_id
            }
          })
        "
      ></van-cell
    ></van-list>
  </div>
</template>

<script>
import { getResultsApi } from '@/api'
export default {
  props: {
    keyWords: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      resultsLst: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResult() {
      // if (Math.random() < 0.5) this.error = true
      try {
        // 发送请求
        const {
          data: {
            data: { results }
          }
        } = await getResultsApi(this.page++, this.perPage, this.keyWords)
        // 保存数据
        if (results.length === 0) this.finished = true
        this.resultsLst = [...this.resultsLst, ...results]
        // 渲染页面
      } catch {
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.allResult {
  height: calc(100vh - 108px - 100px);
  overflow: overlay; // overlay 和auto用法基本一致
}
</style>
