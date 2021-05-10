var express=require("express");
var router=express.Router();
var productModel = require('../modules/Product.js');

var multer=require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  
  fileFilter=(req,file,cb)=>{
      cb(null,true);
  }


  var upload = multer({ storage: storage ,
limits:{
    fileSize:1024*1024*5
},
fileFilter:fileFilter
})



router.get("/",function(req,res,next){

res.json(" created fo;er");

})


router.post("/add",upload.single('productImage'),function(req,res,next){


    console.log(req.file);


    var product_name=req.body.name;
    var price=req.body.price;
    var quantity=req.body.quantity;

    var productDetails=new productModel({
        product_name:product_name,
        price:price,
        image:req.file.path,
        quantity:quantity,
        
    })
    productDetails.save(function(err){
     if(err) throw err;

     res.send("success");

 });

})



router.put("/addupdatecategory",function(req,res,next){
    res.send("this is out funstion");

})

router.patch("/updatecategory/:id",function(req,res,next){
var id=req.params.id;
var category=req.body.category;

passCatModel.findById(id,function(err,data){
data.passord_category=category?category:data.passord_category;


data.save(function(err){
    if(err) throw err;
    res.send(" the data is u[date successdu;;y theping [[atech ethod")
})
});

    res.send("this is out funstion");

})

router.delete("/deleteCategory",function(req,res,next){
var id="606b3a9a95250f2f64c3b116";
passCatModel.findByIdAndDelete(id,function(err){
    if(err){
        throw err;
    }
    res.send(" this fiel is deleted");

})
});





module.exports=router;