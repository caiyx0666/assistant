// 引入 express 模块用于创建路由
const express = require('express');
const path = require('path');

// formdata 图片上传的第三方模块
const formidable = require('formidable');
const uuid = require('node-uuid')

const { uploadAcatar } = require('../mysql/model');
const jwtauth = require('../token/token_vertify')

// 创建路由
const router = express.Router();


// 中间写代码 -- 开始
router.post('/uploadAcatar', (request, response) => {
    // 创建一个用于处理 formdata 的实例对象
    const form = new formidable.IncomingForm();
    // 上传文件的存储路径
    form.uploadDir = path.join(__dirname, '../uploads');
    // 保持源文件的扩展名(后缀名)
    form.keepExtensions = true;
    // 调用第三方模块内置的方法，解析 请求对象 中的的 formdata 数据
    form.parse(request, (err, fields, files) => {
        /*
          err       错误对象 
          fields    纯文本字段 { aa: 11, bb: 22 }
          files     文件对象，files.avatar
        */
        if (err === null) {
            // response.json({ code: 400, msg: '上传失败' });
            // console.log('纯文本字段', fields);    
            // console.log('上传文件信息', files);
            // 从文件对象的 avatar 属性中，
            //    -  path 文件本地绝对路径，
            //    -  name 文件原本的名称
            const { path: imgPath, name } = files.file;

            // path.basename()   提取字符串路径中的文件名部分
            const uploadName = path.basename(imgPath);
            


            let token = request.headers['authorization'];
            jwtauth.verToken(token).then(data => {

                let obj = {
                    updateTime: new Date().getTime(),
                    acatar: uploadName,
                    ...data
                }

                uploadAcatar(obj, (err, results) => {
                    if (!err) {
                        response.json({ status: 200, msg: `${name} 上传成功`, acatar: uploadName });
                    } else {
                        response.json({ status: 400, msg: '上传失败' });
                    }
                })
            }).catch(err => {
                response.send({ status: 401, desc: '无效的token' })
            })



            
        } else {
            response.json({ status: 400, msg: '上传失败' });
        }
    });
});


// 直接导出路由对象
module.exports = router;