var express=require('express')
var app=express()

var validator=require('validator')
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');
var url='mongodb://localhost:27017/mydb';
var passport=require('passport');
var passport=require('passport-local').Strategy;

mongoose.Promise=global.Promise;
mongoose.connect(url)

var bodyparser=require('body-parser')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


var stud=mongoose.model('stud',{
    name:{
        type:String,
        require:true
    },
    pass:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        validate:{
            validator:validator.isEmail,
            message:"{VALUE} is not valid"
        }
    },
    flag:{
        type:Number,
        require:true
    }
})


var sub=mongoose.model('subject', {
    studid:{
        type:String,
        require:true
    },
    php: {
        type: Number,
        require: true
    },
    unix: {
        type: Number,
        require: true
    },
    java: {
        type: Number,
        require: true
    },
    flag: {
        type: Number,
        require: true
    }
})


app.get('/api/student/:id',(req,res)=>{
    console.log(req.params.id)
    stud.find({flag:1,_id:req.params.id}).then((result)=>{
        console.log(result)
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
})


app.get('/api/student',(req,res)=>{
    stud.find({flag:1}).then((result)=>{
        console.log(result)
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
})





app.post('/api/student',(req,res)=>{
    console.log(req.body)
    var  newstud=new stud(req.body)
    newstud.flag=1
    // newstud.pass=bcrypt.hashSync(req.body.pass,10)
    newstud.save().then((result)=>{
        console.log(result)
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
})






app.delete('/api/student/:id',(req,res)=>{
    console.log(req.params.id)
    stud.findById(req.params.id).then((p)=>{
        console.log(p)
        p.flag=0
        p.save().then((result)=>{
            console.log('flag changed successfully')
            res.send(result)
        })
    }).catch((err)=>{
        res.send(err)
    })
})








app.put('/api/student/:id',(req,res)=>{
    console.log(req.params.id)
    stud.find({_id:req.params.id}).then((p)=>{
        console.log(p)
        p.name=req.body.name
        p.age=req.body.age
        p.address=req.body.address
        p.email=req.body.email
        p.save().then((result)=>{
            console.log('updated successfully')
            res.send(result)
        })
    }).catch((err)=>{
        res.send(err)
    })
})








app.get('/api/mark/student/:id',(req,res)=>{
    console.log(req.params.id)
    sub.find({flag:1,studid:req.params.id}).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
})




app.get('/api/mark',(req,res)=>{
    sub.find({flag:1}).then((result)=>{
        console.log(result.length)
        console.log(result.studid)
        stud.find({_id:result.studid}).then((info)=>{
            console.log(info.name)
            console.log(result.java)
            console.log(result.php)
            console.log(result.unix)
        })
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
})


app.post('/api/mark',(req,res)=>{
    var  newSub=new sub(req.body)
    newSub.flag=1
    newSub.save().then((result)=>{
        console.log(result)
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
})


app.delete('/api/mark/:id',(req,res)=>{
    console.log(req.params.id)
    sub.find({studid:req.params.id}).then((p)=>{
        console.log(p)
        p.flag=0;
        p.save().then((result)=>{
            console.log('updated successfully')
            res.send(result)
        })
    }).catch((err)=>{
        res.send(err)
    })
})

app.put('/api/mark/:id',(req,res)=>{
    console.log(req.params.id)
    sub.find({studid:req.params.id}).then((p)=>{
        p.java=req.body.java
        p.unix=req.body.unix
        p.php=req.body.php
        p.save().then((result)=>{
            console.log('flag changed successfully')
            res.send(result)
        })

    }).catch((err)=>{
        res.send(err)
    })
})


app.listen(5000,function () {
    console.log('connected to server 5000')
    mongoose.connect(url)
    console.log('connected to Database')
});
