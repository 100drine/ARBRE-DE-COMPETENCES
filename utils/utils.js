//les machins pour se connecter à la DB , avec l'url etc
// nom de db etc

exports.createUser = function (lastname,firstname,mail,password) {
	this.lastname = lastname;
	this.firstname = firstname;
	this.mail = mail;
	this.password = password;
	this.register = function(){
		var currentUser = {
			lastname : this.lastname,
			firstname : this.firstname,
			mail : this.mail,
			password : this.password
		};
		//connexion à la DB
		// insertion du gars avec la langage SQL ou SQLITE
	}
}

exports.login = function() {// à écrire
}