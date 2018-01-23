console.log("Hello world");
var fs=require('fs');
var os=require('os');
var info=os.userInfo();
fs.appendFile('greet.txt',`Helo ${info}`,err => {
    if(err) throw error
})
      console.log("Complete Hello world")