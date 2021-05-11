const mongoose = require('mongoose');
const validator=require("validator");
mongoose.connect('mongodb+srv://mongodb:Arun1117@cluster0.spwl1.mongodb.net/pms?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true});

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