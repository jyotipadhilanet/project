var mongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";

mongoClient.connect(url,(err,db)=>{
    if(err) throw error;
    var dbo=db.db('mydb');


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
    dbo.collection('info').find({},{ _id:0 }).toArray((err,res)=>{
        if(err) throw err;
        console.log(res);
        db.close();
    });

    //for update Collection
    /*  var myquery = { name: "jyoti" };
      var newvalues = {$set: {name: "Mickey"}};
      dbo.collection("info").updateMany(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
      });  */

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



});