/**
 * @description utils api 路由
 * @author johnnynode
 */

const router = require('koa-router')()
const koaFrom = require('formidable-upload-koa')
const { loginCheck } = require('../../middlewares/loginChecks')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

/**
 * 关于文件上传，其实在上线的时候需要进行统一文件服务
 * 也就是如果我们的服务分多进程或多机器运行，上传文件如何统一
 * 常用的方式是建立一个统一的文件服务系统
 * 我们的项目来调用文件服务系统的服务
 * 这里是我们自行实现的写法
 */
// 上传图片
router.post('/upload', loginCheck, koaFrom(), async(ctx, next) => {
    const file = ctx.req.files['file']
    if (!file) {
        return
    }
    const { size, path, name, type } = file
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    })
})

module.exports = router