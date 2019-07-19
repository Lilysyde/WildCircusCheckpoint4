const connection = require('./conf');
const express = require('express')
const app = express();
const port = 2400;
const bodyParser = require('body-parser');
const mail = require('./mailingHelper');
const cors = require('cors');
app.use(cors()); // Authorisation d'accès au serveur


// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

//  formulaire de contact 


  app.post('/contact', function (req, res) {
    mail.mailing(req, res)
        .then(customer => res.json({ msg: 'Mail succesfully send', customer }));
})



// GET - Récupération de l'ensemble des données de ta table
app.get('/session', (req, res) => {

  // connection à la base de données, et sélection des employés
  connection.query('SELECT * from session', (err, results) => {

    if (err) {
console.log(err);
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des Sessions');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

app.post('/session', (req, res) => {

  // récupération des données envoyées
  const formData = req.body;

  // connexion à la base de données, et insertion de l'employé
  connection.query('INSERT INTO session SET ?', formData, (err, results) => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d une session");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

// DELETE - Suppression d'une entité
// écoute de l'url "/api/employees"
app.delete('/session/:id', (req, res) => {
  // récupération des données envoyées
  const id = req.params.id;
  // connexion à la base de données, et suppression de l'employé
  connection.query('DELETE FROM session WHERE id = ?', id, err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une session");}
  });
});

app.post('/ticket', (req, res) => {

  // récupération des données envoyées
  const formData = req.body;

  // connexion à la base de données, et insertion de l'employé
  connection.query('INSERT INTO ticket SET ?', formData, (err, results) => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde du ticket");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});


// GET - Récupération de l'ensemble des données de ta table
app.get('/ticket', (req, res) => {

  // connection à la base de données, et sélection des employés
  connection.query('SELECT * from ticket', (err, results) => {

    if (err) {
console.log(err);
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération du Recap Achat');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});


// DELETE - Suppression d'une entité
// écoute de l'url "/api/employees"
app.delete('/ticket/:id', (req, res) => {
  // récupération des données envoyées
  const id = req.params.id;
  // connexion à la base de données, et suppression de l'employé
  connection.query('DELETE FROM ticket WHERE id = ?', id, err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d un recap");}
  });
});

//GET (light) - Récupération de quelques champs spécifiques (id, names, dates, etc...)


app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
