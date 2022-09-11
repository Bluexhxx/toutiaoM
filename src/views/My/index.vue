<template>
  <div class="diy-profile">
    <!-- 头部 -->
    <header>
      <!-- 登录的结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row type="flex" align="center">
          <van-col span="12">
            <van-row type="flex" justify="space-around" align="center">
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />
              <span class="userName">11121324</span>
            </van-row>
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="6">
            <van-button round class="diy-eidt-btn">编辑资料</van-button>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="diy-grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>0</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>0</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>0</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>0</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录的结构 -->
      <div class="logout banner" v-else>
        <van-image width="60" :src="mobileImg" />
        <p class="text" @click="$router.push('/login')">登录 / 注册</p>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid :column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="diy-group">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <van-button block type="default" v-if="isLogin" @click="logOutFn"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileImg from '@/assets/images/mobile.png'
export default {
  data() {
    return {
      mobileImg
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    async logOutFn() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style scoped lang="less">
.diy-profile {
  background: #f5f7f9;
  height: 100vh;
  .diy-group {
    margin: 20px 0;
  }
  .userName{
    color: #fff;
    font-size: 34px;
  }
}
.banner {
  width: 100%;
  height: 5.3333rem;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .text {
    font-size: 30px;
    color: #fff;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .diy-eidt-btn {
    height: 0.8rem;
    font-size: 24px;
  }
  :deep(.diy-grid) {
    .van-grid-item__content {
      background: inherit;
      font-size: 30px;
      color: #fff;

      .van-grid-item__text {
        color: #fff;
      }
    }
  }
}
</style>
