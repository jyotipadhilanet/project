var generatemsg=(from,text)=>{
    return{
        from,
        text,
        createdBy:new Date().getTime()
    }
}
module.export={generatemsg};