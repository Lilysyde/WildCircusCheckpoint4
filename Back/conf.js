const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'bambi', // le mot de passe
database :  'circus' // le nom de la base de données
});
module.exports = connection;