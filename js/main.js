'use strict'
// 1 day 
const cartButton = document.querySelector("#cart-button")
const modal = document.querySelector(".modal")
const close = document.querySelector(".close")
const buttonAuth = document.querySelector('.button-auth')
const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const logInForm = document.querySelector('#logInForm') 
const loginInput = document.querySelector('#login')
const uzerName = document.querySelector('.user-name')
const buttonOut = document.querySelector('.button-out')
const cardsRestaurants = document.querySelector('.cards-restaurants')//2day
const containerPromo = document.querySelector('.container-promo')
const restaurants = document.querySelector('.restaurants')
const menu = document.querySelector('.menu')
const logo = document.querySelector('.logo')
const cardsMenu = document.querySelector('.cards-menu')

let login = localStorage.getItem('key')

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open')
  if(modalAuth.classList.contains('is-open')){
    disableScrolling()
  }else{
    enableScrolling()
  }
  loginInput.style.borderColor = ''
}

function authorized() {
  function logOut() {
    login = null
    localStorage.removeItem('login')
    buttonAuth.style.display = ''
    uzerName.style.display = ''
    buttonOut.style.display = ''
    buttonOut.removeEventListener("click", logOut)
    checkAuth()
  }
  console.log('Пользователь авторизован')
  uzerName.textContent = login
  buttonAuth.style.display = 'none'
  uzerName.style.display = 'inline'
  buttonOut.style.display = 'block'

  buttonOut.addEventListener("click", logOut)
}

function  notAuthorized() {
  console.log('Пользователь не авторизован')

  function logIn(e) {
    e.preventDefault()
    
    if(loginInput.value.trim()){
      login = loginInput.value
      localStorage.setItem('key', login)
      toggleModalAuth()
      logInForm.removeEventListener('submit', logIn)
      buttonAuth.removeEventListener("click", toggleModalAuth)
      closeAuth.removeEventListener("click", toggleModalAuth)
      logInForm.reset()
      checkAuth()
    }else{
      loginInput.style.borderColor = 'tomato'
      loginInput.value = ''
    }
    
  }

  logInForm.addEventListener('submit', logIn)
  buttonAuth.addEventListener("click", toggleModalAuth)
  closeAuth.addEventListener("click", toggleModalAuth)
  modalAuth.addEventListener("click", (e)=> {
    
    if(e.target.classList.contains('modal-auth')){
      toggleModalAuth()
    }
  })
}

function checkAuth() {
  if(login){
    authorized()
  }else{
    notAuthorized()
  
  }
}

// 2 day 

function createCardRestaurant() {
  const card = `
          <a  class="card card-restaurant">
						<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">Пицца плюс</h3>
								<span class="card-tag tag">50 мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
									4.5
								</div>
								<div class="price">От 900 ₽</div>
								<div class="category">Пицца</div>
							</div>
						</div>
					</a>
  `
  cardsRestaurants.insertAdjacentHTML('afterbegin', card)
}


function createCardGood(){
  const cardGood = `
          <div class="card">
						<img src="img/pizza-plus/pizza-plus.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Плюс</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Чеддер», томаты, пепперони,
									телятина, грибы, бекон, болгарский перец.
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">805 ₽</strong>
							</div>
						</div>
					</div>
  `
  cardsMenu.insertAdjacentHTML('afterbegin', cardGood)
}

function openGoods(e) {

  const restorant = e.target.closest('.card-restaurant')
  if(restorant){
    restaurants.classList.add('hide')
    containerPromo.classList.add('hide')
    menu.classList.remove('hide')

    cardsMenu.textContent = ''

    createCardGood()
    createCardGood()
    createCardGood()
    createCardGood()
  }
}

cartButton.addEventListener("click", toggleModal)

close.addEventListener("click", toggleModal)

cardsRestaurants.addEventListener('click', openGoods)

logo.addEventListener('click',()=>{
  restaurants.classList.remove('hide')
  containerPromo.classList.remove('hide')
  menu.classList.add('hide')
})

checkAuth()
createCardRestaurant()
createCardRestaurant()