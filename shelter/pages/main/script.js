import PetsService from "../main/pets.service.js"
import HelpService from "../main/help.service.js"

// header links effect

let headerLinks = document.querySelectorAll(".nav__link")

headerLinks.forEach((link) => 
  link.addEventListener("click", (event) => {
    headerLinks.forEach(item =>item.classList.remove("active"))
    event.target.classList.add("active")
    console.log("click")
}))

// petService

let servicePets = new PetsService()

let arrPets =  await servicePets.getPetsForSlider().then(data => data.json())

// generate pets for slider



// slider
let nextBtn = document.querySelector(".pets__arrow-next")
let prevBtn = document.querySelector(".pets__arrow-prev")

function createPetCards(arrOfPets) {

  const containerSlider = document.querySelector(".pets__slider")
  containerSlider.innerHTML = ""

  arrOfPets.forEach((pet) => {
    let petCard = document.createElement("section")
    petCard.classList.add("pets-card")
   
    petCard.innerHTML = 
  `
    <div style="background: url(/assets/${pet.img})" class="pets-card__image"></div>
    <div class="pets-card-info">
      <h2 class="pets-card-info__title">${pet.name}</h2>
      <button class="pets-card-info__button button">Learn more</button>
    </div>
  `
  
  containerSlider.appendChild(petCard)
})
}

let uniqPets = [...arrPets.splice(0, 1), ...arrPets.splice(1, 1), ...arrPets.splice(2, 1)]
createPetCards(uniqPets)


nextBtn.addEventListener("click", () => {
  let widthClient = document.documentElement.clientWidth
  
  if (widthClient >= 1280) (generateUniqPetsArray(3))
  if (widthClient < 1280) (generateUniqPetsArray(2))
  if (widthClient <= 768) (generateUniqPetsArray(2))
  if (widthClient <= 320) (generateUniqPetsArray(1))
})

prevBtn.addEventListener("click", () => {
  let widthClient = document.documentElement.clientWidth
  
  if (widthClient >= 1280) (generateUniqPetsArray(3))
  if (widthClient < 1280) (generateUniqPetsArray(2))
  if (widthClient <= 768) (generateUniqPetsArray(2))
  if (widthClient <= 320) (generateUniqPetsArray(1))
})


function generateUniqPetsArray(n) {
  let copyArr = uniqPets
  uniqPets = []

  while (uniqPets.length < n) {
    let r = Math.floor(Math.random() * arrPets.length)
    uniqPets.push(...arrPets.splice(r, 1))
  }

  arrPets = [...arrPets, ...copyArr]
  
  createPetCards(uniqPets)
}



// DRAW HELP FUNCTION

(async function () {
  let serviceHelp = new HelpService()
  let arrHelp =  await serviceHelp.getHelpBlocks().then(data => data.json())
  let helpGrid = document.querySelector(".help-grid")

  arrHelp.forEach((item) => {
  let helpBlock = document.createElement("div")
  helpBlock.classList.add("help-grid__item")
  
  helpBlock.innerHTML = `
      <img src="/assets/${item.img}" class="help-grid__image">
      <h3 class="help-grid__subtitle">${item.name}</h3>
  `
  helpGrid.appendChild(helpBlock)
})
})()

// END



