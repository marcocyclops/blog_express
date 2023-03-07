var express = require('express');
var router = express.Router();

const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')
const loginCheck = require('../middleware/loginCheck.js');


router.get('/list', (req, res, next) => {
    let author = req.query.author ?? ''
    const keyword = req.query.keyword ?? ''

    if (req.query.isadmin) {
        if (req.session.username == null) {
            // return if not login
            res.json(
                new ErrorModel('Please login first')
            )
            return
        }
        // set author to current login admin, then will get the posts only belong to the admin
        author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then((listData) => {
        res.json(new SuccessModel(listData))
    })
});

router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then((detailData) => {
        res.json(
            new SuccessModel(detailData)
        )
    })
});

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then((data) => {
        res.json(
            new SuccessModel(data)
        )
    })

})

router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then((resultData) => {
        if (resultData) {
            res.json(
                new SuccessModel('update successfully.')
            )
        }
        else {
            res.json(
                new ErrorModel('update failed.')
            )
        }
    })
})

router.post('/delete', loginCheck, (req, res, next) => {
    const author = req.session.username
    const result = deleteBlog(req.query.id, author)
    return result.then((resultData) => {
        if (resultData) {
            res.json(
                new SuccessModel('delete successfully.')
            )
        }
        else {
            res.json(
                new ErrorModel('delete failed.')
            )
        }
    })
})

module.exports = router;
