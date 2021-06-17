// 导入express模块用于创建服务器
const express = require('express')

// 导入 path 模块用于处理文件路径
const path = require('path')

// 导入 cors 模块用于处理跨域资源共享
const cors = require('cors')

// 导入body-parser 模块用于获取普通 post 请求参数
// const bodyParser = require('body-parser')
const bodyParser = require('body-parser')

// 导入连接数据库模块
const connection = require('./mysql/connection')

// 导入接口的路由中间件函数,并进行解构
const { eatRouter } = require('./router/eat')
const { todoListRouter } = require('./router/todolist')

// 导入上传文件的路由
const uploadFile = require('./router/uploadFile')
// const { request, response } = require('express')

// 创建一个服务器
const app = express()

// 把服务器的views 和 uploads 文件夹做静态资源管理
// http://127.0.0.1:3001/index.html  访问 views 文件夹下的 index.html 文件
app.use(express.static(path.join(__dirname, './view')))
// http://127.0.0.1:3001/default.png  访问到 uploads文件夹的 default.png 文件
// app.use(express.static(path.join(__dirname, './uploads')))

// 配置 cors 中间件，实现跨院资源共享
app.use(cors())

// 配置 bodyParse 中间件，实现post请求参数获取
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 测试代码
// app.post('/register', (request, response) => {
//     const { body } = request
//     console.log(body);
// })


app.use(eatRouter)
app.use(todoListRouter)
app.use(uploadFile)

// 记得放在路由后面
app.use((error, request, response, next) => {
    // console.log(error);
    // 如果状态码是 500 服务器问题
    response.status(500).send({ status: 500, msg: "服务器异常" });
})

// 如果上面所有的路由都匹配不上，类似我们之前的之前分支结构最后的 else
app.use((request, response) => {
    response.status(404).json({ status: 404, msg: '资源找不到' });
})

// 监听服务器
app.listen(3001, () => console.log('服务器开启成功  http://127.0.0.1:3001'))