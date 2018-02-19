var express=require('express');
var app=express();
var mysql=require('mysql');
var bodyparser=require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))


var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
app.use(passport.initialize());
//connection for mysql
var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"mydb"

})
con.connect((err)=>{
    if (err) throw error;
    console.log("connected");
})
// pasport serialization
passport.serializeUser((user,done)=>{
    console.log("in serialize Method");
    done(null,user)
});
passport.deserializeUser((user,done)=>{
    console.log("in deserialize Method");
    done(null,user)
});

//passport use

passport.use(new LocalStrategy((username,password,done)=>{
    console.log(username,password);
    console.log("In use method");
    var sql="select * from student where name='"+username+"' and password='"+password+"'";
    con.query(sql,(err,info)=>{
        done(null,user);
    });

}));
app.get('/api/student',(req,res)=>{
    var sql="select * from student";
    con.query(sql,(err,data)=>{
        if(err) throw error;
        console.log(data);
        res.send(data);
    })

});
app.get('/api/student/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id);
    var sql="select * from student where id="+id;
    console.log(id);
    con.query(sql,(err,info)=>{
        if(err) throw error;
        console.log("information is=",info);
        res.send(info)
    })

})

app.post('/api/student',(req,res)=>{
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    var sql="insert into student(name,password,email) values ('"+name+"','"+password+"','"+email+"');"
    con.query(sql, (err,res) => {
        if(err) throw error;
        console.log("Insert into the table");  });
});

app.post('/data',passport.authenticate('local',{
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

app.delete('/api/student/:id',(req,res)=> {
    var sql="delete from student where id="+req.params.id;
    con.query(sql, (err,res) => {
        if(err) throw error;
        console.log("delete specified id from table");  });
});
app.put('/api/student/:id',(req,res)=> {
    var name = req.body.name;
    var password = req.body.pssword;
    var email = req.body.email;
    var id = req.params.id;
    var sql="update student set name='"+name+"',password='"+password+"' where id="+req.params.id;
    con.query(sql, (err,res) => {
        if(err) throw error;
        console.log("update specified id from table");  });
});
app.get('/api/student',(req,res)=>{
    var sql="select * from student";
    con.query(sql,(err,data)=>{
        if(err) throw error;
        console.log(data);
        res.send(data);
    })

});
app.get('/api/marks',(req,res)=>{
    var sql="select s.name,m.* from marks as m,student as s where s.id=m.sid";
    con.query(sql,(err,data)=>{
        if(err) throw error;
        console.log(data);
        res.send(data);
    })

});
app.delete('/api/marks/:id',(req,res)=> {
    var sql="delete from marks where id="+req.params.id;
    con.query(sql, (err,res) => {
        if(err) throw error;
        console.log("delete specified id from table");  });
});

app.put('/api/marks/:id',(req,res)=> {
    var sid = req.body.name;
    var marks = req.body.pssword;
    var id = req.params.id;
    var sql="update student set sid='"+sid+"',marks='"+marks+"' where id="+req.params.id;
    con.query(sql, (err,res) => {
        if(err) throw error;
        console.log("update specified id from table");  });
});
app.get('/api/marks/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id);
    var sql="select * from marks where id="+id;
    console.log(id);
    con.query(sql,(err,info)=>{
        if(err) throw error;
        console.log("information is=",info);
        res.send(info)
    })

})

app.post('/api/marks',(req,res)=>{
    var sid = req.body.name;
    var marks = req.body.pssword;
    var id = req.params.id;
    var sql="insert into student(id,sid,marks) values ('"+id+"','"+sid+"','"+marks+"');"
    con.query(sql, (err,res) => {
        if(err) throw error;
        console.log("Insert into the table");  });
});

app.get('/',(req,res)=> {
    console.log("welcome to mysql");
});

app.listen(5000,()=>{
    console.log("port start on 5000");
});

