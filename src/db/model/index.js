/**
 * @description 数据模型入口文件, 统筹所有models
 * @author johnnynode
 */

const User = require('./user')
const Blog = require('./Blog')

// const UserRelation = require('./UserRelation')
// const AtRelation = require('./AtRelation')

Blog.belongsTo(User, {
    foreignKey: 'userId'
})

/*
UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId'
})

Blog.hasMany(AtRelation, {
    foreignKey: 'blogId'
})
*/

module.exports = {
    User,
    // UserRelation,
    Blog,
    // AtRelation
}