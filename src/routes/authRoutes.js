const express = require('express');
const bodyParser = require('body-parser');
const AuthController = require('../controllers/AuthController');
const router = express.Router();
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/middlewrae');

router.use(bodyParser.json());

const authController = new AuthController(admin.auth());

router.post('/register', authenticateToken, async (req, res) => {
  const { email, password, code } = req.body;

  try {
    const user = await authController.createUser(email, password, code);
    res.status(201).json({ message: 'Utilisateur créé avec succès', uid: user.uid });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur', message: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await authController.signInWithEmailAndPassword(email, password);

    const jwtToken = jwt.sign({ uid: userRecord.uid }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Connexion réussie', token: jwtToken });
  } catch (error) {
    console.log(process.env.JWT_SECRET_KEY)
    res.status(401).json({ error: 'Erreur lors de la connexion', message: error.message });
  }
});


router.delete('/delete/:uid', async (req, res) => {
  const uid = req.params.uid;

  try {
    await authController.deleteUser(uid);
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur', message: error.message });
  }
});

module.exports = router; 