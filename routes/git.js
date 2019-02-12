var express = require('express');

const Authen = require('../common/isLogged');

var router = express.Router();
router.get('/cheat_sheet', Authen.isLoggedIn,function(req,res){
    res.render('git/git-doc');
})
module.exports = router