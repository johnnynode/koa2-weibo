/**
 * @description 存储配置
 * @author johnnynode
 */

const { isProd } = require('../utils/env')

// redis 配置
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

// mysql 配置
let MYSQL_CONF = {
    port: '3306',
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'koa2_weibo_db'
}

// 线上环境配置
if (isProd) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
    MYSQL_CONF = {
        port: '3306',
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'koa2_weibo_db'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}