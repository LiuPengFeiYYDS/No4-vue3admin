import { login, getUserInfo } from '../../api/user'
import { setItem, getItem } from '../../utils/storage'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: '',
    isCollapse: false
  },
  mutations: {
    SET_TOKEN(state, res) {
      state.token = res
      setItem('token', res)
    },
    SET_USER_INFO(state, res) {
      state.userInfo = res
    },
    UP_ISCOLLAPSE(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {
    async handleLogin({ commit }, params) {
      const res = await login(params)
      // console.log(res)
      commit('SET_TOKEN', res.token)
      return res
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      // console.log('1111', res)
      commit('SET_USER_INFO', res)
      return res
    }
  }
}
