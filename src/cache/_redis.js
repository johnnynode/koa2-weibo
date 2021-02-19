/**
 * @description 连接 redis 方法：get set
 * @author johnnynode
 */

const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', err => {
    console.error('redis error: ', err);
});

/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位s
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val); // 设置键值
    redisClient.expire(key, timeout); // 为改键设置过期时间
}

/**
 * redis get
 * @param {*} key 键
 */
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            if (val == null) {
                resolve(null);
                return;
            }
            try {
                resolve(JSON.stringify(val));
            } catch (e) {
                resolve(val);
            }
        });
    });
    return promise;
}

/**
 * redis get
 * @param {string} key 键
 */
async function get1(key) {
    const val = await redisClient.get(key); // 省略回调函数试下 【备忘】
    return val;
}

module.exports = {
    set,
    get
}