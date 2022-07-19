export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo || '',
  isCollapse: (state) => state.user.isCollapse,
  menuList: (state) => state.permission.menuList
}
