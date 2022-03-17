export default class PetsService {
  constructor() {}

  async getPetsForSlider() {
    let pets = await fetch("/assets/our-pets.json")
    return pets
  }
}

