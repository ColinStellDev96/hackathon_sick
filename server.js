var express = require('express');
, router = express.Router()
  , multer = require('multer')
//Image uploading
/////////////////
var uploading = multer({
  dest: __dirname + '../public/upload/',
  limits: {fileSize: 1000000, files:1},
})

router.post('/upload', uploading, function(req, res) {

})

module.exports = router
/////////////////
var request = require('request');
var bodyParser = require('body-parser');
var mongo = require('mongodb');


var app = express();

app.use(express.static('./public'));

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', function(req, res){
    res.sendFile('/html/login.html', {root:'./public'});
});
app.get('/', function(req, res){
    res.sendFile('/html/dashboard.html', {root:'./public'});
});

app.listen(8080);
