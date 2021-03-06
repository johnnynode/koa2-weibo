const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const redis = require('koa-redis')
const session = require('koa-generic-session')
const kjwt = require('koa-jwt')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY, JWT_SECRET_KEY } = require('./conf/secretKeys')

/*
// 配置koa-jwt中间件
app.use(kjwt({
    secret: JWT_SECRET_KEY
}).unless({
    path: [/^\/user\/login/] // 忽略jwt验证的路由
}))
*/

// api 相关路由整理
const apiUserRouter = require('./routes/api/user') // api user
const {
    Home: apiBlogHomeRouter,
    Profile: apiBlogProfileRouter,
    Square: apiBlogSquareRouter,
    At: apiBlogAtRouter,
} = require('./routes/api/blog') // api blog
const apiUtilsRouter = require('./routes/api/utils') // api utils

// view 相关路由整理
const viewUserRouter = require('./routes/view/user') // view user
const viewBlogRouter = require('./routes/view/blog') // view blog
const viewErrorRouter = require('./routes/view/error') // 404或错误

// 错误处理配置
let onerrorConf = {}
if (isProd) {
    onerrorConf = {
        redirect: '/error'
    }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// 注册路由之前要注册session
app.keys = [SESSION_SECRET_KEY] // 用于加密cookie的字符串, 随便写一个
app.use(session({
    key: 'weibo.sid', // cookie name , 默认是 koa.sid
    prefix: 'weibo:sess:', // redis key 的前缀, 默认是 koa:sess, session的简称
    cookie: {
        path: '/',
        httpOnly: true, // 只能服务端修改cookie
        maxAge: 24 * 60 * 60 * 1000 // cookie过期时间1天 单位ms
    },
    // ttl: 24 * 60 * 60 * 1000, // redis的过期时间 这个参数不写，默认和cookie.maxAge保持一致
    store: redis({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}$`,
    })
}))

// 路由配置 api
app.use(apiUserRouter.routes(), apiUserRouter.allowedMethods()) // 用户
app.use(apiBlogHomeRouter.routes(), apiBlogHomeRouter.allowedMethods()) // 微博首页
app.use(apiBlogProfileRouter.routes(), apiBlogProfileRouter.allowedMethods()) // 微博个人页
app.use(apiBlogSquareRouter.routes(), apiBlogSquareRouter.allowedMethods()) // 微博广场页
app.use(apiBlogAtRouter.routes(), apiBlogAtRouter.allowedMethods()) // 微博at
app.use(apiUtilsRouter.routes(), apiUtilsRouter.allowedMethods()) // 工具

// 路由配置 view
app.use(viewUserRouter.routes(), viewUserRouter.allowedMethods()) // 用户
app.use(viewBlogRouter.routes(), viewBlogRouter.allowedMethods()) // 微博
app.use(viewErrorRouter.routes(), viewErrorRouter.allowedMethods()) // error,404路由注册到最后面

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app