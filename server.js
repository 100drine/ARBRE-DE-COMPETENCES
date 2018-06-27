var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var {createUser} = require('./utils/utils.js');

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
	var new_user = new createUser(req.body.lastname,req.body.firstname,req.body.mail,req.body.password);
	new_user.register();
	res.render('register-success.ejs');
});

app.get('/signin' , function(req,res){
	res.render('signin.ejs');
});

app.post('/signedin' , function(req,res){
	// fonction qui check si c'est dans la DB (à require depuis utils)
	res.render('index.ejs');
});

app.get('/arbre' , function(req,res){
    res.render('arbre.ejs');
});


const PORT = process.env.PORT || 8080; 

app.listen(PORT , function(req,res){
	console.log('Connecté');
});