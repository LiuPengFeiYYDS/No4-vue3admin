/**
 * 登陆的封装接口
 *
 */
import request from '../utils/request'

function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}
function getUserInfo() {
  return request({ url: '/admin/getinfo', method: 'post' })
}
// 退出登录
function logOut() {
  return request({ url: '/admin/logout', method: 'post' })
}
export { login, getUserInfo, logOut }
