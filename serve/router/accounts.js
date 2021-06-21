const express = require('express')
const uuid = require('node-uuid')

// 导入对数据库增删改查的方法模块,并进行结构，方便后续使用
const { getAccounts, getMonthAccounts, addAccounts, delAccounts } = require('../mysql/model')

// 创建路由中间件函数，用户管理食物类的接口
const accountsRouter = express.Router()

// 获取全部记账信息
accountsRouter.post('/getAccounts', (request, response) => {
    getAccounts((err, results) => {
        if (err) {
            response.json({ status: 400, desc: '操作失败' })
        } else {
            response.json({ status: 200, desc: '操作成功', data: results })
        }
    })
})

// 获取当前月份记账信息
accountsRouter.post('/getMonthAccounts', (request, response) => {
    const { body } = request
    getMonthAccounts(body, (err, results) => {
        if (err) {
            response.json({ status: 400, desc: '操作失败' })
        } else {
            response.json({ status: 200, desc: '操作成功', data: results })
        }
    })
})

// 添加记账信息
accountsRouter.post('/addAccounts', (request, response) => {
    const { body } = request
    const obj = {
        ...body,
        code: uuid.v1().replace(/-/g, ''),
        createTime: new Date().getTime()
    }
    addAccounts(obj, (err, results) => {
        if (!err) {
            response.json({ status: 200, desc: '操作成功', data: results })
        } else {
            response.json({ status: 400, desc: '操作失败' })
        }
    })
})

// 删除记账信息
accountsRouter.post('/delAccounts', (request, response) => {
    const { body } = request
    delAccounts(body, (err, results) => {
        if (!err) {
            response.json({ status: 200, desc: '操作成功', data: results })
        } else {
            response.json({ status: 400, desc: '操作失败' })
        }
    })
})

module.exports = {
    accountsRouter
}