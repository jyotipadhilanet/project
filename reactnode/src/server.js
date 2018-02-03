var express= require('express');
var app=express();
app.use(express.static(__dirname));

var emp=mongoose.model('emp',empSchema);
app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin',' http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Comment////////////////////////////////////////