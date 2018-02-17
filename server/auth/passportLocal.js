var passport=require('passport');
var LocalStrategy=require('passport-local');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');

var User=require('../model/User');

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})

passport.use(new LocalStrategy((username,password,done)=>{
    User.findOne({username:username}).then((user)=>{
        if(!user)
        {
            console.log("In Main if")
            return done(null,false);
        }
        else
        {
            if(!bcrypt.compareSync(password,user.password))
            {
                console.log("In else if")
                return done(null,false);
            }
            else
            {
                var t=jwt.sign({username},'STUDENT');
                User.findOneAndUpdate({username:user.username,password:user.password},{
                    $set:{
                        token:t
                    }
                }).then((docs)=>{
                    console.log(t);
                    token=t;
                    return done(null,true);
                },(err)=>{
                    console.log("inner err: " + err)
                    return done(null,false);
                }).catch((err)=>{
                    console.log("inner catch: " + err)
                    return done(null,false);
                })
            }
        }
    },(err)=>{
        console.log("outer err: " + err)
        return done(null,false);
    }).catch((err)=>{
        console.log("outer catch: " + err)
        return done(null,false);
    })
}))

module.exports=passport