const mongoose = require('mongoose');
const validator=require("validator");
mongoose.connect('mongodb://localhost:27017/pms', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true});

var conn =mongoose.Collection;
var userSchema =new mongoose.Schema({

    username: {
        type:String, 
        required: true,
        index: {
            unique: true,        
        }},

	email: {
        type:String, 

        index: {
            unique: true, 
        }
        
    },
    password: {
        type:String, 
  
    },
    
    date:{
        type: Date, 
        default: Date.now }
});

var userModel =new mongoose.model('user', userSchema);
module.exports=userModel;