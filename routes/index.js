var express = require('express');
const Authen = require('../common/isLogged');
var router = express.Router();

/* GET home page. */
router.get('/', Authen.isLoggedIn ,function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
