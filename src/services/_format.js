/**
 * @description 数据格式化
 * @author johnnynode
 */

const { DEFAULT_PICTURE } = require('../conf/constants')
const { timeFormat } = require('../utils/dt')

/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 */
function _formatUserPicture(obj) {
    if (!obj.picture) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list) {
    if (!list) {
        return list
    }
    // 数组 用户列表, 处理头像，当然也可能处理其他信息，后续可以添加
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }

    // 单个对象
    return _formatUserPicture(list)
}

/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
    if (!list) {
        return list
    }

    if (list instanceof Array) {
        // 数组
        return list.map(_formatDBTime)
    }
    // 对象
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
}

module.exports = {
    formatUser,
    formatBlog
}