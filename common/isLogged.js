function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        return next()
    };
    res.redirect('/users/login');
}
// exports.isLoggedIn = isLoggedIn;
module.exports.isLoggedIn = isLoggedIn;