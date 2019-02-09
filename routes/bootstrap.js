var express = require('express');
var router = express.Router();
router.get('/cheat_sheet',function(req,res){
    res.render('bootstrap/bootstrap-doc');
})
module.exports = router