<template>
  <div class="update-name">
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { editUserNameAPI } from '@/api'
export default {
  props: {
    value: {
      type: String,
      require: true
    }
  },
  created() {
    // 把父组件上显示的内容在弹出层中显示 然后修改
    this.message = this.value
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$toast('取消')
      this.$emit('close')
    },
    async onClickRight() {
      this.$toast('保存')
      // 发送修改请求
      try {
        await editUserNameAPI(this.message)
      } catch (error) {
        console.log(error)
      }
      // close pop
      console.log(this.message)
      this.$emit('close')
    }
  }
}
</script>

<style></style>
