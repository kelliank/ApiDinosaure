const mongoose = require('mongoose');

const Dinosaure = mongoose.model('Dinosaure', new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, methodDomestication: String },
  favoriteFood: { type: String },
  rideable: { type: Boolean, default: false },
  tamable: { type: Boolean, default: true },
  tamingTime: { type: Number, default: 0 },
  habitat: { type: String },
  map: { type: String },
  creationDate: { type: Date, required: true },
  modificationDate: { type: Date, required: true },
  creationUser: { type: String, required: true },
  modificationUser: { type: String, required: true },
  active: { type: Boolean, required: true },
}));

module.exports = Dinosaure;
