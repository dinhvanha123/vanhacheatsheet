const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const Users = require('../models/user');
const router = express.Router();
router.get('/login',function(req,res){
    res.render('login');
})
router.post('/login',passport.authenticate('local',{
    successRedirect: '/auth/loginOk',
    failureRedirect: '/auth/login',
    failureFlash: true
}))
router.get('/loginOk', function(req,res){
    res.send('Page Local');
})
router.get('/create', function(req,res){
    res.render('create-account');
})
router.post('/register', function(req,res){
  var name = req.body.name;
  var pw = req.body.password;
  var salt = crypto.randomBytes(16).toString('hex');
  pw = crypto.pbkdf2Sync(pw, salt, 10000, 512, 'sha512').toString('hex');

  // C1 : Thêm user vào trong mlab
  var user = new Users.user({
      user : name,
      salt : salt,
      password : pw,
  })
  Users.findByOne({user : user.user},function(err,data){
      if(err){
        res.redirect('/users/create?'+'error');
          return;
      }
      if(data.length != 0){
        res.redirect('/users/create?'+'tài khoản đã tồn tại');
        return;
      }else{
            user.save(function(err){
                if(err){
                res.redirect('/users/create?'+'Create account failed');
                return;
                }
            });
      }
      res.redirect('/?'+'Create account success');
  })
 
  // C2 : Thêm user vào trong mlab
  // Users.user.create({
  //       user : name,
  //       salt : salt,
  //       password : pw,
  // },function(err){
  //   if(err){
  //     res.redirect('/users/create')
  //   }
  // })
  
})
module.exports = router;
