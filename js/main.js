const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// 1 day 

const buttonAuth = document.querySelector('.button-auth')
const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const logInForm = document.querySelector('#logInForm') 
const loginInput = document.querySelector('#login')
const uzerName = document.querySelector('.user-name')
const buttonOut = document.querySelector('.button-out')

let login = localStorage.getItem('key')

buttonAuth.addEventListener("click", toggleModalAuth)
closeAuth.addEventListener("click", toggleModalAuth)

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open")
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
    login = loginInput.value

    localStorage.setItem('key', login)

    toggleModalAuth()
    logInForm.removeEventListener('submit', logIn)
    buttonAuth.removeEventListener("click", toggleModalAuth)
    closeAuth.removeEventListener("click", toggleModalAuth)
    logInForm.reset()
    checkAuth()
  }

  logInForm.addEventListener('submit', logIn)
  buttonAuth.addEventListener("click", toggleModalAuth)
  closeAuth.addEventListener("click", toggleModalAuth)
}

function checkAuth() {
  if(login){
    authorized()
  }else{
    notAuthorized()
  
  }
}
checkAuth()