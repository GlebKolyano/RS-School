import PetsService from "../../services/pets.service.js"
import HelpService from "../../services/help.service.js"
import { Modal } from "../../plugins/modal.js"
import burgerMenu from "../../plugins/burger.js"
import smoothScroll from "../../plugins/smooth-scroll.js"


(async function () {
  let serviceHelp = new HelpService()
  let arrHelp =  await serviceHelp.getHelpBlocks().then(data => data.json())
  let helpGrid = document.querySelector(".help-grid")

  arrHelp.forEach((item) => {
  let helpBlock = document.createElement("div")
  helpBlock.classList.add("help-grid__item")
  
  helpBlock.innerHTML = `

      <img src="./assets/${item.img}" class="help-grid__image">
      <h3 class="help-grid__subtitle">${item.name}</h3>
  `
  helpGrid.appendChild(helpBlock)
})
})()

// header links effect

let headerLinks = document.querySelectorAll(".nav__link")

headerLinks.forEach((link) => 
  link.addEventListener("click", (event) => {
    headerLinks.forEach(item =>item.classList.remove("active"))
    event.target.classList.add("active")
   
}))

// petService
let servicePets = new PetsService()
let arrPets =  await servicePets.getPetsForSlider().then(data => data.json())

// slider
let nextBtn = document.querySelector(".pets__arrow-next")
let prevBtn = document.querySelector(".pets__arrow-prev")

let containerSlider = document.querySelector(".pets__slider")
let widthClient = document.documentElement.clientWidth

// INIT SLIDER
function initSlider() {
  containerSlider.append(generateSlide("left-slide"))
  containerSlider.append(generateSlide("center-slide"))
  containerSlider.append(generateSlide("right-slide"))
}
// GENERATE SLIDES
function generateSlide(position) {
  let slide = document.createElement("div")
  slide.classList.add("pets__items")
  slide.classList.add(`${position}`)

  if (widthClient >= 1280) (initCardForSlider(3, slide))
  if (widthClient < 1280) (initCardForSlider(2, slide))
  if (widthClient <= 767) (initCardForSlider(1, slide))

  return slide
}

let copyArr = [...arrPets]
let uniqItem

function initCardForSlider(n, slide) {
  let uniqPets = []

  while (uniqPets.length < n) {
    let r = Math.floor(Math.random() * copyArr.length)
    let item = copyArr.splice(r, 1)
    uniqPets.push(...item)
    
  }
  if (slide.classList.contains("left-slide")) {
    uniqItem = uniqPets[0]
  }

  if (copyArr.length === 2) (copyArr.push(uniqItem))

  createPetCards(uniqPets, slide)
}

function createPetCards(array, slide) {
  slide.innerHTML = ""

  array.forEach((pet) => {
    let petCard = document.createElement("section")
    petCard.classList.add("pets-card")
    petCard.setAttribute("data-id",`${pet.name}`)
    petCard.innerHTML = 
  `
    <div style="background: url(./assets/${pet.img})" class="pets-card__image" data-id="${pet.name}"></div>
    <div class="pets-card-info" data-id="${pet.name}">
      <h2 class="pets-card-info__title" data-id="${pet.name}">${pet.name}</h2>
      <button class="pets-card-info__button button" data-id="${pet.name}">Learn more</button>
    </div>
  `

  setTimeout(() => {petCard.style.opacity = 1}, 0)
  slide.appendChild(petCard)
})
}

const moveLeft = () => {

  containerSlider.classList.add("transition-left");
  prevBtn.removeEventListener("click", moveLeft);
  nextBtn.removeEventListener("click", moveRight);
};

const moveRight = () => {
  containerSlider.classList.add("transition-right");
  prevBtn.removeEventListener("click", moveLeft);
  nextBtn.removeEventListener("click", moveRight);
};

prevBtn.addEventListener("click", moveLeft);
nextBtn.addEventListener("click", moveRight);


function generateNewCard(n, slide, otherItemSide) {
  let uniqPets = []
  let uniqPetsOtherSide = []
  let namesOtherSide = []
  let namesRightSide = []
  let namesLeftSide = []
  let namesCenterSlide = []


  for (let el of [...document.querySelector(".center-slide").children]) {
    namesCenterSlide.push(el.dataset.id)
  }
  for (let el of  [...document.querySelector(".right-slide").children]) {
    namesRightSide.push(el.dataset.id)
  }
  for (let el of  [...document.querySelector(".left-slide").children]) {
    namesLeftSide.push(el.dataset.id)
  }

  if (slide.classList.contains("left-slide")) {
    for (let el of namesRightSide) {
      if (!namesLeftSide.includes(el)) {
        namesOtherSide.push(el)
      }  
    }
  }

  if (slide.classList.contains("right-slide")) {
     for (let el of namesLeftSide) {
      if (!namesRightSide.includes(el)) {
        namesOtherSide.push(el)
      }  
    }   
  }

  let copyArr = [...arrPets]
  while (uniqPets.length < n) {
    let r = Math.floor(Math.random() * copyArr.length)
    let item = copyArr.splice(r, 1)[0]
 
    if (!namesCenterSlide.includes(item.name) && !uniqPets.includes(item)) {
      uniqPets.push(item)
     } 
    }

    let newCopyArr = [...arrPets]

    while (uniqPetsOtherSide.length < n) {
    let r = Math.floor(Math.random() * newCopyArr.length)
    let item = newCopyArr.splice(r, 1)[0]
    
    if (!namesCenterSlide.includes(item.name) && !uniqPetsOtherSide.includes(item)) {
      uniqPetsOtherSide.push(item)
    } 
  }
  createPetCards(uniqPets, slide)
  createPetCards(uniqPetsOtherSide, otherItemSide)
}


containerSlider.addEventListener("animationend", (animationEvent) => {
  let newItemSide
  let otherItemSide

  const itemLeftSlide = document.querySelector(".left-slide");
  const itemRightSlide = document.querySelector(".right-slide");
  

  if (animationEvent.animationName === "move-left") {
    containerSlider.classList.remove("transition-left");
    newItemSide = itemLeftSlide
    otherItemSide = itemRightSlide
    document.querySelector(".center-slide").innerHTML = itemLeftSlide.innerHTML;
  } else {
    containerSlider.classList.remove("transition-right");
    newItemSide = itemRightSlide
    otherItemSide = itemLeftSlide
    document.querySelector(".center-slide").innerHTML = itemRightSlide.innerHTML;
  }

  if (widthClient >= 1280) (generateNewCard(3, newItemSide, otherItemSide))
  if (widthClient < 1280) (generateNewCard(2, newItemSide, otherItemSide))
  if (widthClient <= 767) (generateNewCard(1, newItemSide, otherItemSide))

  prevBtn.addEventListener("click", moveLeft);
  nextBtn.addEventListener("click", moveRight);
})

// modal window 
function addModalListener() {
  document.querySelector(".main").addEventListener("click", async (event) => {
  let modalService = new Modal()
  

  if (event.target.dataset.id) {
    event.preventDefault()
    let id = event.target.dataset.id
    
    let arrayItems = await servicePets.getPetsForSlider().then(data => data.json())
    let pet = arrayItems.filter(i => i.name === id)[0]
    modalService.createModal(pet)
  }
})
}

addModalListener()

// burger menu
burgerMenu()
// smooth scroll
smoothScroll()
// slider
initSlider()



