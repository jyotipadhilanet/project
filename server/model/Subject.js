var mongoose=require('../db/db')

var SSubject=mongoose.Schema({
    studentid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:['Student']
    },
    subject:{
        type:String
    },
    marks:{
        type:Number
    },
    isdel:{
        type:Boolean
    }
});

var Subject=mongoose.model('Subject',SSubject);
module.exports=Subject