var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
console.log("Server Started on Route 8080!");
var app = express();
var upload = require('express-fileupload');


var MongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;

//
app.use(express.static('./public'));

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017/sick_fit', function(err, db) {

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

    //Login Page Data To Database
    // SIGN UP
    app.post('/userData', function (req, res){
        console.log(req.body);
        req.body['user_calorieGoal'] = parseInt(req.body['user_calorieGoal']);
        db.collection('userData').insert(req.body, function(err){
            console.log('err?', err);
            res.send({success: 'success!'});
        });
    });


    app.use(function(req, res, next) {
        res.status(404).send('not found');
    });
    app.use(function(req, res, next) {
        res.status(500).send('oops');
    });
    app.listen(8080);

}); // END OF DATABASE CONNECT
