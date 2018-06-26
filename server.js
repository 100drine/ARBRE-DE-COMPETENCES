var express = require('express');
var app = express();

// var {} = require('./utils/utils.js');

// var bodyparser = require('body-parser')
// app.use(bodyparser.urlencoded({ extended: false }))

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

app.get('/' , function(req,res){
	res.render('index.ejs');
});

const PORT = process.env.PORT || 8080; 

app.listen(PORT , function(req,res){
	console.log('Connecté');
});