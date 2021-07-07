const { connection } = require('./connection')

/**
 * 获取今日事项
 * @param {function} callback
 */
const getTodoList = (callback) => {
    connection.query('select * from todo_list', callback)
};

/**
 * 新增今日事项
 * @param {Object} obj
 * @param {function} callback
 */
const addTodoList = (obj, callback) => {
    connection.query('insert into todo_list set ?', [obj], callback);
};

/**
 * 更新今日事项
 * @param {object} obj
 * @param {function} callback
 */
const updataTodoList = (obj, callback) => {
    const { content, finish, code } = obj
    connection.query('update todo_list set content = ?, finish = ? where code = ?', [content, finish, code], callback)
};

/**
 * 删除今日事项
 * @param {Array} codes
 * @param {function} callback
 */
const delTodeList = (codes, callback) => {
    let str = ''
    let list = codes.map(item => {
        return `"${item}"`
    })
    str = list.join(',')
    connection.query(`delete from todo_list where code in (${str})`, callback)
}



/**
 * 获取全部食物
 * @param {function} callback
 */
const getEat = (callback) => {
    connection.query('select * from eat', callback)
};

/**
 * 修改食物数据
 * @param {object} obj
 * @param {function} callback
 */
const updataEat = (obj, callback) => {
    const { name, code } = obj
    connection.query('update eat set name = ? where code = ?', [name, code], callback)
};



/**
 * 获取备忘录信息
 * @param {object} obj
 * @param {function} callback
 */
const getMemo = (obj, callback) => {
    const { title } = obj;
    let sql = 'select * from memo'
    if (title) {
        sql += ` where title like '%${title}%'`
    }
    connection.query(sql, callback)
};

/**
 * 新增备忘录信息
 * @param {Object} obj
 * @param {function} callback
 */
const addMemo = (obj, callback) => {
    const { content, title, code, createTime, updateTime } = obj
    connection.query('insert into memo values (?,?,?,?,?)', [content, title, code, createTime, updateTime], callback);
};

/**
 * 修改备忘录数据
 * @param {object} obj
 * @param {function} callback
 */
const updataMemo = (obj, callback) => {
    const { content, title, updateTime, code } = obj
    connection.query('update memo set updateTime = ?,title = ?,content = ? where code = ?', [updateTime, title, content, code], callback)
};

/**
 * 删除备忘录数据
 * @param {string} code
 * @param {function} callback
 */
const delMemo = (code, callback) => {
    connection.query('delete from memo where code = ?', [code], callback)
}

/**
 * 获取备忘录详情
 * @param {string} code
 * @param {function} callback
 */
const getMemoDetail = (code, callback) => {
    connection.query('select * from memo where code = ?', [code], callback)
}



/**
 * 获取记账本信息
 * @param {function} callback
 */
const getAccounts = (callback) => {
    connection.query('select * from accounts', callback)
}

/**
 * 获取指定月份记账本信息
 * @param {object} obj
 * @param {function} callback
 */
const getScopeAccounts = (obj, callback) => {
    const { startTime, endTime } = obj
    connection.query('select * from accounts where date between ? and ?', [startTime, endTime], callback)
}

/**
 * 新增记账信息
 * @param {Object} obj
 * @param {function} callback
 */
const addAccounts = (obj, callback) => {
    const { code, createTime, content, sum, icon, date, category } = obj
    connection.query('insert into accounts values (?,?,?,?,?,?,?)', [code, createTime, content, sum, icon, date, category], callback);
};

/**
 * 删除记账本数据
 * @param {object} obj
 * @param {function} callback
 */
const delAccounts = (obj, callback) => {
    const { code } = obj
    connection.query('delete from accounts where code = ?', [code], callback)
};

/**
 * 上传头像
 * @param {object} obj
 * @param {function} callback
 */
const uploadAcatar = (obj, callback) => {
    const { updateTime, acatar, userName } = obj
    connection.query('update user_info set updateTime = ?,acatar = ? where userName = ?', [updateTime, acatar, userName], callback)
}

/**
 * 修改主题
 * @param {object} obj
 * @param {function} callback
 */
const updateTheme = (obj, callback) => {
    const { updateTime, theme, userName } = obj
    console.log(updateTime, theme, userName)
    connection.query('update user_info set updateTime = ?,theme = ? where userName = ?', [updateTime, theme, userName], callback)
}


/**
 * 获取用户信息
 * @param {object} obj
 * @param {function} callback
 */
const getUserInfo = (obj,callback) => {
    const { userName } = obj;
    connection.query('select * from user_info where userName = ?',[userName], callback)
}

/**
 * 注册
 * @param {object} obj
 * @param {function} callback
 */
const register = (obj, callback) => {
    const { userName, password, acatar, theme, createTime } = obj;
    connection.query('insert into user_info values (?,?,?,?,?)', [userName, password, acatar, theme, createTime], callback);
}

/**
 * 查询是否存在用户数据
 * @param {string} userName
 * @returns {boolean}
 */
const paramsquery = (userName) => {
    return new Promise((resolve, rejects) => {
        connection.query('select * from user_info where userName = ?', [userName], (err, results) => {
            if (err) {
                rejects({ status: 400, desc: '查询失败' })
            }
            resolve({ status: 200, desc: '查询成功', data: results })
        })
    })
}


module.exports = {
    getTodoList,
    updataTodoList,
    addTodoList,
    delTodeList,
    getEat,
    updataEat,
    getMemo,
    updataMemo,
    addMemo,
    delMemo,
    getMemoDetail,
    getAccounts,
    addAccounts,
    delAccounts,
    getScopeAccounts,
    uploadAcatar,
    updateTheme,
    getUserInfo,
    paramsquery,
    register
}