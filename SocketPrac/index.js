var app=require('express')();
var server=require('http').Server(app);
var io=require('socket.io')(server);
var {geneartemsg}=require('./message');


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

io.on('connection',(socket)=>{
    console.log("new user connected");

    socket.emit('newMessage',geneartemsg('Admin','Welcome to chat application'))

    socket.broadcast.emit('newMessage',geneartemsg('Admin","New User is connected'))

    socket.on('intro',(part)=>{
        console.log(part)
        io.emit('newMessage',geneartemsg(part.to,part.text))
        })

    socket.on('disconnect',()=>{
        console.log(" user is disconnected");
    })
})

server.listen(3000,()=>{
   console.log("starting on port 3000");
})


