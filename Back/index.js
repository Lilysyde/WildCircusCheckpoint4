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



// const nodemailer = require("nodemailer");
// app.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// app.post('/contact', (req,res,next) =>{
//   async function main(){
//     let transporter = nodemailer.createTransport({
//       host: "smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "36c17be3ae6694",
//         pass: "8e47f2b218f856"
//       }
//     });
//     let info = await transporter.sendMail({
//       from: '"Fred Foo 👻" <foo@example.com>', // sender address
//       to: `${req.body.email}, emiliegrimoud@yahoo.fr`, // list of receivers
//       subject: "GO ✔", // Subject line
//       text: "Salut?", // plain text body
//       html: "<b>Bonjour?</b>" // html body
//     });
//   };
// });


// GET - Récupération de l'ensemble des données de ta table
app.get('/', (moviesreq, res) => {

  // connection à la base de données, et sélection des employés
  connection.query('SELECT * from movies', (err, results) => {

    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des films');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

//GET (light) - Récupération de quelques champs spécifiques (id, names, dates, etc...)

app.get('/', (req, res) => {

  // connection à la base de données, et sélection des employés
  connection.query('SELECT name from movies', (err, results) => {

    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des noms');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});


//GET (light) - Récupération de quelques champs spécifiques (id, names, dates, etc...)
app.get('/', (req, res) => {

  // connection à la base de données, et sélection des employés
  connection.query('SELECT date from movies', (err, results) => {

    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des dates');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

//GET (light) - Récupération de quelques champs spécifiques (id, names, dates, etc...)
app.get('/', (req, res) => {

  // connection à la base de données, et sélection des employés
  connection.query('SELECT id from movies', (err, results) => {

    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des id');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});


// GET - Récupération d'un ensemble de données en fonction de certains filtres :
app.get('/', (req, res) => {

  // connection à la base de données, et sélection des employés
  connection.query("SELECT * from movies WHERE name LIKE 'B%'", (err, results) => {

    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des films commençant par B');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

app.get('/', (req, res) => {

  // connection à la base de données, et sélection des employés
  connection.query("SELECT * from movies WHERE date >= '2000-12-24'", (err, results) => {

    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des films commençant plus vieux que 2000');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});


app.get('/', (req, res) => {

  // connection à la base de données, et sélection des employés
  connection.query("SELECT * from movies WHERE name LIKE '%Jones%'", (err, results) => {

    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des films comprennant le mot Jones');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

// GET - Récupération de données ordonnées (ascendant, descendant)
app.get('/', (req, res) => {

  // connection à la base de données, et sélection des employés
  connection.query('SELECT * from movies ORDER BY name ASC', (err, results) => {

    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des noms');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

//sauvegarde nouvelle entité (commande INSERT INTO)
// écoute de l'url "/api/employees" avec le verbe POST
app.post('/', (req, res) => {

  // récupération des données envoyées
  const formData = req.body;

  // connexion à la base de données, et insertion de l'employé
  connection.query('INSERT INTO movies SET ?', formData, (err, results) => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un film");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});




//PUT - Modification d'une entité
// écoute de l'url "/api/employees"
app.put('/', (req, res) => {

  // récupération des données envoyées
  const idMovie = req.params.id;
  const formData = req.body;

  // connection à la base de données, et insertion de l'employé
  connection.query('UPDATE movies SET ? WHERE id = ?', [formData, idMovie], err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un film");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

//PUT - Toggle du booléen
// écoute de l'url "/api/employees"
app.put('/', (req, res) => {
  // récupération des données envoyées
  const idMovie = req.params.id;
  // connection à la base de données, et insertion de l'employé
  connection.query('UPDATE movies SET vu = !vu WHERE id = ?', [idMovie], err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un film");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});
// DELETE - Suppression d'une entité
// écoute de l'url "/api/employees"
app.delete('/', (req, res) => {

  // récupération des données envoyées
  const idMovie = req.params.id;

  // connexion à la base de données, et suppression de l'employé
  connection.query('DELETE FROM movies WHERE id = ?', [idMovie], err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un film");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});


//DELETE - Suppression de toutes les entités dont le booléen est false
app.delete('/', (req, res) => {

  // récupération des données envoyées
 

  // connexion à la base de données, et suppression de l'employé
  connection.query('DELETE FROM movies WHERE vu = 0', err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression de tous les films");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});
/* app.get('/api/movies', (request, response) => {
    response.send('Récupération de tous les films');
}); */

app.get(`/api/movies/:id`, (req, res) => {
  const id = req.params.id
  res.json({ id: id });
});

app.get(`/search`, (req, res) => {
  res.sendStatus(304);
});

app.get(`/api/employee`, (req, res) => {
  const name = req.query.name
  if (name) {
    res.status(404).send(`Impossible de récupérer l'employé ${name}`)
  }
});


// écoute de l'url "/api/employees"

app.get('/api/movies', (moviesreq, res) => {

  // connection à la base de données, et sélection des employés
  connection.query('SELECT * from movies', (err, results) => {

    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des films');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});


app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
