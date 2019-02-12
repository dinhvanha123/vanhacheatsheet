const express = require('express');
const passport = require('passport');
const crypto = require('crypto');

const Users = require('../models/user');
const Authen = require('../common/isLogged');

const router = express.Router();

router.get('/login',function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
            res.render('login',{
                message: req.flash('loginMessage')
            });
    }
   
})
router.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))
router.get('/loginOk', function(req,res){
    res.send('Page Local');
})
router.get('/create', Authen.isLoggedIn, function(req,res){
    res.render('create-account',{
        body : res.query,
        success_message: req.query.success_message,
        error_message: req.query.error_message,
    });
})
router.post('/register',  Authen.isLoggedIn, function(req,res){
  var name = req.body.name;
  var pw = req.body.password;
  var salt = crypto.randomBytes(16).toString('hex');
  pw = crypto.pbkdf2Sync(pw, salt, 10000, 512, 'sha512').toString('hex');

  // C1 : Thêm user vào trong mlab
  var newUser = new Users.user({
      user : name,
      salt : salt,
      password : pw,
  })
  Users.findByOne({user : newUser.user},function(err,data){
      if(err){
        res.redirect('/users/create?error_message='+'error');
          return;
      }
      if(data != null){
        res.redirect('/users/create?error_message='+'Tài khoản đã tồn tại');
        return;
      }else{
                newUser.save(function(err){
                if(err){
                res.redirect('/users/create?error_message='+'Create account failed');
                return;
                }
            });
      }
      res.redirect('/users/create?success_message='+'Create account success');
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
