var express = require('express');
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

app.listen(8080);
