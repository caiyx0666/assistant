// 导入数据库MySQL数据库
const mysql = require('mysql')

// 创建(注册)数据库连接
const connection = mysql.createConnection({
    // 数据库服务器地址
    host: 'localhost',
    // 数据库用户名
    user: 'root',
    // 数据库密码
    password: '123456',
    // 数据库名称
    database: 'assistant'
})

// 连接数据库
connection.connect((err) => {
    if (err) {
        console.log('连接失败，请检查用户名，密码，数据库名称是否正确');
    } else {
        console.log('连接成功');
    }
})

module.exports = {
    connection
}