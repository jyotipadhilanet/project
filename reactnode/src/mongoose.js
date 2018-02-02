var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var validator=require('validator');
var mongoose=require('mongoose');
var url="mongodb://localhost:27017/mydb";
app.use(bodyParser.json());
mongoose.Promise=global.Promise;
mongoose.connect(url);

app.use((req,res,next) =>{

    res.header('Access-Control-Allow-Origin',' http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});


app.get('/',(req,res)=>{
    res.send("welcome to vnsgu site");
});

var user=mongoose.model('info',{
    name:{
        type:String,
        require:true,
        minlength:5
    },
    surname:{
        type:String,
        require:true,
        minlength:5
    },
    pass:{
        type:String,
        minlength:4,
        maxlength:16
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:validator.isEmail,
            message:'{Value} is not valid Email'
        }
    },
    mob:{
        type:Number,
        minlength:10
    },
    emer:{
        type:Number,
        minlength:10
    },
    addr:{ type:String},
    city:{type:String},
    state:{ type:String},
    zip:{type:Number}
});

app.post('/savedata',(req,res)=> {
    console.log("Req:", req.body);

    var infor = new user({
        name:req.body.name,
        surname:req.body.surname,
        pass:req.body.pass,
        email:req.body.email,
        mob:req.body.mob,
        emer:req.body.emer,
        addr:req.body.addr,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip
    });

    infor.save().then((suceess)=>{
        console.log(suceess);
    }).catch((err)=>{
        console.log(err)
    });
});

app.listen(5000,()=>{
    console.log("server start on port 5000");
})
