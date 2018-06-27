var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
//var {createUser} = require('./utils/utils.js');

var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

var db = new sqlite3.Database("./skilltree.db" , sqlite3.OPEN_READWRITE, function(err){
	if(err) {
		console.log(err.message);}
	else {
		console.log("Connecté à la DB")
		}
});

app.get('/' , function(req,res){
	res.render('index.ejs');
});

app.get('/register' , function(req,res){
	res.render('register.ejs');
});

app.post('/registered' , function(req,res) {
	var sqlCreateUser = 'INSERT INTO Simplonien (nom,prenom,email,mdp) VALUES ("'+req.body.lastname+'","'+req.body.firstname+'","'+req.body.mail+'","'+req.body.password+'");'; 
	db.serialize(function(){
		db.all(sqlCreateUser, function (err, row) {
			if (err) {
				console.log(err.message);
				return;
			}

			res.render('register-success.ejs');
		});

	});
	
});

app.get('/signin' , function(req,res){
	res.render('signin.ejs');
});

app.post('/signedin' , function(req,res){
	// fonction qui check si c'est dans la DB (à require depuis utils)
	res.render('index.ejs');
});



const PORT = process.env.PORT || 8080; 

app.listen(PORT , function(req,res){
	console.log('Connecté');
});