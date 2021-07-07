// 导入express模块用于创建服务器
const express = require('express')

// 导入 path 模块用于处理文件路径
const path = require('path')

// 导入 cors 模块用于处理跨域资源共享
const cors = require('cors')

// 导入body-parser 模块用于获取普通 post 请求参数
// const bodyParser = require('body-parser')
const bodyParser = require('body-parser')

// token校验
const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')
// const { vertoken } = require('./token/token_vertify')
const { PRIVITE_KEY } = require('./token/confirm')
// const jwtauth = require('./token/token_vertify')
var vertoken = require('./token/token_vertify');

// 导入接口的路由中间件函数,并进行解构
const { eatRouter } = require('./router/eat')
const { todoListRouter } = require('./router/todolist')
const { accountsRouter } = require('./router/accounts')
const { memoRouter } = require('./router/memo')
const { loginRouter } = require('./router/login')

// 导入上传文件的路由
const uploadFile = require('./router/uploadFile')

// 创建一个服务器
const app = express()

// 把服务器的views 和 uploads 文件夹做静态资源管理
// http://127.0.0.1:3001/index.html  访问 views 文件夹下的 index.html 文件
app.use(express.static(path.join(__dirname, './view')))
// http://127.0.0.1:3001/default.png  访问到 uploads文件夹的 default.png 文件
app.use(express.static(path.join(__dirname, './uploads')))

// 配置 cors 中间件，实现跨院资源共享
app.use(cors())


// 解析token获取用户信息
app.use(function (req, res, next) {
    let url = req._parsedUrl.pathname;
    let whiteUrl = ['/login', '/register']
    
    if (whiteUrl.indexOf(url) !== -1) {
        return next()
    }

    let token = req.headers['authorization'];
    if (!token) {
        return next();
    } else {
        vertoken.verToken(token).then((data) => {
            req.data = data;
            return next();
        }).catch((error) => {
            res.send(error)
            return next();
        })
    }
});


app.use(expressJWT({
    credentialsRequired: false,
    secret: PRIVITE_KEY,
    algorithms: ['HS256']
}).unless({
    path: ['/login', '/register'] // 白名单，除了这里写的地址，其他的URL都需要进行校验
}))


// 配置 bodyParse 中间件，实现post请求参数获取
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(eatRouter)
app.use(todoListRouter)
app.use(accountsRouter)
app.use(memoRouter)
app.use(uploadFile)
app.use(loginRouter)

// 如果上面所有的路由都匹配不上，类似我们之前的之前分支结构最后的 else
app.use((request, response) => {
    response.status(404).json({ status: 404, desc: '资源找不到' });
})

// 当token失效返回提示信息
app.use(function (err, req, res, next) {
    if (err.status == 401) {
        return res.send({status: 401,desc: 'token失效'});
    }
});



// 监听服务器
app.listen(3001, () => console.log('服务器开启成功  http://127.0.0.1:3001'))