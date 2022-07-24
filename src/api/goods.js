/**
 * 获取全部的数据
 */
import request from '../utils/request'

/**
 *获取列表数据
 */
function goodsList(type) {
  return request({ url: '/admin/goods/1?tab=' + type, method: 'get' })
}
/**
 * 获取搜索的类型
 * @returns
 */
function getCategoryt() {
  return request({ url: '/admin/category', method: 'get' })
}
export { goodsList, getCategoryt }
