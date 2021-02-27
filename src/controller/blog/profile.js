/**
 * @description 个人主页 controller
 * @author johnnynode
 */

const { getBlogList } = require('../../services/blog')
const { PAGE_SIZE } = require('../../conf/constants')
const { SuccessModel } = require('../../model/resModel')

/**
 * 获取个人主页微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页面
 */
async function getProfileBlogList(userName, pageIndex = 0) {
    const result = await getBlogList({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const blogList = result.blogList

    // 拼接返回数据
    return new SuccessModel({
        isEmpty: !(blogList && blogList.length),
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getProfileBlogList
}