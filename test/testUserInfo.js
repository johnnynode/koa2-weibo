/**
 * @description 单元测试的用户信息
 * @author johnnynode
 */

/**
 * 这里是测试时的配置文件
 * 【特别提醒】cookie 是用户的敏感信息，此处只能是**测试**用户的 cookie
 * 每次测试用户重新登录，都需要更新这里的 cookie
 * 执行 npm run dev 打开页面 localhost: 3000 进行登录，找到页面上的cookie, 用于更新
 * 这里的用户名和cookie注意，有必要可以从数据库中获取ID
 */

module.exports = {
    Z_ID: 1,
    Z_USER_NAME: 'zhangsan',
    Z_COOKIE: 'weibo.sid=164DT3t6EMLEtPQgMDMrEBJ1NovHUVs_; weibo.sid.sig=bhyD0l3c9ZXa7voZ3aBbqQo84AQ;',
}