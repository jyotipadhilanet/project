var express=require ('express');
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
    res.send("welcome");
});

var state=mongoose.model('state',{
    _id:{
        type:Number
    },
    name:{
        type:String,
        require:true
    }
});
var city=mongoose.model('city',{
    stateid:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true
    }
});


var emp=mongoose.model('emp',{
    name:{
        type:String,
        require:true
    },
    last:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    state:{ type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    }
});

app.get('/cityfetch/:nm',(req,res)=> {
    var msg=req.params.nm;
    console.log(msg);
   if(msg!="Select State"){
       state.find({name:msg},(err, user)=> {
           if (err) throw error;
           city.find({stateid:user[0]._id}, (err, user) => {
               if (err) throw error;
               console.log(user)
               res.send(user);
           });
       })
   }
});

app.get('/sortfetch',(req,res)=> {
    emp.find({}).sort({name:1}).then((user)=>{
        console.log(user)
        res.send(user);
}).catch((err)=>{
        if(err) throw error;
    })
});


app.get('/statefetch',(req,res)=> {
    state.find({},(err, user)=>{
        if(err) throw error;
        console.log(user)
        res.send(user);
    });
});


app.post('/del',(req,res)=>{
    emp.findByIdAndRemove(req.body.id, (err, todo) => {
        console.log(todo._id);
      //  res.send(todo._id);
        emp.find({}).sort({_id:-1}).then((user) => {
            console.log(user)
            res.send(user);
        }).catch((err) => {
            if (err) throw error;
        })
    })
});

app.post('/savedata',(req,res)=> {
    var infor = new emp({
            name: req.body.name,
            last: req.body.last,
            email: req.body.email,
            state: req.body.state,
            city: req.body.city
        });

        infor.save().then((suceess) => {
            console.log(suceess);
           // res.send(suceess);

            emp.find({}).sort({_id:-1}).then((user) => {
                console.log(user)
                res.send(user);
            }).catch((err) => {
                if (err) throw error;
            })
    })
});


app.post('/upd',(req,res)=>{
    console.log('data',req.body);
    var updobj={$set: {name:req.body.name,last:req.body.last,email:req.body.email,state:req.body.state,city:req.body.city}};
    emp.findByIdAndUpdate(req.body._id,updobj,(err, user)=>{
        if (err) throw err;
        console.log('upadted');
    });
    emp.find({}).sort({_id:-1}).then((user) => {
        console.log(user)
        res.send(user);
    }).catch((err) => {
        if (err) throw error;
    })
})

app.post('/login',(req,res)=>{
    var nm=req.body.name;
    var pas=req.body.pass;
    console.log(nm,pas);
    var obj={name:nm,pass:pas};
    emp.findOne({'name':nm,'pass':pas},(err,someValue)=>{
        if (err) throw error;
        res.status(200).send(someValue);
    });
})

app.get('/fetch/:id',(req,res)=> {
    var id=req.params.id;
    console.log(id)
    if( id==1) {
        emp.find({}).limit(3).then((user) => {
            console.log(user)
            res.send(user);
        }).catch((err) => {
            if (err) throw error;
        })
    }
    else if(id>1){
        emp.find({}).limit(3).skip(3*(id-1)).then((user) => {
            console.log(user)
            res.send(user);
        }).catch((err) => {
            if (err) throw error;
        })
    }
});

app.get('/fetchdata',(req,res)=> {
    emp.find({}).sort({_id:-1}).then((user) => {
        console.log(user)
        res.send(user);
    }).catch((err) => {
        if (err) throw error;
    })
});


app.post('/fetchid',(req,res)=> {
    console.log(req.body.id);
    emp.findById(req.body.id).then((user) => {
        console.log(user)
        res.send(user);
    }).catch((err) => {
        if (err) throw error;
    })
});



