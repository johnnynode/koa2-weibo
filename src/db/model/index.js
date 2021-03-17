/**
 * @description 数据模型入口文件
 * @author johnnynode
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')

Blog.belongsTo(User, {
    foreignKey: 'userId'
})

/* ********** 用户关系表关系处理开始 ********** */
UserRelation.belongsTo(User, {
    foreignKey: 'followId'
})
User.hasMany(UserRelation, {
    foreignKey: 'userId'
})
/* ********** 用户关系表关系处理结束 ********** */

Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followId'
})

Blog.hasMany(AtRelation, {
    foreignKey: 'blogId'
})

module.exports = {
    User,
    Blog,
    UserRelation,
    AtRelation
}