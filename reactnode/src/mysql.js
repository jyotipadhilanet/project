var express=require('express');
var app=express();
var mysql=require('DBMongoMysql/mysql');

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

app.listen(8000,()=>{
    console.log("server is started on port 8000")
});