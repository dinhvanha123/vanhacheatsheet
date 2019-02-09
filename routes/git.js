var express = require('express');
var router = express.Router();
router.get('/cheat_sheet',function(req,res){
    res.render('git/git-doc');
})
module.exports = router