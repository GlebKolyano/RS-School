import PetsService from "../main/pets.service.js"

// header links effect

let headerLinks = document.querySelectorAll(".header__link")

headerLinks.forEach((link) => 
  link.addEventListener("click", (event) => {
    headerLinks.forEach(item =>item.classList.remove("active"))
    event.target.classList.add("active")
    console.log("click")
}))

// petService

let servicePets = new PetsService()

let pets =  await servicePets.getPetsForSlider().then(data => data.json())

// generate pets for slider

const containerSlider = document.querySelector(".pets__slider")

pets.forEach((pet) => {
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