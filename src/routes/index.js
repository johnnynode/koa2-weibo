const router = require('koa-router')()

router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async(ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async(ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

router.get('/json2', async(ctx, next) => {
    const session = ctx.session
    if (!session.viewNum) {
        session.viewNum = 0
    }
    let viewNum = ++session.viewNum
    ctx.body = {
        title: 'koa2 json',
        viewNum
    }
})

module.exports = router