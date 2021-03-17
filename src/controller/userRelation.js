/**
 * @description 用户关系 controller
 * @author johnnynode
 */

const {
    getUsersByFollowId,
    getFollowByUserId,
    addFollow,
    deleteFollow
} = require('../services/userRelation')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { addFollowFailInfo, deleteFollowFailInfo } = require('../conf/errorInfo')

/**
 * 根据 userid 获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans(userId) {
    const { count, userList } = await getUsersByFollowId(userId)

    // 返回
    return new SuccessModel({
        count,
        fansList: userList
    })
}

/**
 * 获取关注人列表
 * @param {number} userId userId
 */
async function getFollow(userId) {
    const { count, userList } = await getFollowByUserId(userId)

    return new SuccessModel({
        count,
        followList: userList
    })
}

/**
 * 关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollow(myUserId, curUserId)
        return new SuccessModel()
    } catch (ex) {
        console.error(ex)
        return new ErrorModel(addFollowFailInfo)
    }
}

/**
 * 取消关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollow(myUserId, curUserId)
    return result ? new SuccessModel() : new ErrorModel(deleteFollowFailInfo)
}

module.exports = {
    getFans,
    getFollow,
    follow,
    unFollow
}