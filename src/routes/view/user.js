/**
 * @description user view 路由
 * @author johnnynode
 */

const router = require('koa-router')()
router.prefix('/user') // 配置用户相关前缀

/**
 * 获取登录信息
 * @param {Object} ctx ctx
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin: false // 默认未登录
    }

    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }

    return data
}

router.get('/login', async(ctx, next) => {
    await ctx.render('user/login', getLoginInfo(ctx))
})

router.get('/register', async(ctx, next) => {
    await ctx.render('user/register', getLoginInfo(ctx))
})

module.exports = router