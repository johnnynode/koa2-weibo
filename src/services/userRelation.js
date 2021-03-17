/**
 * @description 用户关系 services
 * @author johnnynode
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')

/**
 * 获取粉丝列表
 * @param {number} followId 被关注人的 id
 */
async function getUsersByFollowId(followId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [{
            model: UserRelation,
            where: {
                followId,
                userId: {
                    [Sequelize.Op.ne]: followId
                }
            }
        }]
    })

    // result.count 总数
    // result.rows 查询结果，数组

    // 格式化
    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)

    return {
        count: result.count,
        userList
    }
}

/**
 * 获取关注人列表
 * @param {number} userId userId
 */
async function getFollowByUserId(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [{
            model: User,
            attributes: ['id', 'userName', 'nickName', 'picture']
        }],
        where: {
            userId,
            followId: {
                [Sequelize.Op.ne]: userId
            }
        }
    })

    // result.count 总数，result.rows 查询结果，数组，加工数据
    let userList = result.rows.map(row => row.dataValues)
    userList = userList.map(item => {
        let user = item.user
        user = user.dataValues
        user = formatUser(user)
        return user
    })

    return {
        count: result.count,
        userList
    }
}

/**
 * 添加关注关系
 * @param {number} userId 用户 id
 * @param {number} followId 被关注用户 id
 */
async function addFollow(userId, followId) {
    const result = await UserRelation.create({
        userId,
        followId
    })
    return result.dataValues
}

/**
 * 删除关注关系
 * @param {number} userId 用户 id
 * @param {number} followId 被关注用户 id
 */
async function deleteFollow(userId, followId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followId
        }
    })
    return result > 0
}

module.exports = {
    getUsersByFollowId,
    addFollow,
    deleteFollow,
    getFollowByUserId
}