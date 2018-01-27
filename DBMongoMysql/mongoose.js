var mongoose=require('mongoose');
var url="mongodb://localhost:27017/mydb";
mongoose.Promise=global.Promise;
mongoose.connect(url);

var todo=mongoose.model("inform",{
    name:{
        type:String,
        required:true,
        minlength:2,
        trim:true
    },
    address:{
        type:String,
        default:"dasd"
    },
    age:{
        type:Number,
        default:23
    }
});

var newInfo=new todo({name:123,address:"sardar nagar",age:25});
newInfo.save().then((succ)=>{
    console.log(JSON.stringify(succ,undefined,2))
},(err)=>{
    console.log("unable to save ="+err)
});

var user=mongoose.model('user',{
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    }
})

var info=new user({email:123});
info.save().then((done)=>{
    console.log(done)
},(err)=>{
    console.log("unable to save ="+err)
})