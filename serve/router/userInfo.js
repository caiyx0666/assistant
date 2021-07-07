// 引入 express 模块用于创建路由
const express = require('express');
const jwtauth = require('../token/token_vertify')
const { getUserInfo } = require('../mysql/model');

// 创建路由
const userRouter = express.Router();

userRouter.post('/getUserInfo', (request, response) => {
    let token = request.headers['authorization'];
    jwtauth.verToken(token).then(data => {
        getUserInfo(data, (err, results) => {
            if (!err) {
                let data = { ...results[0] }
                delete data.password
                response.json({ status: 200, desc: '操作成功', data })
            } else {
                response.json({ status: 400, desc: '操作失败' })
            }
        })
    }).catch(err => {
        response.send({status: 401,desc: '无效的token'})
    })
    
})

module.exports = { userRouter}