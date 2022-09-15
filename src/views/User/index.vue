<template>
  <div>
    <van-nav-bar
      class="diy-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 编辑资料 -->
    <!-- 头像显示 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="avator" />
    </van-cell>
    <!-- 编辑头像的弹出层 -->
    <!-- input 原生js accept="" 可以接受的文件类型属性 -->
    <input
      type="file"
      @change="selectPhoto"
      ref="file"
      hidden
      accept=".jpg,.png,.pdf"
    />
    <!-- 更改头像 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 这里是弹出层的内容抽成组件 -->
      <update-avator
        v-if="isShowPhoto"
        :photo="photo"
        :avator.sync="avator"
      ></update-avator>
    </van-popup>
  </div>
</template>

<script>
import { resolveFileToBase64 } from '@/utils/resolveFileBase64'
import UpdateAvator from './cpns/UpdateAvator.vue'
export default {
  components: { UpdateAvator },
  data() {
    return {
      isShowPhoto: false,
      photo: '',
      avator: ''
    }
  },
  methods: {
    async selectPhoto() {
      // 绑定 change 事件选择图片的时机
      // 获取到用户选择的图片的file对象
      const file = this.$refs.file.files[0]
      console.dir(file)
      // file对象装成img，src可识别的属性
      // file对象转成base64
      //   const fr = new FileReader()
      //   fr.readAsDataURL(file)
      //   //   用onload  接受读取的结果
      //   fr.onload = (e) => {
      //     const base64 = e.target.result
      //     console.log(base64)
      //   }
      const base64 = await resolveFileToBase64(file)
      console.log(base64)
      this.photo = base64 // 转为base64 渲染大图
      this.isShowPhoto = true

      //! 解决不能连续选择同一张图片的bug 因为绑定的是change 事件 value 值没有改变
      this.$refs.file.value = ''

      //  关闭弹层
      this.$parent.$parent.isShowPhoto = false
    }
  }
}
</script>

<style scoped lang="less">
.diy-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
