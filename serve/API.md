# 项目接口文档



> baseurl：http://localhost:3001
>
> port：3001



### 用户信息



##### 1、注册

URL: `/register`

Method：`post`

Data: 

| 字段     | 类型   | 说明   | 是否必填 |
| -------- | ------ | ------ | -------- |
| userName | string | 用户名 | 是       |
| password | string | 密码   | 是       |

return：

```js
{
    "status": 200,
    "desc": '注册成功',
    	...
}
```

说明：该接口仅用于登录





##### 2、登录

URL: `/login`

Method：`post`

Data: 

| 字段     | 类型   | 说明   | 是否必填 |
| -------- | ------ | ------ | -------- |
| userName | string | 用户名 | 是       |
| password | string | 密码   | 是       |

return：

```js
{
    "status": 200,
    "desc": '登录成功',
   	'token': asd1223121bw6s,
        ...
}
```



##### 3、上传用户头像

URL: `/uploadAcatar`

Method：`post`

Data: 

| 字段 | 类型   | 说明     | 是否必填 |
| ---- | ------ | -------- | -------- |
| file | string | 头像文件 | 是       |

return：

```js
{
    "status": 200,
    "desc": '上传成功',
     	...
}
```



##### 4、更换皮肤主题

URL: `/updateTheme`

Method：`post`

Data: 

| 字段  | 类型   | 说明     | 是否必填 |
| ----- | ------ | -------- | -------- |
| theme | string | 主题名称 | 是       |

return：

```js
{
    "status": 200,
    "desc": '修改成功',
     	...
}
```



##### 5、获取用户信息

URL: `/getUserInfo`

Method：`post`

return：

```js
{
    "status": 200,
    "desc": '修改成功',
    "data": {...}
}
```







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

| 字段 | 类型   | 说明     | 是否必填 |
| ---- | ------ | -------- | -------- |
| name | string | 食物名称 | 是       |
| code | string | 食物标识 | 是       |

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

| 字段    | 类型   | 说明     | 是否必填 |
| ------- | ------ | -------- | -------- |
| content | string | 事项内容 | 是       |

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

| 字段  | 类型  | 说明                       | 是否必填 |
| ----- | ----- | -------------------------- | -------- |
| codes | array | 事项标识    [0,1,2,......] | 是       |

return：

```js
{
    "status": 200,
    "desc": '操作成功'
    ...
}
```



##### 4、修改今日事项内容

URL: `/updataTodoList` 

Method：`post`

Data: 

| 字段    | 类型   | 说明                        | 是否必填 |
| ------- | ------ | --------------------------- | -------- |
| code    | string | 事项标识                    | 是       |
| finish  | number | 是否完成事项 1完成  0未完成 | 是       |
| content | string | 今日事项内容                | 是       |

return：

```js
{
    "status": 200,
    "desc": '操作成功'
    ...
}
```



### 记账本



##### 1.获取所有记账信息

URL: `/getAccounts` 

Method：`post`

return：

```js
{
    "status": 200,
    "desc": '操作成功',
    "data": [{code: 1231312,createTime: 12352131,content: '记账备注',sum: 12,icon: 'icon-canyin',date: 16121812},
   	...]
}
```



##### 2.获取范围内记账信息

URL: `/getScopeAccounts`

Method：`post`

Data: 

| 字段      | 类型   | 说明     | 是否必填 |
| --------- | ------ | -------- | -------- |
| startTime | number | 起始时间 | 是       |
| endTime   | number | 终止时间 | 是       |

return：

```js
{
    "status": 200,
    "desc": '操作成功',
   	"data": [{code: 1231312,createTime: 12352131,content: '记账备注',sum: 12,icon: 'icon-canyin',date: 16121812},
   	...]
}
```





##### 3.添加记账信息

URL: `/addAccounts` 

Method：`post`

Data: 

| 字段    | 类型   | 说明     | 是否必填 |
| ------- | ------ | -------- | -------- |
| content | string | 备注     | 否       |
| sum     | number | 金额     | 否       |
| icon    | string | 字体图标 | 是       |

return：

```js
{
    "status": 200,
    "desc": '操作成功'
    ...
}
```



##### 4.删除记账信息

URL: `/delAccounts` 

Method：`post`

Data: 

| 字段 | 类型   | 说明 |      |
| ---- | ------ | ---- | ---- |
| code | string | 标识 | 是   |

return：

```js
{
    "status": 200,
    "desc": '操作成功'
    ...
}
```





### 备忘录



##### 1.获取备忘录信息

URL: `/getMemo`

Method：`get`

Data: 

| 字段  | 类型   | 说明                   | 是否必填 |
| ----- | ------ | ---------------------- | -------- |
| title | string | 备忘录标题（用户搜索） | 否       |

return：

```js
{
    "status": 200,
    "desc": '操作成功',
    "data": [
        {content:'111',title: '111',code:'123123123', createTime: 12312312,updataTime: 12231321},
        ...
    ]
}
```



##### 2.添加备忘录信息

URL: `/addMemo`

Method：`post`

Data: 

| 字段    | 类型   | 说明       | 是否必填 |
| ------- | ------ | ---------- | -------- |
| content | string | 备忘录内容 | 否       |
| title   | string | 备忘录标题 | 否       |

return：

```js
{
    "status": 200,
    "desc": '操作成功',
    ...
}
```



##### 3.删除备忘录信息

URL: `/delMemo`

Method：`post`

Data: 

| 字段 | 类型   | 说明     | 是否必填 |
| ---- | ------ | -------- | -------- |
| code | string | 唯一标识 | 是       |

return：

```js
{
    "status": 200,
    "desc": '操作成功',
    ...
}
```



##### 4.备忘录详情

URL: `/getMemoDetail`

Method：`post`

Data: 

| 字段 | 类型   | 说明     | 是否必填 |
| ---- | ------ | -------- | -------- |
| code | string | 唯一标识 | 是       |

return：

```js
{
    "status": 200,
    "desc": '操作成功',
   	"data": {content:'111',title: '111',code:'123123123', createTime: 12312312,updataTime: 12231321}
}
```



##### 5.修改备忘录内容

URL: `/editMemo`

Method：`post`

Data: 

| 字段    | 类型   | 说明       | 是否必填 |
| ------- | ------ | ---------- | -------- |
| code    | string | 唯一标识   | 是       |
| content | string | 备忘录内容 | 否       |

return：

```js
{
    "status": 200,
    "desc": '操作成功',
   	"data": {content:'111',title: '111',code:'123123123', createTime: 12312312,updataTime: 12231321}
}
```

