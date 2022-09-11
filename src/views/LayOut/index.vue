<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 导航区 -->
    <van-tabbar v-model="active" class="diy-foot" route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
          <span>首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
          <span>视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
          <span>问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
          <span>{{ isLogin ? '我的' : '未登录' }} </span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
.diy-foot {
  .van-tabbar-item {
    :deep(.van-tabbar-item__icon) {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      .toutiao {
        font-size: 40px;
      }
      span {
        font-size: 24px;
      }
    }
  }
}
</style>
