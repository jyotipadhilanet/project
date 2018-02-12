var express=require('express');
var app=express();

var bodyparser=require('body-parser');

var mongoose=require('mongoose');
var url="mongodb://localhost:27017/mydb";
mongoose.Promise=global.Promise;

var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
app.use(passport.initialize());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

passport.serializeUser((user,done)=>{
    console.log("in serialize Method");
    done(null,user)
});
passport.deserializeUser((user,done)=>{
    console.log("in deserialize Method");
    done(null,user)
});

var user=mongoose.model('passport',{
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    accessToken:{
        type:String,
        require:true
    }
})


passport.use(new LocalStrategy((username,password,done)=>{
    console.log(username,password);
    console.log("In use method");

    user.findOne({username, password}).then((user)=>{
        console.log(user);
        if(!user){
            console.log("In error")
            done(null,false)
        }
        done(null,user);
    })
}));


app.get('/insert/:nm/:pass/:email/:acc',(req,res)=>{
    var data=new user({username:req.params.nm,password:req.params.pass,email:req.params.email,accessToken:req.params.acc});
    data.save().then((user)=>{
        console.log("successful inserted")
    }).catch((err)=>{
        console.log("error =",err)
    })
})

app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/err'
}))

app.get('/',(req,res)=>{
    console.log("successful login")
    res.send({"msg":"success"})
})

app.get('/err',(req,res)=>{
    console.log("error in login")
    res.send({"msg":"error in login"})
})

app.listen(5000,()=>{
    console.log("port start on 5000");
    mongoose.connect(url)
})
