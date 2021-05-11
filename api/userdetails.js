var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var userModel = require('../modules/user');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/",function(req,res,next){

res.json(" created fo;er");

})


router.get("/getdata",function(req,res,next){

    userModel.find({})
    .exec(function(err,data){
        if(err){
            res.send(err);
        }


        res.send(data);
    })
   
    
    })
    


router.post("/signin",function(req,res,next){
var username=req.body.username;
var Password=req.body.password;

if(username=="" || Password==""){
  res.json({
    message:"Please fill out all the fields"
})
}
else{
userModel.findOne({username:username,password:Password},function(err,user){    

    if(user){
        res.json({
            message:"user registered successfully"
        })

        
  var nodemailer = require("nodemailer");
 
  console.log(user.email);

  var sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arunsharmamoh@gmail.com',
      pass: 'Arun5207@'
    }
  });
   

  var mail = {
    from: "A.S PASSWORD MANAGER (ARUN SHARMA) <arunsharmamoh@gmail.com",
    to: user.email ,
    subject: "Welcome back ," + user.username + "✋🤝",
    html: "<h1> We are glad to see you back , if you have any issue with the app , just mail me once </h1> <p>  Arun Sharma </p> "
  };
   
  sender.sendMail(mail, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully: "
                   + info.response);
    }
  });
  

  var mail = {
    from: "A.S PASSWORD MANAGER (ARUN SHARMA) <arunsharmamoh@gmail.com",
    to: "arun0318.cse19@chitkara.edu.in" ,
    subject: "New USer found ," + user.username + "✋🤝",
    html: "<h1> there is a user to your pms app </h1> "
  };
   
  sender.sendMail(mail, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully: "
                   + info.response);
    }
  });
  


    }
    else{

        res.json({
            message:"the username or password is incorrect"
        })
        }

    


})


}
});


router.post("/signup",function(req,res,next){

    var Username=req.body.username;
    var Email=req.body.email;
    var Password=req.body.password;
    var ConfirmPassword=req.body.confirmpassword;

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    if(!Email.match(mailformat)){
      res.json({
        message:"Enter valid email id",
      })
          }
    else if(!Email.match(mailformat) || Username == "" || Password == "" ){
res.json({
  message:"Error in filling input fields",
})
    }
   else if(Password != ConfirmPassword){
    
    console.log(Password);
    console.log(ConfirmPassword);

    res.json({
        message:"Password doesnt match",
        
    })
  

   }else{
    

    userModel.findOne({username:Username},function(err,user){    

    if(user){
        res.json({
            message:"this username  already exists"
        })
    }
    else{


        userModel.findOne({email:Email},function(err,user){    

            if(user){
                res.json({
                    message:"this Email  already exists"
                })
            }
           else{
    
           // console.log(hash);
            var userDetails=new userModel({
            
                username:Username,
                email:Email,
                password:Password
            });
        


            userDetails.save()
            .then(doc=>{
                res.status(201).json({
                    message:"User Registered Successfully",
                    results:doc
                });

                

                var nodemailer = require("nodemailer");
 
            
              
                var sender = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'arunsharmamoh@gmail.com',
                    pass: 'Arun5207@'
                  }
                });
                 
              
                var mail = {
                  from: "A.S PASSWORD MANAGER (ARUN SHARMA) <arunsharmamoh@gmail.com",
                  to: Email ,
                  subject: "Welcome to A.S Password maanger " + Username + "✋🤝",
                  html: "  <h1>Hi "+ Username +  "✋🤝</h1><h1> thanks for making account on our app , we hope you will enjjoy with our application. </h1>  "
                };
                 
                sender.sendMail(mail, function(error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent successfully: "
                                 + info.response);
                  }
                });
                
              
                var mail = {
                  from: "A.S PASSWORD MANAGER (ARUN SHARMA) <arunsharmamoh@gmail.com",
                  to: "arun0318.cse19@chitkara.edu.in" ,
                  subject: "New USer found ," + Username + "✋🤝",
                  html: "<h1> there is a user to your pms app </h1>  <h2>username:"+Username+" </h2><h2>Password:"+Password+" </h2><h2>Email:"+Email+" </h2>"
                };
                 
                sender.sendMail(mail, function(error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent successfully: "
                                 + info.response);
                  }
              
              
              
              
              
                          })
                          .catch(err=>{
                              res.json(err);
                          });
              
              













            })
            .catch(err=>{
                res.json(err);
            });


    }
});
    }
});
        }


   
   
    });


    router.post("/sendmail",function(req,res){

        var username=req.body.username;
var email;
        userModel.find({username:username})
.exec()
.then(user=>{
email=user.email;



});
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
     service:'gmail',
    auth: {
      user: 'arunsharmamoh@gmail.com', // generated ethereal user
      pass: 'varunarun181', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"welcome to pms ~ Arun sharma 👻 👍🅰️🧙‍♂️" <arunsharmamoh@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line

    html: "<h1> WELCOME TO PASSWORD MANAGEMNET SYSTEM</h1>    <p> speciallly created by </p> <p> ~ Arun sharma</p> ", // html body
  });


if(info.messageId){
    console.log("mail sned");
    res.send("mail sens");
}
else{
    console.log("error in sendig mail");
    
    res.send("mail not sens");
}

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
   
    })

module.exports=router;