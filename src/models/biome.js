class Biome {
  constructor(name, description, temperature, fauna, flora){
    this.name = name;
    this.description = description;
    this.temperature = temperature;
    this.fauna = fauna;
    this.flora = flora;
    this.creationUser = creationUser;
    this.creationDate = new Date();
    this.modificationUser = creationUser;
    this.modificationDate = new Date();
    this.active = active;
  }
}

module.exports = Biome;
