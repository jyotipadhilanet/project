var express=require('express');
var app=express();
var mysql=require('mysql');

var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"mydb"

})
con.connect((err)=>{
    if (err) throw error;
    console.log("connected");
   /*  con.query("create database mydb",(err)=>{
         if (err) throw error;
           console.log("Database created");
         con.query("create table tbl (id int  primary key,name varchar(250),address varchar(250));",(err)=>{
               if (err) throw error;
              console.log("Table created");
          })
     }) */
})

//select * from tbl limit 10,3 (start,length)

/*via writing stored procedure
#Creating Procedure
DELIMITER $
CREATE PROCEDURE proc()
BEGIN SELECT "hello from proc"; \
END $
#Calling the Procedure CALL proc();
#Result
hello from proc */

/*via writing stored function
#Creating the FUNCTION
DELIMITER $
CREATE FUNCTION func() RETURNS CHAR(100)
BEGIN
RETURN "hello from func";
END $
#Calling func()
SELECT func(); */



//stored procedure
app.get('/fetchInfo/:id',(req,res)=>{
    var myid=req.params.id
    var sql="call alldata("+myid+")";
    con.query(sql,(err,info)=>{
        if(err) throw error;
        console.log("information is=",info[0]);
    })
})

app.get('/fetchAll',(req,res)=>{
    var myid=req.params.id
    var sql="call alldata";
    con.query(sql,(err,info)=>{
        if(err) throw error;
        console.log("information is=",info[0][0].length);
    })
})


app.get('/insert/:nm/:addr',(req,res)=> {
    var nm1 = req.params.nm;
     var add1 = req.params.addr;
     var sql="insert into tbl(name,address) values ('"+nm1+"','"+add1+"');"
     con.query(sql, (err,res) => {
     if(err) throw error;
           console.log("Insert into the table");  });
});

app.get('/delete/:id',(req,res)=> {
    var sql="delete from tbl where id="+req.params.id;
    con.query(sql, (err,res) => {
        if(err) throw error;
        console.log("delete specified id from table");  });
});

app.get('/update/:id/:nm/:addr',(req,res)=> {
    var nm1 = req.params.nm;
    var add1 = req.params.addr;
    var sql="update tbl set name='"+nm1+"',address='"+add1+"' where id="+req.params.id;
    con.query(sql, (err,res) => {
        if(err) throw error;
        console.log("update specified id from table");  });
});

app.get('/',(req,res)=> {
        console.log("welcome to mysql");
});




app.listen(8000,()=>{
    console.log("server is started on port 8000")
});