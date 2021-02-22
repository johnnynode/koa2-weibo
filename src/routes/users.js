const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) // 将jwt验证方法转换为promise形式
const { SECRET } = require('../conf/constants')

router.prefix('/users')

router.get('/', function(ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function(ctx, next) {
    ctx.body = 'this is a users/bar response'
})

// 模拟登陆过程
router.post('/login', function(ctx, next) {
    const { userName, password } = ctx.request.body
    let user

    // 模拟登陆
    if (userName == 'a' && password == 'b') {
        // 登陆成功，获取用户信息
        user = {
            userId: 1,
            userName: 'a',
            nickName: 'a',
            gender: 1 // 男
        }
    }
    if (!user) {
        ctx.body = {
            errno: -1,
            msg: '登陆失败'
        }
        return
    }
    // jwt加密用户信息 签发token
    let token = jwt.sign(user, SECRET, { expiresIn: '1h' })
    ctx.body = {
        errno: 0,
        data: token
    }
})

// 消费token获取用户信息
router.get('/getUserInfo', async function(ctx, next) {
    const token = ctx.header.authorization // 注意是小写
    try {
        let payload = await verify(token.split(' ')[1], SECRET) // 注意这里分隔符是空格，规定否则报错
        ctx.body = {
            errno: 0,
            data: payload
        }
    } catch (ex) {
        ctx.body = {
            errno: -1,
            msg: 'verify token failed'
        }
    }
})

module.exports = router