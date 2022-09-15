import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// 使用 vuex-persistedstate 插件 state 持久化
// 1.下载 yarn add vuex-persistedstate@3.2.1
// 2.引入 import createPersistedState from 'vuex-persistedstate'
// 3.调用 [createPersistedState({配置项})]
// 配置项：key：默认是vuex
//       - storage:存储的方式
//       -reducer(state){retuen(指定持久化的数据) }：指定持久化哪些数据
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO_TOKEN',
      reducer({ tokenObj, myChannels, histories }) {
        return { tokenObj, myChannels, histories }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token // 返回一个布尔值
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    },
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },
    /**
     * 搜索历史数组持久话
     * @param {*} histories 删除添加操作后的新新数组
     */
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  },
  actions: {},
  modules: {}
})
