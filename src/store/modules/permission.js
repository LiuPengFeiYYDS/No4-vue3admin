import filtersMenus from '../../utils/menu'
import filterRoutes from '../../utils/router'

export default {
  namespaced: true,
  state: {
    menuList: []
  },
  mutations: {
    SET_MENU_LIST(state, menu) {
      menu.forEach((item) => {
        state.menuList.push(item)
      })
    }
  },
  actions: {
    filterRoutes({ commit }, menus) {
      const menu = filtersMenus(menus)
      commit('SET_MENU_LIST', menu)
      const route = filterRoutes(menu)
      // console.log(route)
      return route
    }
  }
}
