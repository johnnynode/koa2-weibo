/**
 * @description 微博 @ 关系 controller
 * @author johnnynode
 */

const router = require('koa-router')()
const { loginCheck } = require('../../../middlewares/loginChecks')
const { getAtMeBlogList } = require('../../../controller/blog/at')
const { getBlogListStr } = require('../../../utils/blog')

router.prefix('/api/atMe')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async(ctx, next) => {
    let { pageIndex } = ctx.params

    // 转换 number 类型
    pageIndex = parseInt(pageIndex)
    const { id: userId } = ctx.session.userInfo
    const result = await getAtMeBlogList(userId, pageIndex)

    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

module.exports = router