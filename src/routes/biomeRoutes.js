const express = require('express');
const router = express.Router();
const BiomeController = require('../controllers/BiomeController');
const { authenticateToken } = require('../middleware/middlewrae');


router.get('/biome', async (req, res) => {
  await BiomeController.getAllBiome(req, res);
});

router.post('/biome', authenticateToken, async (req, res) => {
      await BiomeController.createBiome(req, res);
  });

router.get('/biome/:id', async (req, res) => {
  await BiomeController.getBiomeById(req, res);
});

router.delete('/biome/:id', authenticateToken, async (req, res) => {
  await BiomeController.deleteBiome(req, res);
});

module.exports = router;
