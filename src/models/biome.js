const mongoose = require('mongoose');

const Biome = mongoose.model('Biome', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  temperature: { type: String },
  fauna: { type: [String] },
  flora: { type: [String] },
}));

module.exports = Biome;
