const express = require('express')

// 导入对数据库增删改查的方法模块,并进行结构，方便后续使用
const { getMemo, updataMemo, addMemo, delMemo, getMemoDetail } = require('../mysql/model')

const uuid = require('node-uuid')

// 创建路由中间件函数，用户管理食物类的接口
const memoRouter = express.Router()

// 获取备忘录信息
memoRouter.post('/getMemo', (request, response) => {
    const { body } = request
    getMemo(body, (err, results) => {
        if (!err) {
            response.json({ status: 200, desc: '操作成功', data: results })
        } else {
            response.json({ status: 400, desc: '操作失败' })
        }
    })
})

// 添加备忘录信息
memoRouter.post('/addMemo', (request, response) => {
    const { body } = request
    const time = new Date().getTime()
    const code = uuid.v1().replace(/-/g, '')
    const obj = {
        ...body,
        code,
        createTime: time,
        updateTime: time
    }
    addMemo(obj, (err, results) => {
        if (!err) {
            response.json({ status: 200, desc: '添加成功', code })
        } else {
            response.json({ status: 400, desc: '添加失败' })
        }
    })
})

// 删除备忘录信息
memoRouter.post('/delMemo', (request, response) => {
    const { code } = request.body
    delMemo(code, (err, results) => {
        if (!err) {
            response.json({ status: 200, desc: '删除成功' })
        } else {
            response.json({ status: 400, desc: '删除失败' })
        }
    })
})

// 获取备忘录详情
memoRouter.post('/getMemoDetail', (request, response) => {
    const { code } = request.body
    getMemoDetail(code, (err, results) => {
        if (!err) {
            response.json({ status: 200, desc: '操作成功', data: results })
        } else {
            response.json({ status: 400, desc: '操作失败' })
        }
    })
})

// 修改备忘录内容
memoRouter.post('/editMemo', (request, response) => {
    const { body } = request
    let obj = {
        content: body.content,
        code: body.code,
        title: body.title,
        updateTime: new Date().getTime()
    }
    updataMemo(obj, (err, results) => {
        if (!err) {
            response.json({ status: 200, desc: '修改成功', data: results })
        } else {
            response.json({ status: 400, desc: '修改失败' })
        }
    })
})

module.exports = { memoRouter }