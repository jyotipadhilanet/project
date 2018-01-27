var express=require('express');
var app=express();
var url="mongodb://localhost:27017/";
var mongoClient=require('mongodb').MongoClient;
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));

app.use(express.static(__dirname));
app.listen(5000,()=>{
   console.log("application started on port") ;
    mongoClient.connect(url,(err,db)=>{
        if(err) throw err;
        var dbo = db.db("mydb");
        dbo.createCollection("user",(err,res)=>{
            if(err) throw error;
            console.log("collection created");
            db.close();
        });
    });
});

app.post('/postuser',(req,res)=>{
   var nm=req.body.name;
   insert(nm);
});
app.get('/user',(res,resp)=>{
    var data={"name":res.query.name};
    mongoClient.connect(url,(err,db)=>{
        if(err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("user").find(data).toArray((err,res)=>{
            if(err) throw error;
            console.log("fetch successfully");
            db.close();
            resp.send(res);
        });
    });
});

app.get('/select',(req,resp)=>{
    mongoClient.connect(url,(err,db)=>{
        if(err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("user").find({}).toArray((err,res)=>{
            if(err) throw error;
            console.log("fetch successfully");
            db.close();
            resp.send(res);
        });
    });
});

function insert(val){
    mongoClient.connect(url,(err,db)=>{
        if(err) throw err;
        var dbo = db.db("mydb");
        var obj={name:val}
        dbo.collection("user").insertOne((obj),(err,res)=>{
            if(err) throw error;
            console.log("1 document inserted");
            db.close();
      });
    });
}





