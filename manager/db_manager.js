var User_MongoDb = require('../config/database').user_mongoDB;
var mongoose = require('mongoose');

var DBManagerInstance = (function(){
    var _unique;
    var _Mongo_List;
    function Instance(){
        if(_unique === undefined){
            _unique = new DBManager();
        }
        return _unique;
    }
    function DBManager(){
        _Mongo_List = [];
    }
    DBManager.prototype.getMongoDb = function(zid,callback){
        if(_Mongo_List[zid] == null){
            callback('[zid=' + zid + '] [error= database config error, database not existing]');
            return;
        }
        if(_Mongo_List[zid]){
            callback(null, _MongoDbList[zid]);
        }else {
            mongoose.createConnection(User_MongoDb[zid].url , {useNewUrlParser: true},function(err,db){
              if(err){
                callback('[zid=' + zid + '] [error=' + err + ']');
              }else {
                  _Mongo_List[zid] = db;
                  callback(null,_Mongo_List[zid]);
              }
            })
        }
    }
    return Instance;
})();
exports.Instance = DBManagerInstance;