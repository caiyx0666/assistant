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



### 今日事，今日毕



##### 1、获取所有事项

URL: `/getTodoList `

Method：`GET`

return：

```js
{
    "status": 200,
        "data": [
            {
                content: '吃早餐',
             	createTime: 1623827876920,
             	code: 162382787692012312312,
             	finish: false
            },
            ...
        ]
}
```



##### 2、新增事项

URL: `/addTodoList `

Method：`post`

Data: 

| 字段    | 类型   | 说明     |
| ------- | ------ | -------- |
| content | string | 事项内容 |

return：

```js
{
    "status": 200,
    "desc": '操作成功'
    ...
}
```



##### 3、删除事项

URL: `/delTodoList`

Method：`post`

Data: 

| 字段  | 类型  | 说明                       |
| ----- | ----- | -------------------------- |
| codes | array | 事项标识    [0,1,2,......] |

return：

```js
{
    "status": 200,
    "desc": '操作成功'
    ...
}
```



##### 4、更新今日事项

URL: `/updataTodoList` 

Method：`post`

Data: 

| 字段    | 类型   | 说明                        |
| ------- | ------ | --------------------------- |
| code    | string | 事项标识                    |
| finish  | number | 是否完成事项 1完成  0未完成 |
| content | string | 今日事项内容                |

return：

```js
{
    "status": 200,
    "desc": '操作成功'
    ...
}
```



