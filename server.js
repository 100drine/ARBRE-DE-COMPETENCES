var express = require('express');
var app = express();
// var sqlite3 = require('sqlite3').verbose();
var mysql = require('mysql');
var {createUser} = require('./utils/utils.js');
var bodyparser = require('body-parser');


// Connexion à la bdd distante 
// commande pour acceder a la bdd a distance:
// mysql -h sql7.freemysqlhosting.net -u sql7244923 -p
// pwd: ezgxfQBbRa
// Port number: 3306
var connection = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7244923',
    password: 'ezgxfQBbRa',
    database: 'sql7244923'
});

// Mise en route de body-parser
app.use(bodyparser.urlencoded({ extended: false }));

// Selection du moteur de template
app.set('view engine','ejs');

// Définition du dossier "static" de express
app.use(express.static(__dirname + '/public'));

/*var db = new sqlite3.Database("./skilltree.db" , sqlite3.OPEN_READWRITE, function(err){
	if(err) {
		console.log(err.message);}
	else {
		console.log("Connecté à la DB")
		}
});*/


/*connection.query('DESCRIBE vote', (err,rows) => {
	if(err) throw err;
  
	console.log('Data received from Db:\n')
  });*/

// Les differentes routes
app.get('/' , function(req,res){
	res.render('index.ejs');
});

app.get('/register' , function(req,res){
	res.render('register.ejs');
});

app.post('/registered', function(req,res){
	const simplonien = { nom: req.body.lastname, prenom: req.body.firstname, email: req.body.mail, mdp: req.body.password };
	console.log(req.body.lastname);
	
	connection.query('INSERT INTO simplonien SET ?', simplonien, (err, res) => {
  		if(err) throw err;

		console.log('Last insert ID:', res.insertId);
		
		res.render('register-success.ejs');
});

})
/*
app.post('/registered' , function(req,res) {
	var sqlCreateUser = 'INSERT INTO simplonien (nom,prenom,email,mdp) VALUES ("'+req.body.lastname+'","'+req.body.firstname+'","'+req.body.mail+'","'+req.body.password+'");'; 
	db.serialize(function(){
		db.all(sqlCreateUser, function (err, row) {
			if (err) {
				console.log(err.message);
				return;
			}
			res.render('register-success.ejs');
		});

	});
	
});*/

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

<<<<<<< HEAD
app.get('/grille' , function(req,res){
    res.render('grid.ejs');
});

// Definition et ecoute du port
const PORT = process.env.PORT || 8080; 

app.listen(PORT , function(req,res){
	console.log('Serveur Connecté');
});