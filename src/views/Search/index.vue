<template>
  <div>
    <!-- 包一层form 兼容iphone 确认按钮 -->
    <form action="/">
      <van-search
        class="diy-search"
        v-model.trim="keyWords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-result></search-result> -->

    <component
      @change-keywords="onSearch"
      :is="componentName"
      :keyWords="keyWords"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResult },
  data() {
    return {
      keyWords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 用输入框关键字为空 显示搜索历史组件
      // 声明一个变量isShowSearchResult 显示搜索结果 在search事件触发变为true
      // 否则显示搜索建议
      // !!  @focus="isShowSearchResult = false"
      // 绑定一个聚焦事件 获取焦点时
      if (this.keyWords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keyWords) {
      if (keyWords === '') return
      const newhistories = [...new Set([keyWords, ...this.histories])]
      this.SET_HISTORIES(newhistories)
      this.keyWords = keyWords
      // 显示搜索结果
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.diy-search {
  [role='button'] {
    color: #fff;
    background-color: #3296fa;
  }
}
</style>
