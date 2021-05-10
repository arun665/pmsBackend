const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mongodb:Arun1117@cluster0.spwl1.mongodb.net/pms?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,});
var conn =mongoose.Collection;
var passcatSchema =new mongoose.Schema({
    passord_category: {type:String, 
    },
    user_id:{
        type:String
    },
    password:{
        type:String
    },
    
    date:{
        type: Date, 
        default: Date.now }
});

var passCateModel = mongoose.model('password_categories', passcatSchema);
module.exports=passCateModel;