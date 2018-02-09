var express=require('express');
var app=express();

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
app.use(bodyparser.urlencoded({encoded:true}))

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", req.headers.origin);
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

var user=mongoose.model('passportGmail',{
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
        // asynchronous // Event Loop
        console.log(profile);

        //find the user in the database based on their facebook id
        user.findOne({ 'id' : profile.id }, (err, user)=> {
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


app.listen(5000,()=>{
    console.log("port start on 5000");
    mongoose.connect(url)
})


app.get('/',(req,res)=>{
    console.log("In get ");
    res.send({msg:"fail"});
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


