const mysql = require('../database/mysql.js')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by created_at desc;`

    return mysql.exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id=${id};`

    return mysql.exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    let sql = `INSERT INTO blogs
        (title, content, author)
        VALUES
        ('${blogData.title}', '${blogData.content}', '${blogData.author}');`

    return mysql.exec(sql).then((insertData) => {
        return { id: insertData.insertId }
    })
}

const updateBlog = (id, blogData) => {
    let sql = `UPDATE blogs
        SET title='${blogData.title}', content='${blogData.content}', author='${blogData.author}'
        WHERE id=${id};`

    return mysql.exec(sql).then((updateData) => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

// only author matched current login user allow to delete the post
const deleteBlog = (id, author) => {
    let sql = `DELETE FROM blogs WHERE id=${id} and author='${author}';`

    return mysql.exec(sql).then((deleteData) => {
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}