var mongoose=require('../db/db');
var Student=require('../model/Student');

exports.newStudent=(req,res)=>{
    var stu=new Student();

    stu.name=req.body.name;
    stu.email=req.body.email;
    stu.contactno=req.body.contactno;
    stu.isdel=false;

    stu.save().then((docs)=>{
        console.log(docs)
        res.json("1")
    },(err)=>{
        res.json("0")
    }).catch((err)=>{
        res.json("0")
    })
}

exports.getAll=(req,res)=>{
    Student.find().then((docs)=>{
        res.json(docs)
    },(err)=>{
        res.json("0")
    }).catch((err)=>{
        res.json("0")
    })
}

exports.getOne=(req,res)=>{
    var id=req.params.id;
    Student.findOne({_id:id}).then((docs)=>{
        res.json(docs)
    },(err)=>{
        res.json("0")
    }).catch((err)=>{
        res.json("0")
    })
}

exports.update=(req,res)=>{
    var id=req.params.id;
    Student.findOneAndUpdate({_id:id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            contactno:req.body.contactno
        }
    }).then((docs)=>{
        res.json("1")
    },(err)=>{
        res.json("0")
    }).catch((err)=>{
        res.json("0")
    })
}

exports.delete=(req,res)=>{

}
