const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const redis = require('koa-redis')
const session = require('koa-generic-session')
const { REDIS_CONF } = require('./conf/db')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))
debugger
// 注册路由之前要注册session
app.keys = ['sssdesssiIIIssw#?1wr09902s!$'] // 用于加密cookie的字符串, 随便写一个
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

/*
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
*/

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app