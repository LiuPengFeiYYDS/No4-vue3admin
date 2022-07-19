/**
 * 支付信息的接口
 *
 */
import request from '../utils/request'

function statistics1() {
  return request({ url: '/admin/statistics1', method: 'get' })
}
function statistics2() {
  return request({ url: '/admin/statistics2', method: 'get' })
}
// // 退出登录
// function logOut() {
//   return request({ url: '/admin/logout', method: 'post' })
// }
export { statistics1, statistics2 }
