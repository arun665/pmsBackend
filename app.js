var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

 
var PassCatApi=require("./api/addcategory.js");
var ProductApi=require("./api/Productdetails.js");
var UserApi=require("./api/userdetails.js");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header('Access-Control-Allow-Methods', 'GET , PUT,PATCH,POST,DELETE,OPTIONS');
  next();
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api",PassCatApi);
app.use("/userapi/",UserApi);



app.get('/', function (req, res) {
  res.send('Hello World')
})
// catch 404 and forward to error handler

// error handler

app.listen(process.env.PORT || 5000,function(err){
  console.log("running on port 5000");
});

