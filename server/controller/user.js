const mysql = require('../database/mysql.js')
const { genPassword } = require('../utils/cryp')

const loginAuth = (username, password) => {
    // username = mysql.escape(username)
    // password = genPassword(password)
    // password = mysql.escape(password)

    let sql = `select username, realname from users where username='${username}' and password='${password}';`

    return mysql.exec(sql).then((userData) => {
        return userData[0] ?? {}
    })
}

module.exports = {
    loginAuth,
}