


export class Modal {
  pet = {
    img: "", 
    name: "", 
    subname: "",
    breed: "",
    type: "",
    description: "",
    age: "",
    inoculations: [],
    diseases: [],
    parasites: ""
  }
  
  
  constructor() {}

  createModal(pet) {
    function addHoverForButton() {
      let modalOverlay = document.querySelector(".modal__overlay")

      function hoverHandler(e) {      
        if (window.getComputedStyle(e.target)["cursor"] === "pointer") {
          document.querySelector(".modal-close").style.backgroundColor = "#f1cdb3"
        } else {
          document.querySelector(".modal-close").style.backgroundColor = "transparent"
        }   
      }

      modalOverlay.addEventListener("mousemove", (e) => hoverHandler(e))
    }
    




    this.pet = pet
    let elem = document.createElement("div")
    elem.classList.add("modal")
    let picture
    // /glebkolyano-JSFE2022Q1/shelter/assets/${pet.img}
    if (document.documentElement.clientWidth > 767) {
      elem.innerHTML += `
    <div class="modal__overlay">
      <div class="container">
        <div class="modal__wrapper">
          <button class="modal-close">&times;</button>
          <div class="modal-content">
            <img class="modal__image" src="/glebkolyano-JSFE2022Q1/shelter/assets/${pet.img}" />   
            <div class="modal__info">
              <div class="modal__title">
                <h3 class="modal__name">${pet.name}</h3>
                <h4 class="modal__subname">${pet.type} - ${pet.breed}</h4>
              </div>
              <p class="modal__description">${pet.description}</p>
              <ul class="modal__params">
                <li><b>Age:</b> ${pet.age}</li>
                <li><b>Inoculations:</b> ${pet.inoculations.join(',')}</li>
                <li><b>Diseases:</b> ${pet.diseases.join(',')}</li>
                <li><b>Parasites:</b> ${pet.parasites} </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    `
    } else {
      elem.innerHTML += `
    <div class="modal__overlay">
      <div class="container">
        <div class="modal__wrapper">
          <button class="modal-close">&times;</button>
          <div class="modal-content">  
            <div class="modal__info">
              <div class="modal__title">
                <h3 class="modal__name">${pet.name}</h3>
                <h4 class="modal__subname">${pet.type} - ${pet.breed}</h4>
              </div>
              <p class="modal__description">${pet.description}</p>
              <ul class="modal__params">
                <li><b>Age:</b> ${pet.age}</li>
                <li><b>Inoculations:</b> ${pet.inoculations.join(',')}</li>
                <li><b>Diseases:</b> ${pet.diseases.join(',')}</li>
                <li><b>Parasites:</b> ${pet.parasites} </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    `
    }
    
    

  
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`

    document.documentElement.style.overflowY = "hidden"

    document.body.appendChild(elem)
    document.body.addEventListener("click", (e) => this.closeModal(e.target))

    addHoverForButton()
  }
  
  
  closeModal(target) {
    if (target.classList.contains("modal-close") || target.classList.contains("modal__overlay") || target.classList.contains("container")) {
      document.querySelectorAll(".modal").forEach(m => m.remove())
      document.body.style.paddingRight = "0px"
      document.documentElement.style.overflowY = "scroll"   

    } 
  }
  
}


// modal



