var express=require("express");
var router=express.Router();
var passCatModel = require('../modules/password_category');


router.get("/getpasscat/:userid",function(req,res,next){
    
var userid=req.params.userid

var mysort = {category:1};  

var getPassCat= passCatModel.find({user_id:userid}).sort(mysort);
    getPassCat.exec(function(err,data){
        if(err){
            throw err;
        }


        res.send(data);

    })

})

router.post("/addcategory",function(req,res,next){


    var category=req.body.password_category;
    var user_id=req.body.user_id;
    var password=req.body.password;
    var type=req.body.type;
var pass_cat_details=new passCatModel({'passord_category': category,'user_id':user_id,'password':password,'category':type});
pass_cat_details.save()
.then(doc=>{
    res.status(201).json({
        message:"Password added successfully",
        results:doc
    })



    
    







})
.catch(err=>{
    res.json(err);
})
});
 



router.put("/addupdatecategory",function(req,res,next){
    res.send("this is out funstion");

})

router.patch("/updatecategory",function(req,res,next){
var id=req.body.id;
var category=req.body.category;

passCatModel.findById(id,function(err,data){
data.passord_category=category?category:data.passord_category;


data.save(function(err){
    if(err) throw err;
    res.send(" the data is u[date successdu;;y theping [[atech ethod")
})
});


})

router.delete("/deleteCategory",function(req,res,next){
var id=req.body.id;

passCatModel.findByIdAndDelete(id)
.then(doc=>{
    res.status(201).json({
        msg:"CAtegory Deleted Successfully",
        results:doc
    })
})
.catch(err=>{
    res.json(err);
})
});





module.exports=router;