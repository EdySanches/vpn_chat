/* globais */
let socket

const ip = sessionStorage.getItem("ip")
const username = sessionStorage.getItem("username")


/* elementos */
const messages_container = document.querySelector('.bloco_msgs')
const bl_chat = document.querySelector('.bloco_chat')
// const unid_msg_container

const msg1 = {
    username: 'edy',
    payload: 'aaaaaaaaaaaa',
    data: format_time(new Date())
    
}
const msg2 = {
    username: 'kelvin',
    payload: 'bbbbbbbbbbbbbbbbbbbb',
    data: format_time(new Date())
}
const mensagens_array = [ msg1, msg2, msg1, msg2, msg1, msg2, msg1, msg2 ]

init_web_socket(ip, username)

/* funcoes */
function init_web_socket(ip, username) {
    
    display_messages(mensagens_array)

    console.log(new Date(), `init_web_socket -- ip: ${ip}, username: ${username}`)

    try{
        socket = new WebSocket(`ws://${ip}`)
        socket.addEventListener('message', (event) => {
      
            mensagens_array.push(event.data)
            display_messages(mensagens_array)
        })
        console.log(socket)
    
    }catch(err){
        console.log()
    }
}

function display_messages (msgs_arr) {
    console.log(new Date(), "display_messages -- messages_container:", messages_container)
    console.log(new Date(), "display_messages -- msgs:", msgs_arr)

    msgs_arr.forEach(function (msg, i) {
        const html = `
        <div class="unidade_msg">
            <div class="unidade_msg_nome">${msg.username}</div>
            <div class="unidade_msg_payload">${msg.payload}</div>
            <div class="unidade_msg_date">${msg.data}</div>
            </div>
        `
        messages_container.insertAdjacentHTML('afterbegin', html)
    })
}

function send_message() {
    const msg = document.getElementById('input_mensagem');
    const msg_payload = msg.value.trim()
    // TODO username, payload e data
    const mensagem = {
        username: username,
        payload: msg_payload,
        data: new Date()
    }
    mensagens_array.push(mensagem)

    if (mensagem !== '') {
      socket.send(mensagem)
      mensagem.value = ''
    }
}

function format_time(date) {
    if (!(date instanceof Date)) {
      throw new Error('Invalid input. Please provide a valid Date object.');
    }
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }
