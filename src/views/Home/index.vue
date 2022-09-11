<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="diy-nav-bar">
      <template #title>
        <van-button type="default" icon="search" round block>搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道及文章展示 -->
    <van-tabs v-model="active" swipeable>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表组件 -->
        <article-list :id="channel.id"></article-list>
        <!-- /文章列表组件 -->
      </van-tab>
      <span class="toutiao toutiao-gengduo"></span>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelApi } from '@/api'
import ArticleList from '@/components/ArticleList.vue'
export default {
  components: { ArticleList },
  data() {
    return {
      active: 1,
      channels: []
    }
  },
  created() {
    this.getChannel()
  },
  methods: {
    async getChannel() {
      try {
        const {
          data: {
            data: { channels }
          }
        } = await getChannelApi()
        this.channels = channels
      } catch (error) {
        // 507
        if (!error.response) {
          throw error
        } else {
          // const status = error.response.status
          error.response?.status === 507 && this.$toast.fail('服务端异常请刷新')
          // ??  相当于 ||
          // status === 507 && this.$toast.fail('服务端异常请刷新')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.diy-nav-bar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
    height: 0.85333rem;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
