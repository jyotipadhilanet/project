var fs=require('fs');
console.log("Here we see json exapmle");
var obj= {
    name: "jyoti",
    sirname: "padhi"
}
console.log(typeof obj);
var str=JSON.stringify(obj);
console.log(typeof str);
console.log(`string is ${str}`);

var obj2=JSON.parse('{"name":"jyoti","sirname":"padhi"}');
console.log(typeof obj2);
console.log(obj2);

var obj3={
    name1: "jyoti",
    sirname1: "padhi"
}
var str2=JSON.stringify(obj3);
fs.writeFileSync('data.json',str2);

var str4=fs.readFileSync('data.json');
var obj2=JSON.parse(str4);
console.log(typeof obj2);
console.log(obj2);
