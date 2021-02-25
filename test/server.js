/**
 * @description jest http
 * @author johnnynode
 */

const request = require('supertest')
const server = require('../src/app').callback() // 执行app的callback函数

module.exports = request(server)