/**
 * @description json schema 校验
 * @author johnnynode
 */

// const Ajv = require('ajv') // version 7 前面版本的写法
const Ajv = require('ajv').default // version 7的写法
const ajv = new Ajv({
    // allErrors: true // 输出所有的错误（比较慢）, 注释掉找到一个错误就返回，效率较高些
})

/**
 * json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate