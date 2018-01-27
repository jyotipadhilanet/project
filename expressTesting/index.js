var express=require('express');
var app=express();
var hbs=require('hbs');
var fs=require('fs');

app.use(express.static(__dirname))
app.set('view engine','hbs')
hbs.registerPartials(__dirname+'/views');
hbs.registerHelper('getCurrentYear',()=>{
   return "copyright  "+ new Date().getFullYear();
});

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    fs.appendFile('maintainance.js',"\n"+log,err=>{
        if(err) throw error;
    });
    next();
})


app.get('/',(req,res)=>{
    res.send("Hello world");
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:"about page",
        body:"this is about page",
});
});
app.get('/help',(req,res)=>{
    res.render('help.hbs',{
    title:"help page",
    body:"this is help page"
});
});


app.get('/bad',(req,res)=>{
    res.send({
    errormsg:"unable to send request"
})
})
app.listen(8000,()=>{
    console.log("server is started on port 8000" )
});