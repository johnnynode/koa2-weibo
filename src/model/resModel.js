/**
 * @description res 的数据模型
 * @author johnnynode
 */

/**
 * 基础模块
 */
class BaseModel {
    constructor({ errno, data, message }) {
        // 我们约定：errno 如果是正确的代码会有data, 如果是错误的代码会有message, 如下
        /*
        // 正确版
        { errno: 0, data: {...} }
        // 错误版
        { errno: 10001, message: 'xxx' }
        */

        this.errno = errno
        data && (this.data = data)
        message && (this.message = message)
    }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({
            errno: 0,
            data
        })
    }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
    constructor({ errno, message }) {
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}