var LocalStrategy = require('passport-local').Strategy;
var Users = require('../models/user');
var crypto = require('crypto');
function configPassport(passport){
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    passport.use(new LocalStrategy({
        usernameField: 'user',
        passwordField: 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req,username,password,done){
        Users.findByOne({user : username},function(err,user){
            if(err){
                return  done(err);
            }
            if (!user){
                return done(null, false, req.flash('loginMessage', 'Tài khoản không tồn tại'));
            }
            password = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
            if(user.password != password){
                return done(null, false,req.flash('loginMessage', 'Sai mật khẩu, hãy nhập lại!'));
            }
            return done(null, user, req.flash('loginMessage', 'Chúc bạn vui vẻ'));
        })
    }
    ))
}
module.exports = configPassport;