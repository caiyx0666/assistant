# 项目接口文档



> baseurl：http://localhost:3001
>
> port：3001



### 今天吃什么



##### 1、获取所有食物

URL: `/getEatList`

Method：`GET`

return：

```js
{
    "status": 200,
        "data": [
            {name: '沙县小吃',code: 0},
            ...
        ]
}
```



##### 2.修改食物

URL:  `/updateEat`

Methods: POST

Data: 

| 字段 | 类型   | 说明     |
| ---- | ------ | -------- |
| name | string | 食物名称 |
| code | string | 食物标识 |

return:

```js
{
    'status': 200,
    'desc': '操作成功'
     ...
}
```

