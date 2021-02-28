# koa2-weibo

### 技术选型

- 框架和库
    * koa2
    * ejs
    * jest test
- 存储
    * mysql
    * sequeize
    * 连表 & 多模型
- 用户认证
    * session
    * redis 缓存
    * jwt
- 线上环境
    * PM2
    * nginx
    * 日志处理

### 技术方案设计

- 架构设计
- 接口和路由设计
- 数据表和存储模型

### 架构设计

- 前端
    * controller
        * 业务逻辑
        * 返回格式
    * routes
        * view ejs
        * API
        * 校验
- 后端
    * service
        * 数据处理
        * 格式化
    * mysql db sequelize
        * 定义模型
        * 封装操作
    * redis cache
        * 公共信息
    * 日志处理

### 功能开发

- 用户：登录，注册，用户设置，粉丝和关注
- 微博：发布，列表(首页，个人主页，广场页)
- @功能：@xx, 回复，接受@我的消息

### 部署方式

- 1 ) 大公司：自研上线平台，专业团队维护，指定规范，傻瓜式操作
- 2 ) git 服务添加 webhook, 合并master自动触发部署
- 3 ) 使用pm2 deploy, 手动将本地代码部署线上 (本项目选择这个)

### 线上环境

- pm2 和 多进程
    * cnpm i -g pm2
    * npm run prd
    * pm2 --version
    * pm2 list
    * pm2 restart www
    * pm2 stop www
    * pm2 delete www
    * pm2 info www
    * pm2 log www
    * pm2 monit www
- nginx和反向代理
- 日志记录

### 最佳实践

- 项目结构
- 错误处理
- 代码风格
- 质量保证
- 安全
- 线上环境

### 总结

- 系统设计思路
- 分层思路
- 接口设计思路
- 数据建模思路