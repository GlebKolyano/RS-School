


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
    this.pet = pet
    let elem = document.createElement("div")
    elem.classList.add("modal")

    elem.innerHTML += `
    <div class="modal__overlay">
      <div class="container">
        <div class="modal__wrapper">
          <button class="modal-close">&times;</button>
          <div class="modal-content">
            <img class="modal__image" src="./assets/${pet.img}" />
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
    document.body.appendChild(elem)
    document.body.addEventListener("click", (e) => this.closeModal(e.target))
  }
  
  closeModal(target) {
    if (target.classList.contains("modal-close") || target.classList.contains("modal__overlay") || target.classList.contains("container")) {
      document.querySelectorAll(".modal").forEach(m => m.remove())
    } 
  }
  
}


// modal

