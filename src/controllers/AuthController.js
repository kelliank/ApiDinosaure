class AuthController {
  constructor(auth) {
    this.auth = auth;
  }

  async createUser(email, password) {
    try {
      const userRecord = await this.auth.createUser({
        email,
        password,
      });
      console.log('Utilisateur créé avec UID:', userRecord.uid);
      return userRecord;
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      const userRecord = await this.auth.signInWithEmailAndPassword(email, password);
      console.log('Utilisateur connecté avec UID:', userRecord.uid);
      return userRecord;
    } catch (error) {
      console.error('Erreur lors de la connexion de l\'utilisateur:', error);
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
}

module.exports = AuthController;
