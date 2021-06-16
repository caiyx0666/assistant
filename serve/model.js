const { connection } = require('./mysql/connection')


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
    const { createTime, content, code } = obj
    connection.query('insert into todo_list values (? , ? , ? , false)', [content, createTime, code], callback);
};

/**
 * 修改今日事项
 * @param {object} obj 
 * @param {function} callback 
 */
const updataTodoList = (obj, callback) => {
    const { content, code, finish } = obj
    connection.query('update tode_list set content = ?,finish = ? where code = ?', [content, finish, code], callback)
};

/**
 * 删除今日事项
 * @param {string} code
 * @param {function} callback
 */
const delTodeList = (code, callback) => {
    connection.query('delete from todo_list where code = ?', [code], callback)
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
    connection.query('select * from accounts where createTime between ? and ?', [startTime, endTime], callback)
}

/**
 * 新增记账信息
 * @param {Object} obj
 * @param {function} callback
 */
const addAccounts = (obj, callback) => {
    const { createTime, content, code } = obj
    connection.query('insert into todo_list values (? , ? , ? , false)', [content, createTime, code], callback);
};


/**
 * 修改记账本数据
 * @param {object} obj
 * @param {function} callback
 */
const updataAccounts = (obj, callback) => {
    const { bill, code } = obj
    connection.query('update accounts set billList = ?, where code = ?', [bill, code], callback)
};

// /**
//  * 新增英雄数据
//  * @param {Object} obj 
//  * @param {function} callback 
//  */
// // 新增英雄
// const addHero = (obj, callback) => {
//     connection.query('insert into heros set ?', [obj], callback);
// };


// /**
//  * 删除单个英雄数据(软删除)
//  * @param {id} string
//  * @param {function} callback
//  */
// const delHeroById = (id, callback) => {
//     connection.query('update heros set isdelete = 1 where id = ? and isdelete = 0', [id], callback)
// };

module.exports = { getTodoList, getEat, getMemo, getAccounts, updataTodoList, updataEat, updataMemo, updataAccounts, delTodeList, delMemo, addTodoList, addMemo, addAccounts, getMonthAccounts }