export default class PetsService {
  constructor() {}
  
  async getPetsForSlider() {

    let pets = await fetch("../assets/our-pets.json")

    return pets
  }

  async getPetsForPagination() {

    let pets = await fetch("../assets/our-pets.json").then(data => data.json())

    
    return [...pets.sort(() => Math.random() - 0.5), ...pets.sort(() => Math.random() - 0.5), ...pets.sort(() => Math.random() - 0.5), ...pets.sort(() => Math.random() - 0.5), ...pets.sort(() => Math.random() - 0.5), ...pets.sort(() => Math.random() - 0.5)]
  }
}

