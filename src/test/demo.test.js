/**
 * @description test deom
 * @author johnnynode
 */

function sum(a, b) {
    return a + b
}

/**
 * 这个test函数是jest提供的
 * @param {string} des 测试描述
 * @param {string} callback 测试回调函数
 */
test('test demo 1: 10+20=30', () => {
    expect(sum(10, 20)).toBe(30) // 断言工具
})

test('test demo 2: 10+20!=40', () => {
    expect(sum(10, 20)).not.toBe(40) // 断言工具
})