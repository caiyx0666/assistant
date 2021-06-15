const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')

// 端口号
const port = 5500;

// 跨域
const cors = require('cors')
app.use(cors())

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port} is runing`);
})