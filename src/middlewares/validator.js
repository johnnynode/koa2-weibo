/**
 * @description json schema 验证中间件
 * @author johnnynode
 */

const { ErrorModel } = require('../model/resModel')
const { jsonSchemaFileInfo } = require('../model/errorInfo')

/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFn) {
    // 定义中间件函数
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            // 验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        // 验证成功，继续
        await next()
    }
    // 返回中间件
    return validator
}

module.exports = {
    genValidator
}