import burgerMenu from "../../plugins/burger.js"
import { Modal } from "../../plugins/modal.js"
import PetsService from "../../services/pets.service.js"
import smoothScroll from "../../plugins/smooth-scroll.js"



let headerLinks = document.querySelectorAll(".nav__link")

headerLinks.forEach((link) =>
  link.addEventListener("click", (event) => {
    headerLinks.forEach(item => item.classList.remove("active"))
    event.target.classList.add("active")

  }))

let serivePetsPag = new PetsService()
let petsForPagintation = await serivePetsPag.getPetsForPagination()

let petsPagWrapper = document.querySelector(".pets-page__pagination")

let allBtns = document.querySelectorAll(".pag-button")
let petsBtnFirst = document.querySelector(".pets-page__button-first")
let petsBtnLast = document.querySelector(".pets-page__button-last")
let petsBtnNext = document.querySelector(".pets-page__button-next")
let petsBtnPrev = document.querySelector(".pets-page__button-prev")
let petsBtnNum = document.querySelector(".pets-page__button-number")


let currentPage = 0
let maxElements

let widthClient = document.documentElement.clientWidth

function initArrayPetsForPagination() {
  if (widthClient >= 1280) {
    maxElements = 8
    getRandomPets(maxElements)
  } else if (widthClient < 1280 && widthClient >= 768) {
    maxElements = 6
    getRandomPets(maxElements)
  } else if (widthClient < 768) {
    maxElements = 3
    getRandomPets(maxElements)
  }
}


let testCopyArr = [...petsForPagintation]
let finishArrPets = []
let testCountObj = {
  "Charly": 0,
  "Freddie": 0,
  "Jennifer": 0,
  "Katrine": 0,
  "Scarlett": 0,
  "Sophia": 0,
  "Timmy": 0,
  "Woody": 0,
}

function getRandomPets(maxItems = 6) {
  for (let i = 0; i < 48 / maxItems; i++) {
    let uniqArr = []

    while (uniqArr.length < maxItems) {
      for (let i = 0; i < testCopyArr.length; i++) {
        if (!uniqArr.includes(testCopyArr[i]) && testCountObj[testCopyArr[i].name] < 6) {
          testCountObj[testCopyArr[i].name] += 1
          uniqArr.push(testCopyArr[i])
          testCopyArr.splice(i, 1)
          break
        }
      }
    }

    finishArrPets.push(...uniqArr)
  }
  console.log("Количество питомцев:", testCountObj)
}

initArrayPetsForPagination(maxElements)

function viewElementsOfPagination(page, maxItems) {

  petsPagWrapper.innerHTML = ""
  petsBtnNum.textContent = page + 1

  let petsOfCurrentPage = finishArrPets.slice(maxItems * page, maxItems * page + maxItems)

  petsOfCurrentPage = [...new Set(petsOfCurrentPage)]
  while (petsOfCurrentPage.length < maxItems) {
    for (let item of petsForPagintation) {
      if (!petsOfCurrentPage.includes(item)) {
        petsOfCurrentPage.push(item)
        break
      }
    }
  }


  petsOfCurrentPage.forEach((pet) => {
    let petCard = document.createElement("section")
    petCard.classList.add("pets-card")
    petCard.setAttribute("data-id", `${pet.name}`)
    petCard.innerHTML =
      `

    <div style="background: url(../../assets/${pet.img})" class="pets-card__image" data-id="${pet.name}"></div>

    <div class="pets-card-info" data-id="${pet.name}">
      <h2 class="pets-card-info__title" data-id="${pet.name}">${pet.name}</h2>
      <button class="pets-card-info__button button" data-id="${pet.name}">Learn more</button>
    </div>
  `
    setTimeout(() => { petCard.style.opacity = 1 }, 0)
    petsPagWrapper.appendChild(petCard)
  })
}



petsBtnFirst.setAttribute("disabled", true)
petsBtnFirst.classList.add("inactive")
petsBtnPrev.setAttribute("disabled", true)
petsBtnPrev.classList.add("inactive")

petsBtnFirst.addEventListener("click", () => paginationButtonFirst())
petsBtnLast.addEventListener("click", () => paginationButtonLast())
petsBtnNext.addEventListener("click", () => paginationButtonNext())
petsBtnPrev.addEventListener("click", () => paginationButtonPrev())


function paginationButtonNext() {
  if (currentPage < (petsForPagintation.length / maxElements) - 1) {
    currentPage += 1
    viewElementsOfPagination(currentPage, maxElements)
    checkButtons(currentPage, maxElements)
  }
}
function paginationButtonPrev() {
  if (currentPage !== 0) {
    currentPage -= 1
    viewElementsOfPagination(currentPage, maxElements)
    checkButtons(currentPage, maxElements)
  }
}
function paginationButtonLast() {
  currentPage = (petsForPagintation.length / maxElements) - 1
  checkButtons(currentPage, maxElements)
  viewElementsOfPagination(currentPage, maxElements)

}
function paginationButtonFirst() {
  currentPage = 0
  checkButtons(currentPage, maxElements)
  viewElementsOfPagination(currentPage, maxElements)
}

function checkButtons(page, maxItems) {
  let maxPages = (petsForPagintation.length / maxItems) - 1
  allBtns.forEach((btn) => {
    btn.classList.add("inactive")
    btn.setAttribute("disabled", "true")
  })

  if (page > 0 && page < maxPages) {
    allBtns.forEach((btn) => {
      btn.classList.remove("inactive")
      btn.removeAttribute("disabled")
    })
  } else if (page === 0) {
    petsBtnLast.classList.remove("inactive")
    petsBtnLast.removeAttribute("disabled")

    petsBtnNext.classList.remove("inactive")
    petsBtnNext.removeAttribute("disabled")
  } else if (page === maxPages) {
    petsBtnFirst.classList.remove("inactive")
    petsBtnFirst.removeAttribute("disabled")
    petsBtnPrev.classList.remove("inactive")

    petsBtnPrev.removeAttribute("disabled")
  }

}

viewElementsOfPagination(currentPage, maxElements)


// modal window 

function addModalListener() {
  document.querySelector(".main").addEventListener("click", async (event) => {
    let modalService = new Modal()
    let servicePets = new PetsService()

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


// burger

burgerMenu()

// smooth scroll

smoothScroll()


