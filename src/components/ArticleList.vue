<template>
  <div>
    <article-item v-for="article in articles" :key="article.art_id" :article="article"></article-item>
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
      articles: []
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
        const {
          data: {
            data: { results }
          }
        } = await getArticlesApi(this.id, Date.now())
        this.articles = results
      } catch (error) {
        // js 错误 507错误 直接上抛 400 上抛中文
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          throw new Error(error.response.data.message)
        }
      }
    }
  }
}
</script>

<style></style>
