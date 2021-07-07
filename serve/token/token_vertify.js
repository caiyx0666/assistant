var jwt = require('jsonwebtoken');
var {PRIVITE_KEY} = require('./confirm');

exports.verToken = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token.split(' ')[1], PRIVITE_KEY, (err, data) => {
            if (!err) {
                resolve(data);
            }
            reject({status: 401,desc: '错误的token'})
        });
    })
}