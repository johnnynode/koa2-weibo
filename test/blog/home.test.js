/**
 * @description 首页 test
 * @author johnnynode
 */

const server = require('../server')
const { Z_COOKIE } = require('../testUserInfo')

// 存储微博 id
let BLOG_ID = ''

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
        .set('cookie', Z_COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    // 记录微博 id
    BLOG_ID = res.body.data.id
})

// json schema 检测
test('json schema 检测，非法的格式，注册应该失败', async() => {

    // 工具函数：输出随机字符串
    const randStr = () => Math.random().toString(36).substr(2);
    // 工具函数：字符串调整为len位
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
        .set('cookie', Z_COOKIE)
    expect(res.body.errno).not.toBe(0)
})