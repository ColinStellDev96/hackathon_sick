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

    // SEND FILES FOR MAIN PAGES
    app.get('/login', function(req, res){
        res.sendFile('/html/login.html', {root:'./public'});
    });

    app.get('/dashboard', function(req, res){
        res.sendFile('/html/index.html', {root:'./public'});
    });

    //CSS SEND FILE
    app.get('/main.css', function(req, res) {
      res.sendFile('./main.css', {root: './styles'});
  });

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

    // Grabbing User Data From Database and Sending to Front-End
    app.get('/userData', function (req, res){
        db.collection('userData').find({}).toArray(function(err, docs) {
            console.log('err?', err);
            res.send(docs);
        });
    });

    // Grabbing Food Data From Database and Sending to Front-End
    app.get('/foodItems', function (req, res){
        db.collection('foodItems').find({}).sort({'foodName': 1}).toArray(function(err, docs){
            console.log('err?', err);
            res.send(docs);
        });
    });

    // Grabbing Workout Data From Database and Sending to Front-End
    app.get('/calories', function (req, res){
        db.collection('exercise').find({}).sort({'excerciseName': 1}).toArray(function(err, docs){
            console.log('err?', err);
            res.send(docs);
        });
    });







    // app.get('/api_data', function (req, res) {
    //     console.log('working');
    //     request('https://trackapi.nutritionix.com/v2/search/instant&appId=72192468&appKey=46bc41cc62b1c33c0c1adeb162e3a8bc', function (error, response, body){
    //         console.log(body);
    //         console.log('error?', error);
    //         var apiData = JSON.parse(body);
    //         res.send(apiData);
    //     });
    // });



//File Uploading
app.use(upload());
app.get('/',function(req, res){
  res.sendFile(__dirname+'/html/index.html', {root:'./public'});
});

// END OF APP Error Messages
    app.use(function(req, res, next) {
        res.status(404).send('not found');
    });
    app.use(function(req, res, next) {
        res.status(500).send('oops');
    });
// APP LISTEN
    app.listen(8080);

}); // END OF DATABASE CONNECT
