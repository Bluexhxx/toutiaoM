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
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- 频道编辑组件 -->
      <channel-edit
        v-if="isShow"
        @change-active=";[(isShow = false), (active = $event)]"
        :my-channels="channels"
        @del-myChannel="delChannelFn"
        @add-channel="addChannelFn"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
// 数据持久化方案
// 1.用户登录了 + 在线上服务器操作
// 2.用户未登录路 ，获取默认的频道数据 + 在本地存储操作的频道数据
import { getChannelApi, deleteChannelApi, addChannelApi } from '@/api'
import ArticleList from '@/components/ArticleList.vue'
import ChannelEdit from '@/views/Home/components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      active: 1,
      channels: [],
      isShow: false
    }
  },
  created() {
    // this.getChannel()
    this.initChannels()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    initChannels() {
      if (this.isLogin) {
        // 1.如果用户登录了
        // - channels应该发请求获取用户自己的频道
        this.getChannel()
      } else {
        // 2.没有登录就获取本地存储的频道
        // 判断本地是否有频道数据
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channels = myChannels
        }
      }
    },
    ...mapMutations(['SET_MY_CHANNELS']),
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
    },
    async delChannelFn($event) {
      // 1.发起请求删除接口
      try {
        // 如果用户登录了
        const newChannels = this.channels.filter((item) => item.id !== $event)
        if (this.isLogin) {
          // 操作线上的用户频道数据
          await deleteChannelApi($event)
        } else {
          this.SET_MY_CHANNELS(newChannels)
          // 在本地存储 频道数据
        }
        // 2.视图层删除频道
        this.channels = newChannels
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请先登录，无法删除')
        } else {
          throw error
        }
      }
    },
    async addChannelFn(channel) {
      try {
        if (this.isLogin) {
          await addChannelApi(channel.id, this.channels.length)
        } else {
          // 本地存储
          // 存操作后的最新的channels 数据
          // 用vue state 持久化插件 同步到localstorage
          this.SET_MY_CHANNELS([...this.channels, channel])
        }
        // 1.视图层添加频道
        this.channels.push(channel)
        // 2.发起请求添加接口
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('先登录再添加')
        } else {
          throw error
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
