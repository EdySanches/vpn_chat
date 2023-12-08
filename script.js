/* globais */
let ip, username
let socket
let titulo_pag = 'Cadastro'

/* elementos */
const ip_input = document.getElementById('ip_input')
const username_input = document.getElementById('username_input')
const pg_titulo = document.getElementById('page_title')

const messages_container = document.querySelector('.bloco_msgs')

const btn_cadastro = document.querySelector('.button_cadastro')
const form_cad = document.querySelector('.form_cadastro')
const bl_chat = document.querySelector('.bloco_chat')

const msg1 = {
    username: 'edy',
    payload: 'aaaaaaaaaaaa'
}
const msg2 = {
    username: 'kelvin',
    payload: 'bbbbbbbbbbbb'
}
const mensagens_array = [ msg1, msg2, msg1, msg2, msg1, msg2, msg1, msg2, msg1, msg2, msg1, msg2, msg1, msg2, msg1, msg2, msg1, msg2 ]

/* funcoes */
function save_form_cadastro() {
  event.preventDefault() 
  irParaPagina2()

  const ip = ip_input.value.trim()
  const username = username_input.value.trim()
  console.log(new Date(), `save_form_cadastro -- ip: ${ip}, username: ${username}`)
  
  socket = new WebSocket(`ws://${ip}`)
  socket.addEventListener('message', (event) => {

    mensagens_array.push(event.data)
    display_messages(mensagens_array)
  })

  bl_chat.style.opacity = 100
  pg_titulo.textContent = 'Chat'
  display_messages(mensagens_array)
}

function display_messages (msgs_arr) {
    console.log(new Date(), "display_messages -- messages_container:", messages_container)
    console.log(new Date(), "display_messages -- msgs:", msgs_arr)

    msgs_arr.forEach(function (msg, i) {
        const html = `
        <div class="unidade_msg">
            <div class="unidade_msg_nome">${msg.username}</div>
            <div class="unidade_msg_payload">${msg.payload}</div>
        </div>
        `
        messages_container.insertAdjacentHTML('afterbegin', html)
    })
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
  
    if (message !== '') {
      socket.send(message);
      messageInput.value = '';
    }
}

function irParaPagina2() {
  // Mudar para a página 2
  window.location.href = 'chat.html';
}