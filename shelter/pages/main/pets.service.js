export default class PetsService {
  constructor() {}

  async getPetsForSlider() {
    let pets = await fetch("/assets/our-pets.json")
    return pets
  }

  async getPetsForPagination() {
    let pets = await fetch("/assets/our-pets.json").then(data => data.json())
    
    return [...pets, ...pets, ...pets, ...pets, ...pets, ...pets]
  }
}

