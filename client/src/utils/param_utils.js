/**
 * 处理url跳转参数
 * @param {string} str 
 */

export default function (str) {
    let arr = str.substr(1).split('=')

    let obj = {}

    arr.forEach((item, index) => {
        if (!index % 2) {
            obj[item] = arr[index + 1]
        }
    })

    return obj
}