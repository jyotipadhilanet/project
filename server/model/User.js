var mongoose=require('../db/db')

var SUser=mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    token:{
        type:String
    }
});

var User=mongoose.model('User',SUser);
module.exports=User