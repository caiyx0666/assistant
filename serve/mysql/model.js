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
 * @param {function} callback
 */
const getMemo = (callback) => {
    connection.query('select * from memo', callback)
};

/**
 * 新增备忘录信息
 * @param {Object} obj
 * @param {function} callback
 */
const addMemo = (obj, callback) => {
    const { createTime, content, code } = obj
    connection.query('insert into todo_list values (? , ? , ? , ?)', [content, createTime, createTime, code], callback);
};

/**
 * 修改备忘录数据
 * @param {object} obj
 * @param {function} callback
 */
const updataMemo = (obj, callback) => {
    const { content, time, code } = obj
    connection.query('update memo set updateTime = ?,content = ? where code = ?', [time, content, code], callback)
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
const getMonthAccounts = (obj, callback) => {
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
 * @param {string} code
 * @param {function} callback
 */
const delAccounts = (obj, callback) => {
    const { code } = obj
    console.log(code)
    connection.query('delete from accounts where code = ?', [code], callback)
};

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
    getAccounts,
    addAccounts,
    delAccounts,
    getMonthAccounts
}