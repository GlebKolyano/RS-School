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

