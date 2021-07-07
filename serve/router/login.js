// 引入 express 模块用于创建路由
const express = require('express');
// 加密
const bcrypt = require('bcryptjs')

// 权限校验
const jwt = require('jsonwebtoken')
const { PRIVITE_KEY, EXPIRESD } = require('../token/confirm')

const { paramsquery, register } = require('../mysql/model');

// 创建路由
const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
    const { userName, password } = req.body
    // 校验：用户是否存在
    let isExist = await paramsquery(userName)
    // 查询失败
    if (isExist.status === 400) {
        res.send(isExist)
        return
    }

    // 校验用户是否存在
    if (isExist.data.length === 0) {
        res.send({ status: 400, desc: '用户不存在' })
        return
    }



    // 密码校验 + 生成Token
    bcrypt.compare(password, isExist.data[0].password, function (err, success) {
        if (!success) {
            res.send({ status: 400, desc: '密码输入错误' })
            return
        }

        let obj = {
            userName: userName,
            type: 'express-jwt',
            ctime: new Date().getTime()
        }

        // 生成Token
        const token = 'Bearer ' + jwt.sign(obj, PRIVITE_KEY, { expiresIn: EXPIRESD})
        res.send({ status: 200,desc: '登录成功', token })
    })
})

loginRouter.post('/register', async (req, res) => {
    let { userName, password } = req.body
    // 校验：用户是否存在
    let isExist = await paramsquery(userName)

    // 查询失败
    if (isExist.status === 400) {
        res.send(isExist)
        return
    }

    // 校验用户是否存在
    if (isExist.data.length !== 0) {
        res.send({ status: 400, desc: '用户已存在' })
        return
    }

    //生成salt的迭代次数
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    let hash = bcrypt.hashSync(password, salt);
    //把hash值赋值给password变量
    password = hash;

    let obj = {
        userName,
        password,
        acatar: '',
        theme: 'color1',
        createTime: new Date().getTime()
    }

    register(obj, (err, results) => {
        if (!err) {
            res.send({ status: 200, desc: '注册成功', data: results })
        } else {
            res.send({ status: 400, desc: '注册失败' })
        }
    })

})

module.exports = { loginRouter }