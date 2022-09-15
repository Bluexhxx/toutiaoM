<template>
  <div>
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = !isEdit" />
        <div v-else>
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span>
          <span class="diy-done-span" @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <!-- 搜索历史内容 -->
    <van-cell
      v-for="item in histories"
      :key="item"
      :title="item"
      @click="!isEdit && $emit('change-keywords',item)"
    >
      <template #right-icon>
        <van-icon
          v-if="isEdit"
          name="close"
          @click="
            $store.commit(
              'SET_HISTORIES',
              histories.filter((i) => i !== item)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['histories'])
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.diy-done-span {
  padding-left: 10px;
}
</style>
