// requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

// uses
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// connect to DB
mongoose.connect('mongodb://localhost:27017/movies');

var movieSchema = mongoose.Schema({
  id: String,
  title: String,
  year: Number,
  poster: String
});

var movies = mongoose.model('movies', movieSchema);


// port
var port = process.env.PORT || 3000

app.listen(port, function(){
  console.log('server up on 3000');
});

app.post('/fav', function (req, res) {
  console.log('req.body ->', req.body);
  var favMovie = movies(req.body);
  favMovie.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      res.sendStatus(201);
    };
});
});

app.get('/fav', function(req, res){
  console.log('in favs req.body ->', req.body);
  movies.find(req.body,function(err,data){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      console.log('data->', data);
      res.send(data);
    };
});
});

app.get('/', function(req,res){
  res.sendFile(path.resolve('public/views/index.html'))
});
