const express = require('express')
const { request, response } = require('express')
const query = require('querystring')
const uuid = require('node-uuid')

// 导入对数据库增删改查的方法模块,并进行结构，方便后续使用
const { getTodoList, updataTodoList, delTodeList, addTodoList } = require('../mysql/model')

// 创建路由中间件函数，用户管理食物类的接口
const todoListRouter = express.Router()

// 获取所有事项
todoListRouter.get('/getTodoList', (request, response) => {
    getTodoList((err, results) => {
        if (err) {
            response.json({ status: 400, desc: '操作失败' })
        } else {
            response.json({ status: 200, desc: '操作成功', data: results })
        }
    })
})

// 添加事项
todoListRouter.post('/addTodoList', (request, response) => {
    const { body } = request
    // 生成唯一标识
    const code = uuid.v1().replace(/-/g, '')
    const createTime = new Date().getTime()
    let obj = {
        content: body.content,
        createTime,
        code,
        finish: 0
    }
    addTodoList(obj, (err, results) => {
        if (!err) {
            response.json({ status: 200, desc: '操作成功', data: results })
        } else {
            response.json({ status: 400, desc: '操作失败' })
        }
    })
})

// 删除事项
todoListRouter.post('/delTodoList', (request, response) => {
    const { codes } = request.body
    delTodeList(codes, (err, results) => {
        if (!err) {
            response.json({ status: 200, desc: '操作成功', data: results })
        } else {
            response.json({ status: 400, desc: '操作失败' })
        }
    })
})

// 更新今日事项
todoListRouter.post('/updataTodoList', (request, response) => {
    const { body } = request
    updataTodoList(body, (err, results) => {
        if (!err) {
            response.json({ status: 200, desc: '操作成功' })
        } else {
            response.json({ status: 400, desc: '操作失败' })
        }
    })
})

module.exports = {
    todoListRouter
}