const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Token manquant', message: 'Vous devez être authentifié pour accéder à cette ressource.' });
  }

  if (!authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Format de token invalide', message: 'Le format du token est incorrect.' });
  }

  const token = authorizationHeader.substring(7);
  console.log('Token reçu pour la vérification :', token);

  console.log(process.env.JWT_SECRET_KEY)

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error('Erreur lors de la vérification du token :', err);
      return res.status(403).json({ error: 'Token invalide', message: 'Le token fourni n\'est pas valide.' });
    }

    req.user = user;
    next();
  });
}

const extractUserIdFromToken = (req) => {
  return req.user ? req.user.uid : null;
};

module.exports = { authenticateToken, extractUserIdFromToken };
