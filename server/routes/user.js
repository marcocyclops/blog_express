var express = require('express');
var router = express.Router();
const { loginAuth } = require('../controller/user.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')

router.post('/login', function (req, res, next) {
    const { username, password } = req.body
    const result = loginAuth(username, password) 
    return result.then((data) => {
        if (data.username) {
            // login successfully
            req.session.username = data.username
            req.session.realname = data.realname
            res.json(new SuccessModel(data, 'login successfully'))
            return
        }
        else {
            res.json(new ErrorModel('login failed'))
        }
    })
});

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            errno: 0,
            message: 'Logged in'
        })
        return
    }
    res.json({
        errno: -1,
        message: 'Not login yet'
    })
})

module.exports = router;
