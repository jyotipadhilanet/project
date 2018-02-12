var express=require('express');
var app=express();

var validator=require('validator');
var bodyparser=require('body-parser');

var mongoose=require('mongoose');
var url="mongodb://localhost:27017/mydb";
mongoose.Promise=global.Promise;

var passport=require('passport');
var GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
var configAuth=require("./auth");

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
});

passport.serializeUser((user,done)=>{
    console.log("in serialize Method");
    done(null,user)
});
passport.deserializeUser((user,done)=>{
    console.log("in deserialize Method");
    done(null,user)
});

var userData=mongoose.model('passportGmail',{
    id:String,
    token:String,
    email:String,
    name:String
});


passport.use("google",new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    },
    // google will send back the token and profile
    (accessToken, refreshToken, profile, done)=> {
        console.log(profile);

        userData.findOne({ 'id' : profile.id }, (err, user)=> {
            if (err) return done(err);

            if (user) {
                return done(null, user);
            } else {
                var newUser = new userData({
                    id:profile.id,
                    token:accessToken,
                    name:profile.displayName,
                    email:profile.emails[0].value
                });
                console.log(newUser);

                newUser.save().then((doc)=>{
                    console.log("Saved User :: = "+doc);
                    return doc;
                }).catch((err)=>{
                    console.log("User Error :: = "+err);
                    return err;
                });
            }

        });
    }));


app.listen(5000,()=>{
    console.log("port start on 5000");
    mongoose.connect(url)
})


app.get('/',(req,res)=>{
    console.log("In get ");
    res.send({msg:"fail"});
});
app.get('/profile',(req,res)=>{
    res.send({msg:"sucessful"});
});

app.get('/auth/google', passport.authenticate('google',
    { scope: ['profile','email'] }
    )
);

app.get('/auth/google/callback',passport.authenticate('google', {
        successRedirect: 'http://localhost:3000/crud',
        failureRedirect: '/'
    }
));

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
    var obj={name:nm,pass:pas};
    user.findOne({'name':nm,'pass':pas},(err,someValue)=>{
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














