<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      ref="birthPicker"
    />
  </div>
</template>

<script>
import { editUserBirthdayAPI } from '@/api'
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      minDate: new Date(1990, 1, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  methods: {
    async onConfirm(value) {
      // 获取更新的时间 修改格式
      const newDate = dayjs(value).format('YYYY-MM-DD')
      // 发请求
      try {
        const { data } = await editUserBirthdayAPI(newDate)
        console.log(data)
      } catch (error) {}
      this.$emit('input', newDate)
      console.log(newDate)
      this.$emit('close')
    }
  }
}
</script>

<style></style>
