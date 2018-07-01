var express = require('express');
var app = express();
var mysql = require('mysql');
var {createUser} = require('./utils/utils.js');
var bodyparser = require('body-parser');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

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

// Stockage de variable necessaire par la suite
var emailsimplonien;
var sonid;
var arbreid;

// Mise en route de body-parser
app.use(bodyparser.urlencoded({ extended: false }));

// Selection du moteur de template
app.set('view engine','ejs');

// Définition du dossier "static" de express
app.use(express.static(__dirname + '/public'));


// Les differentes routes

// l Acceuil
app.get('/' , function(req,res){
	res.render('index.ejs');
});

// L Enregistrement
app.get('/signup' , function(req,res){
	res.render('signup.ejs');
});

app.post('/signedup', function(req,res){
	
	// Procedure d enregistrement dans la BDD
	const simplonien = { 
		nom: req.body.lastname, 
		prenom: req.body.firstname, 
		email: req.body.mail, 
		mdp: req.body.password };
		
	console.log(req.body.lastname);
	
	// On enregistre le simplonien
	connection.query('INSERT INTO simplonien SET ?', simplonien, function(err, response) {
		if (err) {
			console.log(err.message);
			return;
		}else{
		console.log('Last insert ID:', response.insertId);
		res.render('signup-success.ejs');
		}
	});
	// On lui crée un arbre
	connection.query('INSERT INTO arbre (comp1) VALUES ("NULL");' , function(err,rows) {
		if (err) {
			console.log(err.message);
			return;
		}     
		console.log(rows.insertId);
		arbreid=rows.insertId
		console.log('Data received from Db:\n');
		console.log(rows);
	  });
});


// La Connexion
app.get('/login' , function(req,res){

	res.render('login.ejs');
});


app.post('/loggedin' , function(req,res){

	// Verification de l email et du mot de passe
	var reqmail='SELECT idsimplonien, email, mdp FROM simplonien WHERE email="'+req.body.email+'";';

	connection.query(reqmail, (err,rows) => {
		if (err) {
			console.log(err.message);
			return;
		}else if ((rows[0].email === req.body.email) && (rows[0].mdp === req.body.pwd)) {

			// Quand tout match: email et mdp
			console.log('requete email: ' + req.body.email + ' et ' + req.body.pwd + ' et l id: ' + rows[0].idsimplonien);
			console.log('You are connected. Welcome!');

			emailsimplonien=rows[0].email;
			sonid=rows[0].idsimplonien;
			
			res.redirect('arbre');
			
		}else if ((rows[0].email === req.body.email) && (rows[0].mdp !== req.body.pwd)) {	  
			console.log('requete email: ' + req.body.email + ' et ' + req.body.pwd);			
			res.send('Invalid password!');
		}else if ((req.body.email !== rows[0].email)) {
			console.log('requete email: ' + req.body.email + ' et ' + req.body.pwd);			
			res.send('You are not logged! Dommage!');
		}else{
			res.send('There is a problem!')
		};
	});
});

// L Arbre du connecté
app.get('/arbre' , function(req,res){

	// Communication grace à Socket.io
	io.on('connection', function (socket) {
		console.log('conection socket.io');
		
		// On recupere l arbre du connecté
		connection.query('SELECT * FROM arbre WHERE idarbre="' + arbreid + '";' , function(err,rows) {
			if (err) {
				console.log(err.message);
				return;
			};
			for (let i = 1; i < 11; i++) {
				var note="comp"+i;
				if (rows[0].note != 0){
					console.log(note);
					socket.emit("toligth",[i,rows[0][note]])
					console.log('Emission de tolight!!!'+rows[0][note]+'\n');
					
				}				
			}
			console.log('Data received from Db:\n');
			console.log(rows);
		  });
		
		// On ecoute l event 'up' pour changer la BDD a chaque clic sur un cercle (competence nouvelle)
		socket.on('up',function(data){

			console.log("ok to transfert DATA!!!!!!! " + data);	
			
			// A chaque event 'up' on change la valeur de la competence
			connection.query('UPDATE arbre SET comp' + data[1] + '="' + data[0] + '" WHERE idarbre="' + arbreid + '";' , function(err,rows) {
				if (err) {
					console.log(err.message);
					return;
				}     

				console.log('Data received from Db:\n');
				console.log(rows);
			  });

			  // Ici on incremente la table vote et on connait alors chaque vote effectué
			  connection.query('INSERT INTO vote (idsimplonien,uservoté,idarbre,note,comp) VALUES ("'+ sonid +'", "' + sonid + '", "' + arbreid + '","'+ data[0] + '","' + data[1] + '");', function(err,rows) {
				if (err) {
					console.log(err.message);
					return;
				}      
				console.log('Data received from Db:\n');
				console.log(rows);
			  });
			  
		})
	});

	/*
	select vote.note, vote.idarbre, simplonien.idsimplonien, simplonien.email from simplonien
    -> left join simplonien
	-> on simplonien.idsimplonien = vote.idsimplonien;
	*/
	/*connection.query('INSERT INTO vote (idsimplonien,uservoté,idarbre,note) VALUES ("'+ sonid +'", "' + sonid + '", "' + sonid + '", "' + 1 + '");', function(err,rows) {
		if (err) {
			console.log(err.message);
			return;
		}      
		console.log('Data received from Db:\n');
		console.log(rows);
	  });*/

    res.render('arbre.ejs');
});


app.get('/grille' , function(req,res){
    res.render('grid.ejs');
});

// Definition et ecoute du port
const PORT = process.env.PORT || 8080; 

server.listen(PORT , function(req,res){
	console.log('Serveur Connecté');
});