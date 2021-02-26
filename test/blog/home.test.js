/**
 * @description 首页 test
 * @author johnnynode
 */

const server = require('../server')

// 用户信息 用户用户的登录功能
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

// 存储 cookie
let COOKIE = ''

// 存储微博 id
let BLOG_ID = ''


/********************** 前置任务 到删除博客再说 *************************/

/*
// 注册
test('注册一个用户，应该成功', async() => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).toBe(0)
})

// 登录
test('登录，应该成功', async() => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName,
            password
        })
    expect(res.body.errno).toBe(0)

    // 获取 cookie
    COOKIE = res.headers['set-cookie'].join(';')
})
*/



test('创建一条微博，应该成功', async() => {
    // 定义测试内容
    const content = '单元测试自动创建的微博_' + Date.now()
    const image = '/xxx.png'

    // 开始测试
    const res = await server
        .post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    // 记录微博 id
    BLOG_ID = res.body.data.id
})

// json schema 检测
test('json schema 检测，非法的格式，注册应该失败', async() => {
    //输出随机字符串
    const randStr = () => Math.random().toString(36).substr(2);
    //字符串调整为len位
    const supplyFunc = (str, len) => {
        if (str.length > len) return str.substr(0, len);
        if (str.length < len) return supplyFunc(str + randStr(), len);
        return str;
    }

    const res = await server
        .post('/api/blog/create')
        .send({
            content: '无所谓这里是TEXT',
            image: supplyFunc(randStr(), 256),
        })
    expect(res.body.errno).not.toBe(0)
})

/********************** 后置任务 *************************/

/*
// 删除
test('删除用户，应该成功', async() => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE) // 通过上面的cookie信息模拟登录
    expect(res.body.errno).toBe(0)
})

// 退出
test('退出登录应该成功', async() => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})
*/