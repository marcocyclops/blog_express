const { ErrorModel } = require('../model/resModel.js');

module.exports = (req, res, next) => {
    if (req.session.username) {
        next()
        return
    }
    res.json(
        new ErrorModel('Please login first')
    )
}