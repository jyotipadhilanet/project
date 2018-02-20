var express=require('express')
var app=express();
var mysql=require('mysql')

  var bodyparser=require('body-parser');
  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({extended:true}))

 var passport=require('passport')
 var LocalStrategy=require('passport-local').Strategy
 app.use(passport.initialize())

 passport.serializeUser((user,done)=>{
    console.log("In serialize user")
    return(done(null,user))
})

passport.deserializeUser((user,done)=>{
    console.log("In deserialize user")
    return(done(null,user))
})

passport.use(new LocalStrategy((username,password,done)=>{
    console.log(username,password)
    console.log("In use method");
    var sql="select * from student where name='"+username+"' and password='"+password+"'";
    con.query(sql,(err,info)=>{
        done(null,true);
    });
}))

app.post('/login',passport.authenticate('local',{
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


var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mydb"
})
con.connect((err)=>{
    if(err) throw error
    console.log("connected successfully")
})

app.get('/',(req,res)=>{
    console.log('welcome to mysql')
})

app.get('/fetchAll',(req,res)=>{
    console.log('In fetch All method');
    var sql="SELECT * FROM dept where flag=0";
    con.query(sql,(err,data)=>{
        if(err) throw error
        console.log(data);
        res.send(data)
    })
})

app.get('/fetchAll/:id',(req,res)=>{
    console.log('In fetch All id method');
    var id=req.params.id
    var sql="select * from dept where deptid="+id+"";
    con.query(sql,(err,data)=>{
        if(err)  console.log(err)
        console.log(data);
        res.send(data)
    })
})

app.post('/insert/dept',(req,res)=>{
     var name=req.body.name;
    var sql="insert into dept(name) values('"+name+"');";
    con.query(sql,(err,data)=>{
        if(err)console.log(err)
         console.log(data);
        res.send('inserted successfully')
    })
})

app.put('/upd/:id',(req,res)=>{
    var id=req.params.id;
    var name=req.body.name;
    var sql="update dept set name='"+name+"' where deptid="+id+"";
    con.query(sql,(err,data)=>{
        if(err) console.log(err)
        console.log(data);
        res.send(data)
    })
})

app.delete('/deptDel/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id);
    var sql="update dept set flag=1 where deptid="+id+"";
    con.query(sql,(err,data)=>{
        if(err) console.log(err)
        console.log(data);
        res.send('flag changed')
    })
})


app.get('/fetchEmp',(req,res)=>{
    console.log('In fetch All method');
    var sql="SELECT d.name,e.* FROM emp as e,dept as d where e.deptid=d.deptid";
    con.query(sql,(err,data)=>{
        if(err) throw error
        console.log(data);
        res.send(data)
    })
})

app.get('/fetchEmp/:id',(req,res)=>{
    console.log('In fetch All id method');
    var id=req.params.id
    var sql="select d.name,e.* from dept as d,emp as e where e.deptid=d.deptid and e.empid="+id;
    con.query(sql,(err,data)=>{
        if(err)  console.log(err)
        console.log(data);
        res.send(data)
    })
})

app.post('/insert/emp',(req,res)=>{
    var name=req.body.name;
    var did=req.body.did;
    var sql="CALL insertEmp('" + name + "'," + did +")";
    con.query(sql,(err,data)=>{
        if(err)console.log(err)
        console.log(data);
        res.send('inserted in emp successfully')
    })
})

app.put('/updEmp/:id',(req,res)=>{
    console.log('in update employee')
    var id=req.params.id;
    var name=req.body.name;
    var did=req.body.did;
    var sql="call updateEmp("+id+",'"+name+"',"+did+")";
    con.query(sql,(err,data)=>{
        if(err) console.log(err)
        console.log(data);
        res.send(data)
    })
})

app.delete('/deptDel/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id);
    var sql="update dept set flag=1 where deptid="+id+"";
    con.query(sql,(err,data)=>{
        if(err) console.log(err)
        console.log(data);
        res.send('flag changed')
    })
})


app.get('/noEmp',(req,res)=>{
    var sql="SELECT `countRow`() AS `countRow`";
    con.query(sql,(err,data)=>{
        if(err) console.log(err)
        else {
            console.log(data);
            res.send(data)
        }
    })
})


//CREATE PROCEDURE p(IN id_val INT) BEGIN INSERT INTO test(id) VALUES(id_val); END;
//CREATE function p(IN id_val INT) return INT is BEGIN
// select name from emp where id=id_val  END;


/*BEGIN
DECLARE cnt INT;
select count(*) into cnt from emp;
RETURN cnt;
END */



app.listen(5000,()=>{
    console.log('server start on 5000')
    })

