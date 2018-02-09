auth.js
------------------
module.exports = {
    'googleAuth' : {
        'clientID'      :'231781452116-snhr4aha6r41o3sp32jgjceqqqt1ernc.apps.googleusercontent.com' , // your App ID
        'clientSecret'  :'EG82fxoxPMqmU09z5QCNYvM-', // your App Secret
        'callbackURL'   : 'http://localhost:5555/auth/google/callback'
    }
};


passport.js
-------------------
const express=require('express');
const passport=require('passport');
const bodyParser=require('body-parser');
const {mongoose}=require("../db/conn");
const {gg}=require("../models/Users");
var cors=require('cors');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var configAuth=require("./auth");
var app=express();

passport.serializeUser((user,done)=>{
    console.log("serializer");
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    console.log("deserializer");
    done(null,user);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    encoded:true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
});

passport.use("google",new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    },
    // google will send back the token and profile
    (accessToken, refreshToken, profile, done)=> {
        // asynchronous // Event Loop
        console.log(profile);

        //find the user in the database based on their facebook id
        gg.findOne({ 'id' : profile.id }, (err, user)=> {

            // if there is an error, stop everything and return that error connecting to the database
            if (err) return done(err);

            // if the user is found, then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                var newUser = new gg({
                    id:profile.id,
                    token:accessToken,
                    name:profile.displayName,
                    email:profile.emails[0].value
                });
                console.log(newUser);

                // save our user to the database
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

require('../routes')(app,passport);
app.listen(5555,()=>{
    console.log('connected to server....');
});



conn.js
-------------------
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/GoogleDB").then(() =>  console.log('Connection Successful'))
    .catch((err) => console.error(err));
module.exports={mongoose};



Users.js
--------------
const mongoose = require('mongoose');

var googleSchema=new mongoose.Schema({
    id:String,
    token:String,
    email:String,
    name:String
});
var gg=mongoose.model("google",googleSchema);
module.exports = {gg};



routes.js
------------------
var {User}=require('./models/Users');
module.exports=(app,passport)=>{

    app.get('/',(req,res)=>{
        console.log("In get ");
        res.send({msg:"success"});
    });
    app.get('/profile',(req,res)=>{
        res.send({msg:"user"});
    });

    // google ROUTES
    app.get('/auth/google', passport.authenticate('google',
        { scope: ['profile','email'] }
        )
    );

    app.get('/auth/google/callback',passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }
    ));

};

