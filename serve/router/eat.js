const express = require('express')

// 导入对数据库增删改查的方法模块,并进行结构，方便后续使用
const { getEat, updataEat } = require('../mysql/model')

// 创建路由中间件函数，用户管理食物类的接口
const eatRouter = express.Router()

// 获取所有食物数据
eatRouter.get('/getEatList', (request, response) => {
    getEat((err, results) => {
        // console.log(results);
        if (err) {
            response.json({ status: 400, desc: '操作失败' })
        } else {
            response.json({ status: 200, desc: '操作成功', data: results })
        }
    })
})

// 更新食物数据
eatRouter.post('/updateEat', (request, response) => {
    const { body } = request;
    updataEat(body, (err, res) => {
        if (!err) {
            response.json({ status: 200, desc: '操作成功', data: res })
        } else {
            response.json({ status: 400, desc: '操作失败' })
        }
    })
})


module.exports = {
    eatRouter
}