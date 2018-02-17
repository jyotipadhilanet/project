var mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/StudentApp").then((response)=>{
    console.log('Sucess');
},(err)=>{
    console.log(err);
}).catch((err)=>{
    console.log(err);
})

module.exports=mongoose