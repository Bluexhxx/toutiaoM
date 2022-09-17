<template>
  <div>
    <van-picker
      title="更改性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { editUserGenderAPI } from '@/api'
export default {
  props: {
    value: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm(value, index) {
      // 发请求修改后的性别
      try {
        await editUserGenderAPI(index)
      } catch (error) {
        console.log(error)
      }
      this.$emit('input', index)
      // 关闭弹出层
      this.$emit('close')
      console.log(value, index)
    }
  }
}
</script>

<style></style>
