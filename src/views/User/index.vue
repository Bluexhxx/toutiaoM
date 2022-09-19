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
    <van-cell
      title="昵称"
      :value="userProfile.name"
      is-link
      @click="isShowUpdateName = !isShowUpdateName"
      @close="isShowUpdateName = false"
    ></van-cell>
    <van-cell
      title="性别"
      :value="userProfile.gender ? '女' : '男'"
      is-link
      @click="isShowGender = !isShowGender"
      @close="isShowGender = false"
    ></van-cell>
    <van-cell
      title="生日"
      :value="userProfile.birthday"
      is-link
      @click="isShowBirthday = !isShowBirthday"
    ></van-cell>
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
      <!-- 昵称修改 -->
    </van-popup>
    <!-- 更改昵称 -->
    <van-popup
      v-model="isShowUpdateName"
      position="bottom"
      :style="{ height: '100%' }"
      @close="getUserProfile()"
    >
      <!-- 这里是弹出层的内容抽成组件 -->
      <update-name
        v-if="isShowUpdateName"
        v-model="userProfile.name"
        @close="isShowUpdateName = false"
      ></update-name>
      <!-- 昵称修改 -->
    </van-popup>

    <!-- 更改性别 -->
    <van-popup
      v-model="isShowGender"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <!-- 这里是弹出层的内容抽成组件 -->
      <upate-gender
        v-model="userProfile.gender"
        @close="isShowGender = false"
      ></upate-gender>
    </van-popup>

    <!-- 更改生日 -->
    <van-popup
      v-model="isShowBirthday"
      position="bottom"
      :style="{ height: '50%' }"
      @open="onOpen"
    >
      <!-- 这里是弹出层的内容抽成组件 -->
      <update-birthday
        :localBirth="userProfile.birthday"
        @close="isShowBirthday = false"
        v-model="userProfile.birthday"
      ></update-birthday>
    </van-popup>
  </div>
</template>

<script>
import { resolveFileToBase64 } from '@/utils/resolveFileBase64'
import UpdateAvator from './cpns/UpdateAvator.vue'
import UpdateName from './cpns/UpdateName.vue'
import UpateGender from './cpns/UpateGender.vue'
import UpdateBirthday from './cpns/UpdateBirthday.vue'
import { getUserProfileAPI } from '@/api'

export default {
  components: { UpdateAvator, UpdateName, UpateGender, UpdateBirthday },
  data() {
    return {
      isShowPhoto: false,
      isShowUpdateName: false,
      isShowGender: false,
      isShowBirthday: false,
      photo: '',
      avator: '',
      userProfile: {}
    }
  },
  created() {
    this.getUserProfile()
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
    },
    async getUserProfile() {
      try {
        const { data } = await getUserProfileAPI()
        this.userProfile = data.data
        console.log(this.userProfile)
      } catch (error) {
        console.log(error)
      }
    },
    onOpen() {
      // this.$refs.birthDate.setValues(this.userProfile.birthday)
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
