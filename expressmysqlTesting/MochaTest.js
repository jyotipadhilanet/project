var util1=require('./util');
var expact=require('expect');
//Mocka test  example
it('should add',()=>{
   res= util1.add(11,22)
    if(res!==33){
       throw new Error(`Error expected 44 answer is ${res}`);
    }
});
//expact for assertion
it('should square',()=>{
    res= util1.squ(2)
  //  expact(res).toBe(4).toBeAn('number');
  //  expact(12).toNotBeAn(11);
  //  expact({name:"jyoti"}).toInclude({name:"jyoti"})
        // done();
    if(res!==4){
        throw new Error(`Error expected 4 answer is ${res}`);
    }
});