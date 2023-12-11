const express = require('express');
const router = express.Router();
const DinoController = require('../controllers/DinoController');
const authenticateToken = require('../middleware/middlewrae');


router.get('/dinosaurs', async (req, res) => {
  await DinoController.getAllDinosaurs(req, res);
});

router.post('/dinosaurs', authenticateToken, async (req, res) => {
      await DinoController.createDino(req, res);
  });

router.get('/dinosaurs/:id', async (req, res) => {
  await DinoController.getDinoById(req, res);
});

module.exports = router;
