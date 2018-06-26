var express = require('express');
var app = express();

// var {} = require('./utils/utils.js');

var bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

app.get('/' , function(req,res){
	res.render('index.ejs');
});

app.get('/register' , function(req,res){
	res.render('register.ejs');
});

app.post('/registered' , function(req,res) {
	var new_user = new User(req.body.lastname,req.body.firstname,req.body.mail,req.body.password);
	res.render('register-success.ejs');
});

app.get('/signin' , function(req,res){
	res.render('signin.ejs');
})



const PORT = process.env.PORT || 8080; 

app.listen(PORT , function(req,res){
	console.log('Connecté');
});