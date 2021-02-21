/**
 * @description 同步数据库
 * @author johnnynode
 */

const seq = require('./seq')

// 测试连接，成功后注释掉，仅用于测试
seq.authenticate().then(() => {
    console.log('ok')
}).catch(() => {
    console.log('err')
})

// 执行同步 force 不想要重新建表，去除force配置即可
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit() // 程序退出
})