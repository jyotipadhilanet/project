var mongoose=require('mongoose');
var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs')
var url="mongodb://localhost:27017/mydb";
var Validator=require('validator');
mongoose.Promise=global.Promise;
mongoose.connect(url);

var schema=new mongoose.Schema({
    Username:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        uniq:true,
        validate:{
            validator:Validator.isEmail,
            message:'{VALUE} is not valid email'
        }
    },
    tokens:[{
        access:{
            type:String,
            require:true
        },
        token:{
            type:String,
            require:true
        }
    }]
})

schema.methods.generateAuthToken=()=>{
    var user=this
    var access='auth'
    var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString()
    user.tokens.push({access,token})

    return user.save().then(()=>{return token})

}

schema.pre('save',()=>{
    var user=this;
    if(user.isModified('Password')){
       bcrypt.genSalt(10,(err,salt)=>{
           bcrypt.hash(user.Password,salt,(err,hash)=>{
               user.Password=hash;
               next()
           })
       })
    }
    else {
        next();
    }

})


var User=mongoose.model('UserInfo',schema);

module.exports={User};