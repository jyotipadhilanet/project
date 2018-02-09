var socket = io();
var name="";
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});



jQuery('#send').on('click',(e)=>{
  e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('#msg').val()
    },function (data) {
        console.log(data)
    })
})

jQuery('#loc').on('click',(e)=>{
    e.preventDefault()
   if(!navigator.geolocation)
   {
       alert("navigator not supported in your browser")
   }
   else{
       navigator.geolocation.getCurrentPosition((position)=>{
           socket.emit('createlocMSG',{
               lat:position.coords.latitude,
               long:position.coords.longitude
           })
       },()=>{
           alert("Unable to fetch location")
       })
   }
})


