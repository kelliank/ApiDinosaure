const bcrypt = require('bcrypt');

class AuthController {
  constructor(auth) {
    this.auth = auth;
  }

  async createUser(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userRecord = await this.auth.createUser({
        email,
        password: hashedPassword,
      });
  
      // Définissez les custom claims après la création de l'utilisateur
      await this.auth.setCustomUserClaims(userRecord.uid, {
        passwordHash: hashedPassword,
      });
  
      console.log('Utilisateur créé avec UID:', userRecord.uid);
      return userRecord;
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  }
  

  async deleteUser(uid) {
    try {
      await this.auth.deleteUser(uid);
      console.log('Utilisateur supprimé avec UID:', uid);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  }

  async signInWithEmailAndPassword(email, password) {
    try {
      const userRecord = await this.auth.getUserByEmail(email);
      const storedPasswordHash = userRecord.customClaims.passwordHash;

      console.log('Stored Password Hash:', storedPasswordHash);

      const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);

      if (isPasswordValid) {
        console.log('Connexion réussie pour l\'utilisateur avec UID:', userRecord.uid);
        return userRecord;
      } else {
        console.error('Adresse e-mail ou mot de passe incorrect');
        throw new Error("Adresse e-mail ou mot de passe incorrect");
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw new Error("Adresse e-mail ou mot de passe incorrect");
    }
  }
}

module.exports = AuthController;
