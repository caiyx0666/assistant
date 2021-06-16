const express = require('express')
const { request, response } = require('express')
const query = require('querystring')

// 导入对数据库增删改查的方法模块,并进行结构，方便后续使用
const { getEat, updataEat } = require('../model')

// 创建路由中间件函数，用户管理食物类的接口
const eatRouter = express.Router()

// 获取所有食物数据
eatRouter.get('/getEatList', (request, response) => {
    getEat((err, results) => {
        // console.log(results);
        if (err) {
            response.json({ status: 400, msg: '操作失败' })
        } else {
            response.json({ status: 200, msg: '操作成功', data: results })
        }
    })
})

// 更新食物数据
eatRouter.post('/updateEat', (request, response) => {
    const { body } = request;
    console.log(body)
    updataEat(body, (err, res) => {
        if (!err) {
            response.json({ status: 200, desc: '操作成功', data: res })
        } else {
            response.json({ status: 400, msg: '操作失败' })
        }
    })
})

// 根据id删除单个食物
// eatRouter.get('/deleEatById', (request, response) => {
//     // 获取传过来的参数id
//     const { id } = request.query;
//     console.log(id);
//     // 删除单个食物数据
//     deleatById(id, (err, results) => {
//         console.log(results);
//         if (err === null && results.changedRows != 0) {
//             response.json({ code: 200, msg: '删除食物数据成功' })
//         } else {
//             response.json({ code: 400, msg: '删除食物数据失败' })
//         }
//     })
// })

// 添加食物数据
// eatRouter.post('/addeat', (request, response) => {
//     // 获取传过来的参数id
//     const { body } = request;
//     console.log(body);
//     // 删除单个食物数据
//     addeat(body, (err, results) => {
//         console.log(results);
//         if (err === null && results.affectedRows != 0) {
//             response.json({ code: 200, msg: '添加食物数据成功' })
//         } else {
//             response.json({ code: 400, msg: '添加食物数据失败,请传入正确的参数' })
//         }
//     })
// })

// 根据id查找单个食物信息
// eatRouter.get('/geteatById', (request, response) => {
//     // 获取传过来的参数id
//     const { id } = request.query;
//     console.log(id);
//     // 删除单个食物数据
//     geteatById(id, (err, results) => {
//         console.log(results);
//         if (err === null) {
//             response.json({ code: 200, msg: '获取食物数据成功', data: results[0] })
//         } else {
//             response.json({ code: 400, msg: '获取食物数据失败' })
//         }
//     })
// })

module.exports = {
    eatRouter
}