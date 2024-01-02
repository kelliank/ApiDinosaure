const admin = require('firebase-admin');
const Biome = require('../models/biome');
const { authenticateToken, extractUserIdFromToken } = require('../middleware/middlewrae');


class BiomeController {
  constructor() {
    this.db = admin.firestore();
    this.collectionBiome = this.db.collection('biome');
  }

  async getAllBiome(req, res) {
    try {
      const querySnapshot = await this.collectionBiome.get();
      const biomes = [];

      querySnapshot.forEach((doc) => {
        biomes.push({ id: doc.id, data: doc.data() });
      });

      res.json(biomes);
    } catch (error) {
      console.error('Error retrieving biomes data:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async createBiome(req, res) {
    try {
      const creationUser = extractUserIdFromToken(req);

      const {
        name,
        description,
        temperature,
        fauna,  
        flora,
        active
      } = req.body;

      if (!name || !description) {
        return res.status(400).json({ error: 'Name and species are required to create a dinosaur.' });
      }

      const creationDate = new Date();

      const newBiome = {
        name,
        description,
        temperature,
        fauna,
        flora,
        creationDate,
        creationUser,
        modificationDate: null,
        modificationUser: null,
        active,
      };

      const docRef = await this.collectionBiome.add(newBiome);

      res.status(201).json({ id: docRef.id, ...newBiome });
    } catch (error) {
      console.error('Error creating biome:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getBiomeById(req, res) {
    try {
      const biomeId = req.params.id;

      if (!biomeId) {
        return res.status(400).json({ error: 'Biome ID is required.' });
      }

      const docSnapshot = await this.collectionBiome.doc(biomeId).get();

      if (!docSnapshot.exists) {
        return res.status(404).json({ error: 'Dinosaur not found.' });
      }

      const biome = {
        id: docSnapshot.id,
        data: docSnapshot.data(),
      };

      res.json(biome);
    } catch (error) {
      console.error('Error retrieving biome by ID:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteBiome(req, res) {
    try {
      const biomeId = req.params.id;

      if (!biomeId) {
        return res.status(400).json({ error: 'Biome ID is required.' });
      }

      const docSnapshot = await this.collectionBiome.doc(biomeId).get();

      if (!docSnapshot.exists) {
        return res.status(404).json({ error: 'Biome not found.' });
      }

      await this.collectionBiome.doc(biomeId).delete();

      res.json({ success: true, message: 'Biome deleted successfully.' });
    } catch (error) {
      console.error('Error deleting biome:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async setActive(req, res) {
    try {
      const biomeId = req.params.id;
      const { active } = req.body;

      if (!biomeId) {
        return res.status(400).json({ error: 'Biome ID is required.' });
      }

      if (active === undefined || active === null) {
        return res.status(400).json({ error: 'Active status is required.' });
      }

      const docSnapshot = await this.collectionBiome.doc(biomeId).get();

      if (!docSnapshot.exists) {
        return res.status(404).json({ error: 'Biome not found.' });
      }

      const updatedData = {
        active,
        modificationDate: new Date(),
        modificationUser: extractUserIdFromToken(req),
      };

      await this.collectionBiome.doc(biomeId).update(updatedData);

      res.json({ success: true, message: 'Biome active status updated successfully.' });
    } catch (error) {
      console.error('Error updating biome active status:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateBiome(req, res) {
    try {
      const biomeId = req.params.id;
      const { name, description, temperature, fauna, flora, active } = req.body;

      if (!biomeId) {
        return res.status(400).json({ error: 'Biome ID is required.' });
      }

      const docSnapshot = await this.collectionBiome.doc(biomeId).get();

      if (!docSnapshot.exists) {
        return res.status(404).json({ error: 'Biome not found.' });
      }

      const updatedData = {
        name,
        description,
        temperature,
        fauna,
        flora,
        active,
        modificationDate: new Date(),
        modificationUser: extractUserIdFromToken(req),
      };

      await this.collectionBiome.doc(biomeId).update(updatedData);

      res.json({ success: true, message: 'Biome updated successfully.' });
    } catch (error) {
      console.error('Error updating biome:', error);
      res.status(500).send('Internal Server Error');
    }
  }

}

module.exports = new BiomeController();
