const admin = require('firebase-admin');
const Dinosaure = require('../models/dinosaure');
const { authenticateToken, extractUserIdFromToken } = require('../middleware/middlewrae');


class DinoController {
  constructor() {
    this.db = admin.firestore();
    this.collectionDinosaurs = this.db.collection('dinosaurs');
  }

  async getAllDinosaurs(req, res) {
    try {
      const querySnapshot = await this.collectionDinosaurs.get();
      const dinosaurs = [];

      querySnapshot.forEach((doc) => {
        dinosaurs.push({ id: doc.id, data: doc.data() });
      });

      res.json(dinosaurs);
    } catch (error) {
      console.error('Error retrieving dinosaur data:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async createDino(req, res) {
    try {
      const creationUser = extractUserIdFromToken(req);

      const {
        name,
        species,
        favoriteFood,
        rideable,
        tamable,
        tamingTime,
        habitat,
        map,
        active,
        image,
      } = req.body;

      if (!name || !species) {
        return res.status(400).json({ error: 'Name and species are required to create a dinosaur.' });
      }

      const creationDate = new Date();

      const newDino = {
        name,
        species,
        favoriteFood,
        rideable,
        tamable,
        tamingTime,
        habitat,
        map,
        creationDate,
        creationUser,
        modificationDate: null,
        modificationUser: null,
        active,
        image,
      };

      const docRef = await this.collectionDinosaurs.add(newDino);

      res.status(201).json({ id: docRef.id, ...newDino });
    } catch (error) {
      console.error('Error creating dinosaur:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getDinoById(req, res) {
    try {
      const dinoId = req.params.id;

      if (!dinoId) {
        return res.status(400).json({ error: 'Dinosaur ID is required.' });
      }

      const docSnapshot = await this.collectionDinosaurs.doc(dinoId).get();

      if (!docSnapshot.exists) {
        return res.status(404).json({ error: 'Dinosaur not found.' });
      }

      const dinosaur = {
        id: docSnapshot.id,
        data: docSnapshot.data(),
      };

      res.json(dinosaur);
    } catch (error) {
      console.error('Error retrieving dinosaur by ID:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteDino(req, res) {
    try {
      const dinoId = req.params.id;

      if (!dinoId) {
        return res.status(400).json({ error: 'Dinosaur ID is required.' });
      }

      const docSnapshot = await this.collectionDinosaurs.doc(dinoId).get();

      if (!docSnapshot.exists) {
        return res.status(404).json({ error: 'Dinosaur not found.' });
      }

      await this.collectionDinosaurs.doc(dinoId).delete();

      res.json({ success: true, message: 'Dinosaur deleted successfully.' });
    } catch (error) {
      console.error('Error deleting dinosaur:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async setActive(req, res) {
    try {
      const dinoId = req.params.id;
      const { active } = req.body;

      if (!dinoId) {
        return res.status(400).json({ error: 'Dinosaur ID is required.' });
      }

      if (active === undefined || active === null) {
        return res.status(400).json({ error: 'Active status is required.' });
      }

      const docSnapshot = await this.collectionDinosaurs.doc(dinoId).get();

      if (!docSnapshot.exists) {
        return res.status(404).json({ error: 'Dinosaur not found.' });
      }

      const updatedData = {
        active,
        modificationDate: new Date(),
        modificationUser: extractUserIdFromToken(req),
      };

      await this.collectionDinosaurs.doc(dinoId).update(updatedData);

      res.json({ success: true, message: 'Dinosaur active status updated successfully.' });
    } catch (error) {
      console.error('Error updating dinosaur active status:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateDino(req, res) {
    try {
      const dinoId = req.params.id;
      const {
        name,
        species,
        favoriteFood,
        rideable,
        tamable,
        tamingTime,
        habitat,
        map,
        active,
        image,
      } = req.body;

      if (!dinoId) {
        return res.status(400).json({ error: 'Dinosaur ID is required.' });
      }

      const docSnapshot = await this.collectionDinosaurs.doc(dinoId).get();

      if (!docSnapshot.exists) {
        return res.status(404).json({ error: 'Dinosaur not found.' });
      }

      const updatedData = {
        name,
        species,
        favoriteFood,
        rideable,
        tamable,
        tamingTime,
        habitat,
        map,
        active,
        image,
        modificationDate: new Date(),
        modificationUser: extractUserIdFromToken(req),
      };

      await this.collectionDinosaurs.doc(dinoId).update(updatedData);

      res.json({ success: true, message: 'Dinosaur updated successfully.' });
    } catch (error) {
      console.error('Error updating dinosaur:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new DinoController();
