var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
console.log("Server Started on Route 8080!");
var app = express();
var upload = require('express-fileupload');

//
app.use(express.static('./public'));

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/login', function(req, res){
    res.sendFile('/html/login.html', {root:'./public'});
});

app.get('/dashboard', function(req, res){
    res.sendFile('/html/index.html', {root:'./public'});
});

app.use(upload())
app.get('/',function(req, res){
  res.sendFile(__dirname+'/html/index.html', {root:'./public'})
})

app.post('/', function(req, res){
  if (req.files){
    var file = req.files.filename
    console.log(req.files)
  }
})

//css
app.get('/main.css', function(req, res) {
  res.sendFile('./main.css', {root: './styles'})
})

app.listen(8080);
