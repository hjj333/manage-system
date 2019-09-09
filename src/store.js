import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHENTIATED: 'set_authentiated',
  SET_USER: 'set_user'
}
const state = {
  isAuthentiated: false, // 是否注册
  user: {} // 用户信息
}
const getters = {
  user (state) {
    return state.user
  }
}
const mutations = {
  [types.SET_AUTHENTIATED](state, isAuthentiated) {
    if (isAuthentiated) {
      state.isAuthentiated = isAuthentiated
    } else {
      state.isAuthentiated = false
    }
  },
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user
    } else {
      state.user = {}
    }
  }
}
const actions = {
  setAuthentiated({ commit }, isAuthentiated) {
    commit(types.SET_AUTHENTIATED, isAuthentiated)
  },
  setUser({ commit }, user) {
    commit(types.SET_USER, user)
  },
  clearUser({ commit }) {
    commit(types.SET_USER)
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
