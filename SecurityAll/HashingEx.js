const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

//bcrypt method from encode
var pass='jyoti123';
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(pass,salt,(err,hash)=>{
        console.log('bcrypt hash data=',hash)
    })
})

//bcrypt compare method from encode
var hashd='$2a$10$S4d2AlRElgimiTtm7VmQxeYAeckFB08SozSJ7lFhRf3F3gu3L7Ze6';
bcrypt.compare('jyoti',hashd,(err,res)=>{
    console.log(res);
})



//SHA256 method
var message="I m jyoti";
var hashdata=SHA256(message).toString();
console.log('your message=',message);
console.log('your hash data=',hashdata);

var obj={
    id:5
}
var data={
    obj,
    hash:SHA256(JSON.stringify(obj)).toString()
}

var obj={
    id:6
}
var hashdt=SHA256(JSON.stringify(obj)).toString()
if(hashdt===data.hash){
    console.log("value is same")
}
else {
    console.log("value is changed")
}


//jwt method
var data={
    id:10
}
var token=jwt.sign(data,'jyoti123');
console.log('Token is=',token);

var decoded=jwt.verify(token,'jyoti123')
console.log('Decoded data is=',decoded);


