var mongoose=require('../db/db')

var SStudent=mongoose.Schema({
   name:{
       type:String
   },
   email:{
       type:String
   },
    contactno:{
       type:String
    },
    isdel:{
       type:Boolean
    }
});

var Student=mongoose.model('Student',SStudent);
module.exports=Student