import { getItem, setItem } from '../../utils/storage'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    tagsList: getItem('tagsList') || [{ path: '/', title: '后台首页' }]
  },
  mutations: {
    ADD_TAG(state, obj) {
      let flag = false
      state.tagsList.forEach((v) => {
        if (v.path === obj.path) {
          flag = true
        }
      })

      if (!flag) {
        state.tagsList.push(obj)
        setItem('tagsList', state.tagsList)
      }
    },
    DEL_TAG(state, path) {
      state.tagsList = state.tagsList.filter((v) => {
        return v.path !== path
      })
      setItem('tagsList', state.tagsList)
    },
    HANDLE_CLOSE_OTHER(state, path) {
      state.tagsList = state.tagsList.filter((v) => {
        return v.path === path
      })
      state.tagsList.forEach((v) => {
        if (v.path !== '/') {
          state.tagsList.unshift({ path: '/', title: '后台首页' })
        }
      })

      setItem('tagsList', state.tagsList)
    },
    HANDLE_CLOSE_ALL(state) {
      state.tagsList = state.tagsList.filter((v) => {
        return v.path === '/'
      })
      setItem('tagsList', state.tagsList)
      router.push('/')
    }
  },
  actions: {
    addTag({ commit }, obj) {
      commit('ADD_TAG', obj)
    },
    delTag({ commit }, path) {
      commit('DEL_TAG', path)
    },
    handleCloseOther({ commit }, path) {
      commit('HANDLE_CLOSE_OTHER', path)
    },
    handleCloseAll({ commit }) {
      commit('HANDLE_CLOSE_ALL')
    }
  }
}
