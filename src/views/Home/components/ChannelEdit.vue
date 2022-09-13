<template>
  <div class="diy-channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        class="diy-btn"
        round
        type="danger"
        size="mini"
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 频道宫格 -->
    <div class="my-pannel">
      <van-grid :column-num="4" :gutter="10">
        <van-grid-item
          :class="{ active: item.name === '推荐' }"
          v-for="(item, index) in myChannels"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handleMyChannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <!-- 频道宫格 -->
    <div class="recommend-pannel">
      <van-grid :column-num="4" :gutter="10">
        <van-grid-item
          v-for="item in recomdChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsApi } from '@/api'
export default {
  props: {
    myChannels: { type: Array }
  },
  created() {
    this.getAllChannels()
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsApi()
      this.allChannels = data.data.channels
    },
    handleMyChannel({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        console.log('删除' + name)
      } else {
        // 不是编辑状态直接跳转到对相应的频道下
        // 触发定义在父组件中的事件
        // 改变isShow 实现弹出层关闭
        // 改变active 实现tab频道切换
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recomdChannels() {
      // 我的频道里看一下有没有 全部频道item 有就return false
      return this.allChannels.filter((allItem) => {
        // filter 返回数组 true 的那一项存入数组
        return !this.myChannels.find((myItem) => myItem.id === allItem.id)
        // 目标是undefined 没找到就返回undefined
      })
    }
  }
}
</script>

<style scoped lang="less">
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.diy-channel-edit {
  padding-top: 92px;
  .diy-btn {
    width: 100px;
    font-size: 25px;
  }
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
