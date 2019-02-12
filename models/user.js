var mongoose = require('mongoose');
var dbmanager = require('../manager/db_manager').Instance();
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    user : String,
    salt : String,
    password : String
})
var user = mongoose.model('user',UserSchema);
module.exports.user = user;
var insert = function(name,salt,password,callback){
    dbmanager.getMongoDb(9999,function(err,db){
        if (err) {
            callback(err);
            return;
        }
        if(db == null){
            callback('db == null');
            return;
        }
        var newData = db.model('user',UserSchema)();
        newData.user = name;
        newData.salt = salt;
        newData.password = password;
        console.log('newData',newData);
        
        newData.save(function(err){
            callback(err);
        })
    })
}
exports.insert = insert;
var find = function(callback){
    dbmanager.getMongoDb(9999,function(err,db){
        if (err) {
            callback(err, null);
            return;
        }
        if(db == null){
            callback('db == null', null);
            return;
        }
        db.model('user',UserSchema).find({},function(err,data){
            callback(err,data);
        })
    })
}
exports.finds = find;

var findByOne = function(query,callback){
    dbmanager.getMongoDb(9999,function(err,db){
        if (err) {
            callback(err, null);
            return;
        }
        if(db == null){
            callback('db == null', null);
            return;
        }
        db.model('user',UserSchema).find(query).exec(function(err,data){
            callback(err,data);
        })
    })
}
exports.findByOne = findByOne;