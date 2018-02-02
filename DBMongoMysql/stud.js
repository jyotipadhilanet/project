var express=require ('express')
var app=express();
var mongoose=require('mongoose');
var url="mongodb://localhost:27017/mydb";
mongoose.Promise=global.Promise;

var validator=require('validator');
var bodyParser=require('body-parser');
app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(5000,()=>{
    console.log("server start on port 5000");
    mongoose.connect(url);
});

app.get('/',(req,res)=>{
    res.send("welcome to vnsgu site");
});

var user=mongoose.model('info',{
    name:{
        type:String,
        require:true
    },
    surname:{
        type:String,
        require:true
    },
    pass:{
        type:String,
        require:true
    },
    email:{
        type:String
    },
    mob:{
        type:String
    },
    emer:{
        type:String
    },
    addr:{ type:String},
    city:{type:String},
    state:{ type:String},
    zip:{type:String}
});

app.post('/del',(req,res)=>{
    user.findByIdAndRemove(req.body.id, (err, todo) => {
        console.log(todo._id);
        user.find({}, (err, user) => {
            if (err) throw error;
            res.status(200).send(user);
        });
    })
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

app.post('/upd',(req,res)=>{
    var updobj={$set: {name:req.body.name,surname:req.body.surname,email:req.body.email,mob:req.body.mob,add:req.body.addr,city:req.body.city}};
    user.findByIdAndUpdate(req.body._id,updobj,(err, user)=>{
        if (err) throw err;
        console.log('upadted');
    });
    user.find({},(err,user)=>{
        if (err) throw err;
        res.send(user)
    })
})

app.post('/login',(req,res)=>{
    var nm=req.body.name;
    var pas=req.body.pass;
    console.log(nm,pas);
    var obj={name:nm,pass:pas};
    user.findOne({'name':nm,'pass':pas},(err,someValue)=>{
        if (err) throw error;
        res.status(200).send(someValue);
    });
})

app.get('/fetch',(req,res)=> {
    user.find({},(err, user)=>{
        if(err) throw error;
        res.send(user);
    });
});