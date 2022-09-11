<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar class="nav-bar" :title="$route.meta.title" />
    <!-- /头部导航栏 -->
    <!-- form表单 -->
    <van-form @submit="onSubmit" class="from" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            class="btn"
            v-if="isBtnShow"
            @click="onSendCode"
            round
            size="small"
            native-type="button"
            >发送验证码</van-button
          >
          <van-count-down
            :time="3 * 1000"
            format="ss秒"
            v-else
            @finish="isBtnShow = true"
          />
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
import { mobileRules, codeRules } from './rule'
import { loginApi, getCodeApi } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobileRules,
      codeRules,
      mobile: '',
      code: '',
      isBtnShow: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']), // 映射vuex mutations
    //  vant submit事件 只有表单校验通过才能触发
    async onSubmit(values) {
      // 提示文案
      this.loading()
      // 调用api 发送登录请求
      try {
        const {
          data: { data }
        } = await loginApi(this.mobile, this.code)
        console.log(data)
        // 拿到token 存入 vuex
        this.SET_TOKEN(data)
        // this.$store.commit('SET_TOKEN', data)
        this.$router.push('/profile') // 先路由跳转
        this.$toast.success('登陆成功') // 在显示登录成功
      } catch (err) {
        // 细分错误提示用户
        if (err.response && err.response.status === 400) {
          const msg = err.response.data
          this.$toast.fail(msg)
        } else {
          // console.dir(err)
          this.$toast.clear()
          throw err
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSendCode() {
      // 0.验证是否输入有效手机号
      await this.$refs.form.validate(['mobile'])
      this.loading()
      // 发送请求
      try {
        await getCodeApi(this.mobile)
        this.$toast.success('获取验证码成功')
        this.isBtnShow = false
      } catch (error) {
        if (
          // ? ? 一个问号可选链操作符 问号前面是undefined 那不么不会往后取值
          // (error.response && error.response.status === 429)
          (error.response?.status === 429) ||
          error.response.status === 404
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
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
  .btn {
    height: 0.64rem;
    color: black;
    background-color: #eee;
  }
}

/* /表单样式 */
</style>
