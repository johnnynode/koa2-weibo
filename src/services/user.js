/**
 * @description user service
 * @author johnnynode
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    // 查询
    const result = await User.findOne({
            attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
            where: whereOpt
        })
        // 未找到原值返回
    if (!result) {
        return result
    }

    // 查到了，格式化并返回
    return formatUser(result.dataValues)
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName, // 是否这样，按需求来
        gender
    })
    const data = result.dataValues
    return data
}

module.exports = {
    getUserInfo,
    createUser
}