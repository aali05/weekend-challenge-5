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
})

app.get('/', function(req,res){
  res.sendFile(path.resolve('public/views/index.html'));
});
