const mongoose = require('mongoose');

const Map = mongoose.model('Map', new mongoose.Schema({
  name: { type: String, required: true },
  releaseDate: { type: Date },
  difficulty: { type: String },
  biomes: { type: [String] },
  boss: { type: String },
}));

module.exports = Map;
