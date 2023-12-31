const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
require('dotenv').config();
const cors = require('cors');

const serviceAccount = require('./apidinosaure-firebase-adminsdk-cu71k-16e23ed57b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://apidinosaure.firebaseio.com'
});

const app = express();
const db = admin.firestore();
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Api   Dinosaure');
});

const authRoutes = require('./src/routes/authRoutes');
const dinoRoutes = require('./src/routes/dinoRoutes')
const biomeRoutes = require('./src/routes/biomeRoutes')
app.use('/auth', authRoutes);
app.use('/api', dinoRoutes);
app.use('/api', biomeRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur Node.js en cours d'exécution sur le port ${port}`);
});
