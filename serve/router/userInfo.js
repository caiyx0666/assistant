// 引入 express 模块用于创建路由
const express = require('express');

const { getUserInfo } = require('../mysql/model');

// 创建路由
const userRouter = express.Router();

userRouter.post('/getUserInfo', (request, response) => {
    console.log(request.headers['authorization'])
    const { body } = request
    getUserInfo(body, (err, results) => {
        if (!err) {
            response.json({ status: 200, desc: '操作成功', data: results })
        } else {
            response.json({ status: 400, desc: '操作失败' })
        }
    })
})