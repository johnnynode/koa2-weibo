/**
 * @description sequelize 实例
 * @author johnnynode
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { host, user, password, database } = MYSQL_CONF
const { isProd, isTest } = require('../utils/env')

const config = {
    host,
    dialect: 'mysql' // 声明操作mysql
}

// 测试环境：关闭打印sql功能
if (isTest) {
    config.loggin = () => {}
}

// 线上环境：连接池配置
if (isProd) {
    config.pool = {
        max: 5, // 连接池中最大的连接数量，可以通过分析日志，看响应时间长短来判断用多少数量
        min: 0, // 最小连接数量
        idle: 10000 // 如果一个连接 10s之内没被使用则释放
    }
}

const seq = new Sequelize(database, user, password, config)

module.exports = seq