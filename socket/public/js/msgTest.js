var {generatemsg}=require('./message');
var expect=require('expect');

describe('generatemsg function detail',()=>{
    it('it should perfectly add object',()=>{
      var from="jyoti";
      var text="hi from jyoti padhi";
      var data=generatemsg(from,text);
     expect(data.createdBy).toBe('number');
     expect(data).toInclude({from,text});
        });
})