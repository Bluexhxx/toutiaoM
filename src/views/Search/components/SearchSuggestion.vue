<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in hightLigthSuggestions"
      :key="index"
      @click="$emit('change-keywords',suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
// - new RegExp(字符串,修饰符'ig')

// 字符串的 replace
// - 字符串.replace(正则,函数)
//  - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { debounce } from 'lodash'
import { getSuggestionsApi } from '@/api'
export default {
  props: {
    keyWords: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keyWords: {
      handler: 'getSuggestions',
      immediate: true
    }
  },
  computed: {
    hightLigthSuggestions() {
      // 把搜索推荐的返回数据进行关键词高亮处理 然后遍历渲染
      const reg = new RegExp(this.keyWords, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(reg, (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsApi(this.keyWords)
        this.suggestions = data.data.options.filter(Boolean)
        console.log(this.suggestions)
        // this.suggestions = data.data.options.filters((item) => Boolean(item))
      } catch (error) {
        if (error.response) {
          this.$toast('获取搜索建议事失败')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
