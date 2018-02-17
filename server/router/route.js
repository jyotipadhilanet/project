exports.route=(app)=>{
    var userController=require('../controller/userController')
    var studentController=require('../controller/studentController')
    var subjectController=require('../controller/subjectController')
    var authenticate=require('../middleware/authenticate');
    var passportLocal=require('../auth/passportLocal');

    // signUp and signIn
    app.post("/signUp",userController.signUp)
    app.post("/signIn",passportLocal.authenticate('local',{
        successRedirect:"/success",
        failureRedirect:"/fail"
    }));

    app.get("/success",(req,res)=>{
        res.json("1")
    })

    app.get("/fail",(req,res)=>{
        res.json("0")
    })

    //student
    app.post("/api/student",authenticate,studentController.newStudent);
    app.get("/api/student",authenticate,studentController.getAll);
    app.get("/api/student/:id",authenticate,studentController.getOne);
    app.put("/api/student/:id",authenticate,studentController.update);

    //subject
    app.post("/api/marks",authenticate,subjectController.newSubject);
    app.get("/api/marks",authenticate,subjectController.getAll);
    app.get("/api/marks/student/:id",authenticate,subjectController.getOne);
    app.put("/api/marks/:id",authenticate,subjectController.update);
}