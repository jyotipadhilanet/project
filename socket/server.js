const express = require('express');
var app = express();
const http=require('http');
const socketIO=require('socket.io');
const server=http.createServer(app);
const io=socketIO(server);
const {generatemsg}=require('./js/message');

//var server = require('http').createServer(app);
//var io = require('socket.io')(server);

io.on('connection',(socket)=>{
    console.log(`new user is connetced`);

    //when 1st time user is connected
    socket.emit('newMessage',generatemsg("Admin","Welcome to the chat App from socket.emit"));

    //whenever new user is connected
    socket.broadcast.emit('newMessage',generatemsg("Admin","new user is connected with our server"));

    socket.emit('newEmail',generatemsg("Admin","\"Hey! i m from the server"));

    socket.on('createEmail',(user)=>{
        console.log(user);
        //whenever new user is connected it always create
       /* io.emit('newMessage',{
            to:user.to,
            text:user.text
        }) */
    })

    socket.on('disconnect',()=>{
        console.log(`user is Disconnetced`);
    })
});


app.use(express.static(__dirname+"/public"));
server.listen(3000, () => {
    console.log(`Server is up on 3000`);
});
