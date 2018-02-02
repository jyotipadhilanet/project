var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

io.on('connection', (socket)=>{
    console.log('a user connected');

    socket.on('disconnect',()=>{
        console.log('a user  disconnected');
    })

});

server.listen(3000, function(){
    console.log('listening on port:3000');
});