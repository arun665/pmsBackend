const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
mongoose.connect('mongodb://localhost:27017/pms', {useNewUrlParser: true, useCreateIndex: true,});
var conn =mongoose.Collection;
var passSchema =new mongoose.Schema({
    product_name: {type:String, 
    
        },
        price: {type:String, 
         
           },
           image: {type:String, 
         
           },
        
        quantity: {type:String, 
         
           },
    date:{
        type: Date, 
        default: Date.now }
});
passSchema.plugin(mongoosePaginate);
var productModel = mongoose.model('Product', passSchema);


module.exports=productModel;