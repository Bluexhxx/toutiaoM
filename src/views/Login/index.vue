<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar class="nav-bar" :title="$route.meta.title" />
    <!-- /头部导航栏 -->
    <!-- form表单 -->
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern: mobilePa,
            message: '手机号格式错误'
          }
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          {
            pattern: /[0-9]{6}/,
            message: '验证码格式错误'
          }
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button size="small" color="#ededed">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- /form表单 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobilePa:
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      mobile: '',
      code: ''
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style scoped lang="less">
// 加了scoped 无法修改其他组件的样式 使用:deep()
// :deep() vue-cli 提供的深度选择器
/* 头部样式 */
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #ffffff;
  }
}
/* /头部样式 */

/* 表单样式 */
:deep(.from) {
  .van-cell__title {
    flex: 1;
    .toutiao {
      font-size: 37px;
    }
  }
  .van-cell__value {
    flex: 20;
  }
}
/* /表单样式 */
</style>
