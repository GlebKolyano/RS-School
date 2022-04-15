export default function burgerMenu() {
  let header__burger = document.querySelector(".header__burger")
  let headerNav = document.querySelector(".header__nav")
  let head = document.body.querySelector(".header.pets-page")

header__burger.addEventListener("click", (e) => {
  if (e.target.classList.contains("activeBurger")) {
    e.target.classList.remove("activeBurger")
    headerNav.style.right = "-320px"
    setTimeout(() => {
      head.style.overflow = "hidden"
    }, 500) 
  } else {
    e.target.classList.add("activeBurger")
    headerNav.style.right = "0px"
    head.style.overflow = "visible"
  }
})

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("header") || e.target.classList.contains("container") || e.target.classList.contains("header__nav") || e.target.classList.contains("nav__link") ) {
    header__burger.classList.remove("activeBurger")
    headerNav.style.right = "-320px"
    head.style.overflow = "hidden"
  }  
})

}
