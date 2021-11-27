'use strict'
//import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js'
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
const restaurantTitle = document.querySelector('.restaurant-title')
const restaurantRating = document.querySelector('.rating')
const restaurantPrice = document.querySelector('.price')
const restaurantCategory = document.querySelector('.category')
const inputSearch = document.querySelector('.input-search')
const modalBody = document.querySelector('.modal-body')
const modalPricetag = document.querySelector('.modal-pricetag')
const buttonClearCart = document.querySelector('.clear-cart')

let login = localStorage.getItem('key')
const cart = []
const getData = async function (url){
  const response = await fetch(url)
  if(!response.ok){
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`)
  }
  return await response.json()
}


function validLoginName(str){
  const regName = /^[a-zA-Z][a-zA-Z0-9-_@\.]{1,20}$/
  return regName.test(str)
}

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
    cartButton.style.display = ''
    buttonOut.removeEventListener("click", logOut)
    checkAuth()
  }
  console.log('Пользователь авторизован')
  uzerName.textContent = login
  buttonAuth.style.display = 'none'
  uzerName.style.display = 'inline'
  buttonOut.style.display = 'flex'
  cartButton.style.display = 'flex'

  buttonOut.addEventListener("click", logOut)
}

function  notAuthorized() {
  console.log('Пользователь не авторизован')

  function logIn(e) {
    e.preventDefault()
    
    if(validLoginName(loginInput.value)){
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



function createCardRestaurant({ image, name, time_of_delivery, stars, price, kitchen, products  }) {
  
  
  const cardRestaurant = document.createElement('a')
  cardRestaurant.className = 'card card-restaurant'
  cardRestaurant.products = products
  cardRestaurant.info = { kitchen, name, price, stars}

  const card = `
						<img src=${image} alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name}</h3>
								<span class="card-tag tag">${time_of_delivery} мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
									${stars}
								</div>
								<div class="price">От ${price} ₽</div>
								<div class="category">${kitchen}</div>
							</div>
						</div>
  `
  cardRestaurant.insertAdjacentHTML('beforeend', card)
  cardsRestaurants.insertAdjacentElement('afterbegin', cardRestaurant)
  
}


function createCardGood({ id, name, description, price, image}){
  const cardGood = `
          <div class="card">
						<img src=${image} alt="${name}" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart" id="${id}">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price card-price-bold">${price} ₽</strong>
							</div>
						</div>
					</div>
  `
  cardsMenu.insertAdjacentHTML('afterbegin', cardGood)
}

function openGoods(e) {
  const restorant = e.target.closest('.card-restaurant')
  if(login){
    if(restorant){
      cardsMenu.textContent = ''
      restaurants.classList.add('hide')
      containerPromo.classList.add('hide')
      menu.classList.remove('hide')
      const { price, name, kitchen, stars } = restorant.info
      restaurantPrice.textContent = `от ${price}₽`
      restaurantCategory.textContent = name
      restaurantRating.textContent = stars
      restaurantTitle.textContent = kitchen
      //console.dir(restorant.info);
      getData(`./db/${restorant.products}`)
      .then((data) =>{
        data.forEach((item)=>{
          createCardGood(item)
         // creatHeaderCardRestorant(item)
        })
      })

      
    }
  }else{
    toggleModalAuth()
  }
  
}

function addToCart(e) {
  const target = e.target
  const buttonAddCart = target.closest('.button-add-cart')
if(buttonAddCart){
  const card = target.closest('.card')
  const title = card.querySelector('.card-title').textContent
  const cost = card.querySelector('.card-price').textContent
  const id = buttonAddCart.id
  const food = cart.find(item => item.id === id)
  if(food){
    food.count ++ 
  }else{
    cart.push({title, cost, id, count: 1})
  }
  
}
}
function renderCart(){
  modalBody.textContent = ''
  cart.forEach(({title, cost, id, count})=>{
    const itemHtml = `
        <div class="food-row">
					<span class="food-name">${title}</span>
					<strong class="food-price">${cost}</strong>
					<div class="food-counter">
						<button class="counter-button counter-minus" data-id=${id}>-</button>
						<span class="counter">${count}</span>
						<button class="counter-button counter-plus" data-id=${id}>+</button>
					</div>
				</div>
    `
    modalBody.insertAdjacentHTML('afterbegin',itemHtml)
  })
  
  const totalPrice = cart.reduce((accum, item) =>(parseFloat(item.cost) * item.count) + accum,0)
  modalPricetag.textContent = totalPrice + '₽'
}

function changeCount(e){
  const target = e.target
  if(target.classList.contains('counter-button')){
    const food = cart.find(item => item.id === target.dataset.id)
    if(target.classList.contains('counter-minus')){
      food.count--
      if(food.count === 0){
        cart.splice(cart.indexOf(food), 1)
      }
    }
    if(target.classList.contains('counter-plus'))food.count++
    renderCart()
  }
  
  
}

function init() {
  cartButton.addEventListener("click", ()=>{
  renderCart()
    toggleModal()
  })

  
buttonClearCart.addEventListener("click", toggleModal)
close.addEventListener("click", toggleModal)

cardsRestaurants.addEventListener('click', openGoods)

modalBody.addEventListener("click",changeCount)
console.log(modalBody);
cardsMenu.addEventListener('click', addToCart)

logo.addEventListener('click',()=>{
  restaurants.classList.remove('hide')
  containerPromo.classList.remove('hide')
  menu.classList.add('hide')
})
inputSearch.addEventListener('keypress',(e)=>{
  if(e.charCode === 13 ){
    const value = e.target.value.trim()
    if(!value){
      e.target.style.backgroundColor = 'tomato'
      e.target.value = ''
      setTimeout(()=>{
        e.target.style.backgroundColor = ''
      },1000)
      return
    }
    getData(`./db/partners.json`)
    .then((data)=>{
      return data.map((item)=>{
       return item.products
      })
    })
    .then((linkProducts)=>{
      cardsMenu.textContent = ''
      linkProducts.forEach(item=>{
        getData(`./db/${item}`)
        .then((data)=>{
          const resultSearch = data.filter(item=>{
            const name = item.name.toLowerCase();
            return name.includes(value.toLowerCase())
          })
          restaurants.classList.add('hide')
          containerPromo.classList.add('hide')
          menu.classList.remove('hide')

          restaurantPrice.textContent = `Вы нашли`
          restaurantCategory.textContent = ''
          restaurantRating.textContent = ''
          restaurantTitle.textContent = `Результат поиска`
          resultSearch.forEach(item=>{
            createCardGood(item)
          })
        })
      })
    })
  }
})
getData('./db/partners.json')
.then((data) =>{
  data.forEach((item)=>{
    createCardRestaurant(item)
  })
})
checkAuth()
new Swiper('.swiper', {
  slidePerView: 1,
  loop: true,
  autoplay: true,
  effect: 'cube'
});

}
init()