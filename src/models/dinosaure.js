class Dinosaure {
  constructor(name, species, favoriteFood, rideable, tamable, tamingTime, habitat, map, creationUser, active) {
    this.name = name;
    this.species = species;
    this.favoriteFood = favoriteFood;
    this.rideable = rideable;
    this.tamable = tamable;
    this.tamingTime = tamingTime;
    this.habitat = habitat;
    this.map = map;
    this.creationUser = creationUser;
    this.creationDate = new Date();
    this.modificationUser = creationUser;
    this.modificationDate = new Date();
    this.active = active;
  }
}

module.exports = Dinosaure;
