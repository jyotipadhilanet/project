var mongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/mydb";

mongoClient.connect(url,(err,db)=>{
    if(err) throw error;

    db.system.js.save( { _id : "Sum" ,
        value : function(values)
        {
            var total = 0;
            for(var i = 0; i < values.length; i++)
                total += values[i];
            return total;
        }});
    db.loadServerScript();
    db.Sum(50);

});


    //for update Collection
    /*  var myquery = { name: "jyoti" };
      var newvalues = {$set: {name: "Mickey"}};
      dbo.collection("info").updateMany(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
      });  */

    //create collection
    /*  dbo.createCollection("info",(err,res)=>{
          console.log("collection create");  */

    //single record inserted
    /*   var myobj = { name: "Company Inc", address: "Highway 37" };
       dbo.collection("info").insertOne(myobj, function(err, res) {
           if (err) throw err;
           console.log("1 document inserted"); */

    //multiple record inserted
    /*  var myobj = [
          { _id: 1, name: 'Chocolate Heaven'},
          { _id: 2, name: 'Tasty Lemon'},
          { _id: 3, name: 'Vanilla Dream'}
      ];
      dbo.collection('info').insertMany(myobj,(err,res)=>{
        if (err) throw error;
          console.log(res);
          db.close();
      })*/

    //find single object
    /* dbo.collection('info').findOne({},(err,res)=>{
      if(err) throw err;
      console.log(res.name);
    }) */

    //find all object
    /* dbo.collection('info').find({}).toArray((err,res)=>{
        if(err) throw err;
        console.log(res);
    }) */

    //want specific property from object
    /* var query = { address: "Mountain 21" };
      var query1 = { name: /^T/ };
      dbo.collection('info').find(query1).toArray((err,res)=>{
          if(err) throw err;
       //   console.log(res[2].name);
          console.log(res);
         db.close();
      });*/

    ///find specific property from object
    /* dbo.collection('info').find({},{ _id:0 }).toArray((err,res)=>{
         if(err) throw err;
         console.log(res);
         db.close();
     }); */


     //stored procedure in mongodb
     //    db.system.js.save({_id:”sum”,value:function(x,y){return x+y}});

 /*   console.log(db.eval(function(x,y) { return addNumbers(x, y); }, 17, 25))

    dbo.collection('system.js', function (e, coll) {
        if (e)  throw e

        coll.save({_id:"addNumbers", value:function(x, y){ return x + y; }});

        // coll.save({
        //     "_id" : "myFunction",
        //     "value" : "function myFunction() { return 123; }"
        // }, function (e) {
        //     if (e)  throw e

       console.log(dbo.eval('addNumbers(17, 25)'))
        //     dbo.eval("addNumbers", function (e, result) {
        //         if (e)  throw e
        //            console.log(result)
        //       //  callback(undefined, result);
        //     });
        //
        // });
    });


  //  db.collection.save()
    db.system.js.save(
        {
            _id: "echoFunction",
            value : function(x) { return x; }
        }
    )

    db.system.js.save(
        {
            _id : "myAddFunction" ,
            value : function (x, y){ return x + y; }
        }
    );

    db.loadServerScripts();

    echoFunction(3);

    myAddFunction(3, 5);  */














    // db.system.js.save({_id:"addNumbers", value:function(x, y){ return x + y; }})
   // console.log(db.eval('addNumbers(17, 25)'));


     //sorting example
     /*      dbo.collection('info').find(query1).sort({name:1}).toArray((err,res)=>{
           console.log(res)
      }) */

//for delete data
    /*  var query1 = { address: /^S/ };
     dbo.collection('info').deleteMany(query1,(err,res)=>{
         console.log(res.result.n);
     }) */

    //for drop collection
    /*     dbo.dropCollection('info',(err,res)=>{
         if (err) throw error;
         if (res) console.log("Collection deleted");
     }); */


    //for join
    /*  dbo.collection('orders').aggregate([
          { $lookup:
              {
                  from: 'products',
                  localField: 'product_id',
                  foreignField: '_id',
                  as: 'orderdetails'
              }
          }
      ],(err, res)=> {
          if (err) throw err;
          console.log(JSON.stringify(res));
      }); */

