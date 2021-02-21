/**
 * @description http test
 * @author johnnynode
 */

const server = require('./server')

test('http 接口返回数据格式正确1', async() => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
})

test('http 接口返回数据格式正确2', async() => {
    const res = await server.get('/json')
    expect(res.body.title).toBe('koa2 json')
})

test('http 接口返回数据3', async() => {
    const res = await server.post('/login').send({
        userName: 'johnnynode',
        password: '123456'
    })

    // TODO
})