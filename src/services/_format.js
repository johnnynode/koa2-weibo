/**
 * @description 数据格式化
 * @author johnnynode
 */

const { DEFAULT_PICTURE } = require('../conf/constants')

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

module.exports = {
    formatUser
}