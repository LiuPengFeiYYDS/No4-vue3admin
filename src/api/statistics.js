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
// // 图
function statistics3(type) {
  return request({ url: '/admin/statistics3?type=' + type, method: 'get' })
}
export { statistics1, statistics2, statistics3 }
