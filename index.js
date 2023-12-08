/* globais */
let ip, username

/* elementos */
const ip_input = document.getElementById('ip_input')
const username_input = document.getElementById('username_input')
const pg_titulo = document.getElementById('page_title')

const btn_cadastro = document.querySelector('.button_cadastro')
const form_cad = document.querySelector('.form_cadastro')

function save_form_cadastro(){
  event.preventDefault() 

  const ip = ip_input.value.trim()
  const username = username_input.value.trim()
  
  sessionStorage.setItem("ip", ip)
  sessionStorage.setItem("username", username)
  
  window.location.href = 'chat.html'

}
