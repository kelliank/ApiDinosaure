const mongoose = require('mongoose');

const myDinosaure = mongoose.model('myDinosaure', new mongoose.Schema({
  name: { type: String, required: true },
  dinosaure: {type: String, required: true},
  description: {type: String, required: false},
  creationDate: { type: Date, required: true },
  modificationDate: { type: Date, required: true },
  creationUser: { type: String, required: true },
  modificationUser: { type: String, required: true },
  active: { type: Boolean, required: true },
}));

module.exports = Dinosaure;
