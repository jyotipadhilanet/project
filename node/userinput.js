console.log("Example of user input")
console.log("from argument");
var yarg=require('yargs');

console.log(yarg.argv);
console.log(process.argv);
console.log(yarg.argv.title);
console.log(yarg.argv.body);
var cmd=process.argv[2];


if(cmd==="read"){
    console.log("read data");
}
else if(cmd==="write") {
    console.log("write data");
}
else
{
    console.log("idogsdg");
}

