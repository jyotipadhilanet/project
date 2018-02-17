var mongoose=require('../db/db');
var Subject=require('../model/Subject');

exports.newSubject=(req,res)=>{
    var sub=new Subject();

    sub.studentid=req.body.studentid;
    sub.subject=req.body.subject;
    sub.marks=req.body.marks;
    sub.isdel=false;

    sub.save().then((docs)=>{
        console.log(docs)
        res.json("1")
    },(err)=>{
        res.json("0")
    }).catch((err)=>{
        res.json("0")
    })
}

exports.getAll=(req,res)=>{
    Subject.find().then((docs)=>{
        res.json(docs)
    },(err)=>{
        res.json("0")
    }).catch((err)=>{
        res.json("0")
    })
}

exports.getOne=(req,res)=>{
    var id=req.params.id;
    Subject.find({studentid:id}).then((docs)=>{
        res.json(docs)
    },(err)=>{
        res.json("0")
    }).catch((err)=>{
        res.json("0")
    })
}

exports.update=(req,res)=>{
    var id=req.params.id;
    Subject.findOneAndUpdate({_id:id},{
        $set:{
            subject:req.body.subject,
            marks:req.body.marks
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
