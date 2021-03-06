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
- 页面和路由
    * 注册: /user/register
    * 登录: /user/login
    * 首页: /
    * 个人主页: /profile/:userName
    * at页: /atMe
    * 广场: /square
    * 设置: /user/settings
    * 错误页: /error
    * 404页: /*
- ejs组件
    * 发布博客输入框
    * 博客列表
    * 加载更多
    * 个人信息
    * 粉丝列表
    * 关注人列表
- 通用组件
    * header
    * footer
- API
    * 用户api
        * 登录 /api/user/login
        * 注册 /api/user/register
        * 用户名是否存在 /api/user/isExist
        * 设置
            * 修改个人信息 /api/user/
            * 图片上传 /api/utils/upload
            * 修改密码 /api/user/changePassword
            * 退出登录 /api/user/logout
    * 博客api
        * 首页
            * 创建微博 /api/blog/create 
            * 图片上传 /api/utils/upload 
            * 加载更多 /api/blog/loadMore:pageIndex
        * 个人主页
            * 加载更多 /api/profile/loadMore/:userName/:pageIndex
            * 关注 /api/profile/follow
            * 取消关注 /api/profile/unFollow
        * 广场页
            * 加载更多 /api/square/loadMore/:pageIndex
        * at页
            * 创建微博 /api/blog/create
            * 图片上传 /api/utils/upload
            * 加载更多 /api/atMe/loadMore/:pageIndex  

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
    * npm -t
    * nginx
    * nginx -s reload
    * proxy_pass 反向代理
    * access_log: 在配置文件中找到log_format和access_log
- 日志记录
    * access log
        * 使用nginx记录不推荐nodejs记录(运维更关心)
    * 自定义日志 console.log (pm2记录 开发人员更关心)
    * 错误日志 console.error (pm2记录 开发人员更关心)

### 最佳实践

- 项目结构
    * 分层routes controller cache services db等
    * 抽离中间件, utils, conf等
    * 区分app和www
    * 通过NODE_ENV区分环境
- 错误处理
    * 规范错误数据(错误码 错误信息)
    * 统一错误输出(error页)
    * 对输入数据进行json schema验证
- 代码风格
    * 使用eslint并强制pre-commit
    * 使用jsdoc注释文件和函数
    * async/await编写异步逻辑
    * 规范git分支和commit格式
- 质量保证
    * 编写单元测试
- 安全
    * 处理xss
    * 使用ORM防止sql注入
    * 加密敏感信息如密码
- 线上环境
    * 记录日志
    * 多进程
    * 进程守护
    * nginx代理
    * 分服务(mysql redis等)
    * 系统监控 APM(运维层面)

### 总结

- 系统设计思路
- 分层思路
- 接口设计思路
- 数据建模思路