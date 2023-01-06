const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const md5 = require("md5");




app.use(express.static(__dirname));
//setup for storing images 

// ==============================================
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
require("./db/conn");
require("./js/checklist");
const Registration = require("./model/registration_schema");
const Student = require("./model/newStudent");
const Complain = require("./model/Complain");
// const PresentStudent = require("");
// const {PresentStudent} = require("./js/checklist");
// const Array = PresentStudent[Math.floor(Math.random()*PresentStudent.length)];

app.get("/",(req,res)=>{
  res.render("hello");
})

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/aftertake", (req, res) => {
  res.render("aftertake");
});

app.get('/student_login',(req,res)=>{
  res.render("student_login");
})
app.get("/error",(req,res)=>{
  res.render("login_failed");
})



//get login/////////////////////////////////////////////////////////////////////////
app.post("/Register", (req, res) => {
  Registration.findOne({ email: req.body.reg_email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email Already Exist " });
      }
      if (req.body.reg_password === req.body.reg_cpassword) {
        const user = new Registration({
          name: req.body.reg_name,
          email: req.body.reg_email,
          confirmpassword: req.body.reg_cpassword,
        });

        user
          .save()
          .then(() => {
            res.redirect("/login");
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      } else {
        res.send("password Doesnt match !");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", (req, res) => {
  const user_email = req.body.useremail;
  const user_password = req.body.userpassword;

  Registration.findOne({
    email: user_email,
    confirmpassword: user_password,
  }).then((userExist) => {
    if (userExist) {
      res.redirect("/index");
    } else {
      res.redirect("/error");
    }
  });
});

// --------------------------------------
app.post("/studentReg", (req, res) => {
  Student.findOne({ email: req.body.semail }).then((userExist) => {
    if (userExist) {
      return res.status(422).json({ error: "Email Already Exist " });
    }

    const user = new Student({
      sname: req.body.sname,
      semail: req.body.semail,
      sid: req.body.sid,
      sroll: req.body.sroll,
      syear: req.body.syear,
      sbranch: req.body.sbranch,
    });
    user
      .save()
      .then(() => {
        res.redirect("/addstudent");
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  });
});

app.get("/addstudent", (req, res) => {
  Student.find()
    .then((users) => {
      res.render("studentReg", { newStudent: users });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// app.get("/tycse", (req, res) => {
  
//   Student.find({syear:'ty1'}, function (err, foundItems) {
    
//     res.render("tycse", { newStudent: foundItems });
//   });
  
//   Student.find({syear:'ty1'},{stoday:0} ,function(err,foundItems){
//     res.render("tycse" , {})
//   })
  


// });

app.get("/tycse", async function (req, res) {

  founditem1 = await Student.find({syear: "ty1"})
                      

  founditem2 = await Student.find({ $and: [{ syear: 'ty1' }, { stoday:0 }] });
  // console.log(founditem2)
  res.render('tycse',{newStudent:founditem1, absentStudent:founditem2}); // or {users:users, admins:admins}, same thing
})










app.get("/tycse2", async(req, res) => {
  founditem1 = await Student.find({syear: "ty2"})
                      

  founditem2 = await Student.find({ $and: [{ syear: 'ty2' }, { stoday:0 }] });
  console.log(founditem2)
  res.render('tycse',{newStudent:founditem1, absentStudent:founditem2});
  // const Array = PresentStudent[Math.floor(Math.random()*PresentStudent.length)];
});



app.get("/sycse", async(req, res) => {
  founditem1 = await Student.find({syear: "sy1"})
                      

  founditem2 = await Student.find({ $and: [{ syear: 'sy1' }, { stoday:0 }] });
  console.log(founditem2)
  res.render('tycse',{newStudent:founditem1, absentStudent:founditem2});
  // const Array = PresentStudent[Math.floor(Math.random()*PresentStudent.length)];
});



app.get("/sycse2", async(req, res) => {
  founditem1 = await Student.find({syear: "sy2"})
                      

  founditem2 = await Student.find({ $and: [{ syear: 'sy2' }, { stoday:0 }] });
  // console.log(founditem2)
  res.render('tycse',{newStudent:founditem1, absentStudent:founditem2});
  // const Array = PresentStudent[Math.floor(Math.random()*PresentStudent.length)];
});

app.post("/delete", (req, res) => {
  const idname = req.body.idname;
  console.log(idname);
  Student.findByIdAndRemove(idname, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted");
      res.redirect("/addstudent");
    }
  });
});

app.post("/today",(req,res)=>{
  
    Student.find({},async(err,foundItems)=>{

      await Student.updateMany({},{stoday:0});

    })
    
    res.redirect('/aftertake');
  
     
  
})




app.post("/submitArray", (req, res) => {
  const presenty = req.body.arraySubmit;
  globalThis. presentyArray = presenty.split(",");
  // console.log(presentyArray);
  
  // present.concat(presentyArray);
  Student.find({ _id: presentyArray }, (err, foundItems) => {
    // console.log(foundItems);
    presentyArray.forEach((found) => {
      // console.log(found);
      Student.findByIdAndUpdate(
        { _id: found },
        { $inc: { spresent: 1 ,stoday:1} }
      ).exec();

      
    });
    
    
    // console.log(foundItems)
    
  });
  res.redirect('/tycse');

  // Meme.findOneAndUpdate({_id :id}, {$inc : {'post.likes' : 1}}).exec(...);
});




app.get("/view", (req, res) => {

const user_email = req.query.semail;
  const user_password = req.query.sid;
  // console.log(req.query.semail)
  // console.log(req.query)

    Student.findOne({
      semail: user_email,
      sid: user_password,
      
    }).then((userExist) => {
      if (userExist) {
        res.render("view",{profile:userExist})
      } else{
        res.redirect("/error");
      }
    });
   
  });


  app.post("/oo",(req,res)=>{
 
    const user_password = req.body.rid;

   const user_email = req.body.remail


    
  
  
    const newreport = new Complain({
      name:req.body.rname,
      email:req.body.remail,
      message:req.body.rtext
    })
    newreport.save();
  
    res.redirect(`/view?semail=${user_email}&sid=${user_password}`);
    
  })
  
  app.post("/upload",(req,res)=>{
    const link = req.body.simg;
    const id = req.body.emo;
    const user_email = req.body.semail;
  const user_password = req.body.sid;
    // console.log(id)
    Student.findByIdAndUpdate({ _id: id },{simg:link},(err,found)=>{})
    res.redirect(`/view?semail=${user_email}&sid=${user_password}`);
    // console.log(user_password)
    
  })
 
  
//report



app.get("/report",(req,res)=>{
  Complain.find({},(err,foundItem)=>{
    res.render("report",{newReport:foundItem});
  })
  
})

app.post("/feed",(req,res)=>{
  const idname= req.body.idname;
  console.log(idname);
  Complain.findByIdAndRemove(idname,function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Complain Removed !");
    }
    res.redirect('/report');
  })

})

// Student.findOne({sroll:33},(err,found)=>{
//   console.log(found.sroll)
//   Student.updateMany({sroll:found.sroll},{sroll:100})
// })
 

// ==============================QR CODE ===========================================
app.get("/qr_login",(req,res)=>{
  res.render("qr_login");
});
app.get("/qr_attend",(req,res)=>{
  const user_email = req.query.semail;
  const user_password = req.query.sid;
  Student.findOne({
    semail: user_email,
    sid: user_password,
    
  }).then((userExist) => {
    if (userExist) {
      res.render("qr_attend",{profile:userExist})
    } else{
      res.redirect("/error");
    }
  });
 

});
app.get("/already_submitted",(req,res)=>{
  res.render("already");
})

app.post("/sendo",(req,res)=>{
  const stuid = req.body.stuid;
  
   
   
      
      Student.findByIdAndUpdate(
        { _id: stuid },
        { $inc: { spresent: 1 ,stoday:1} }
      ).exec();

      
    
    
    
    res.redirect("/already_submitted");
    
  });
  



app.listen(3000, () => {
  console.log("server connected at 3000 port !");
});
/////////////////////////////////////////////////////////////////////
