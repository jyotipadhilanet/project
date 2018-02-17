var express=require('express');
var app=express();
//var fileUpload=require('express-fileupload')
var validator=require('express-validator')
var bcrypt=require('bcryptjs')
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var url='mongodb://localhost:27017/mydb';

var bodyparser=require('body-parser')
//var validator=require('validator')
app.use(bodyparser.json())
//app.use(fileUpload());
app.use(validator())
app.use(bodyparser.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
});


app.listen(5000,()=>{
    console.log('port start on server 5000')
    mongoose.connect(url)
    console.log('successfully connected to the database')
})

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

var stud=mongoose.model('stud',{
    sname:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        validate:{
            validator:validator.isEmail
        }
    },
    hobbies:{
        type:String
    },
    state:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    photo: {
        type: String,
        require: true
    },
    flag:{
        type: Number,
        require: true
    }
})

app.post('/insert',(req,res)=>{
   // var nm=req.body.sname
   //  var age=req.body.age
   //  var pass=req.body.pass
   //  var city=req.body.city
   //  var gen=req.body.gender
   //  var state=req.body.state
   //  var cont=req.body.contact
   //  var email=req.body.email
   //  var hobbies=req.body.hobbies
   //  var photo=req.body.photo
   //
   //  //var newstud=new stud({sname:nm,age:age,password:data.toString(),state:state,city:city,gender:gen,contact:cont,email:email,hobbies:hobbies,photo:photo,flag:1})
   //  bcrypt.genSalt(10,(err,salt)=>{
   //      console.log("In bcrpt");
   //      bcrypt.hash(pass,salt,(err,hash)=>{
   //          console.log(hash)
   //          hashpass=hash
   //      })
   //  })
   //  console.log("Hash pwd data=",hashpass);
   //
   //  user.hash_password=bcrypt.hashSync(req.body.password,10);
   //
   //
   //
   //  var newstud=new stud({sname:nm,age:age,password:hashpass,state:state,city:city,gender:gen,contact:cont,email:email,hobbies:hobbies,photo:photo,flag:1})
   //  newstud.save().then((info)=>{
   //      console.log("In bcrpt");
   //      console.log("inserted successfully=",info)
   //   }).catch((err)=>{
   //       console.log("error is=",err)
   //   })
    //console.log(req.body);
    // if (!req.files)
    //     return res.status(400).send('No files were uploaded.');
    // let sampleFile = req.files.photo;
    // sampleFile.mv(__dirname+'/Image/jyoti.jpg'), function(err) {
    //     if (err)
    //         return res.status(500).send(err);
    //     console.log('File uploaded!');
    // }

    req.checkBody('email', 'Invalid email').notEmpty().isEmail().isUnique();
    req.checkBody('password', 'Invalid possword').notEmpty().len(8, 30);
    req.checkBody('first_name', 'Invalid first_name').notEmpty().isAlpha();
    req.checkBody('last_name', 'Invalid last_name').notEmpty().isAlpha();
    req.checkBody('dateofbirth', 'Invalid dateofbirth').notEmpty.isDate();


    var error=new validationErrors()


    console.log("at insert time......")
        var newstud=new stud(req.body);
        newstud.password=bcrypt.hashSync(req.body.password,10);
        newstud.save().then((info)=>{
            console.log("inserted successfully=",info)
            res.send(info)
        }).catch((err)=>{
            console.log("error is=",err)
        })

})

app.post('/del',(req,res)=>{
    var id=req.body.id
    stud.findById(id).then((p)=>{
        p.flag=0
        p.save().then((info)=>{
            console.log("flag changed successfully")
            res.send(info)
        }).catch((err)=>{
            console.log("flag not set=",err)
        })
    }).catch((err)=>{
        console.log("can't find id=",err)
    });
})

app.get('/statefetch',(req,res)=>{
   state.find({}).then((info)=>{
         res.send(info)
        }).catch((err)=>{
            console.log("not find",err)
        })
})

app.post('/cityfetch/:statenm',(req,res)=> {
    console.log(req.params.statenm)
    if(req.params.statenm!='Select State') {
        state.find({name: req.params.statenm}).then((info) => {
            console.log(info)
            city.find({stateid: info[0]._id}).then((data) => {
                console.log("city is=", data)
                res.send(data)
            }).catch((err) => {
                console.log("not find city", err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }
})


app.post('/upd',(req,res)=>{
    console.log("at update time......")
    var id=req.body.id
    console.log(id)
    stud.findById(id).then((p)=>{
        p.sname=req.body.sname;
        p.age=req.body.age
        p.password=req.body.pass
        p.contact=req.body.contact
        p.gender=req.body.gender
        p.state=req.body.state
        p.city=req.body.city
        p.email=req.body.email
        p.hobbies=req.body.hobbies
        p.photo=req.body.photo
        p.save().then((info)=>{
            console.log("updated successfully=",info)
            res.send(info)
        }).catch((err)=>{
            console.log("not successfully updated flag not set=",err)
        })
    }).catch((err)=>{
        console.log("can't find id=",err)
    })
})

app.get('/fetchdata',(req,res)=>{
    stud.find({}).sort({_id:-1}).then((result)=>{
        //console.log(result)
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
})


app.post('/fetchid',(req,res)=>{
    stud.find({_id:req.body.id}).then((result)=>{
        console.log(result)
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
})