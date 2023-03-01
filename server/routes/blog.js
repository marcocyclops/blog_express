var express = require('express');
var router = express.Router();

const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')


router.get('/list', function(req, res, next) {
    let author = req.query.author ?? ''
    const keyword = req.query.keyword ?? ''

    // if (req.query.isadmin) {
    //     // check whether is login admin
    //     const loginCheckResult = loginCheck(req)
    //     if (loginCheckResult) {
    //         // return if not login
    //         return loginCheckResult
    //     }
    //     // set author to current login admin, then will get the posts only belong to the admin
    //     author = req.session.username
    // }

    const result = getList(author, keyword)
    return result.then((listData) => {
        res.json(new SuccessModel(listData))
    })
});

router.get('/detail', function(req, res, next) {
  res.json({
      errno: 0,
      data: 'ok'
  })
});

module.exports = router;
