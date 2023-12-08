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
const mensagens_array = [ msg1, msg2, msg1, msg2 ]

init_web_socket(ip, username)

/* funcoes */
function init_web_socket(ip, username) {
    
    display_messages(mensagens_array);

    const cleanIp = ip.replace(/^http:\/\//, '');
    //console.log(cleanIp)
    //console.log(new Date(), `init_web_socket -- cleanIp: ${cleanIp}, username: ${username}`);

    try {
        // Corrigindo o formato da URL removendo "http//"
        socket = new WebSocket(`ws://${cleanIp}`);
        console.log(socket)

        socket.addEventListener('open', (event) => {
            console.log('Connected to WebSocket server');
        });
          
        socket.addEventListener('message', (event) => {
        try {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            console.log('event', JSON.stringify(event))
            // Tente analisar a mensagem como JSON
            const mensagemRecebida = JSON.parse(event.data);
            console.log('mensagemRecebida', mensagemRecebida)

            adicionarMensagem(mensagemRecebida);
          } catch (error) {
            console.error('Erro ao analisar a mensagem JSON:', error);
          }
        });
      } catch (err) {
        console.error(err);
      }
}

function display_messages (msgs_arr) {
    /*console.log(new Date(), "display_messages -- messages_container:", messages_container)*/
    console.log(new Date(), "display_messages -- msgs:", msgs_arr.length)
    msgs_arr.forEach(function (msg, i) {
        const messageString = typeof msg === 'object' ? JSON.stringify(msg) : msg;


        const messageObject = JSON.parse(messageString);
        const html = `
        <div class="unidade_msg">
            <div class="unidade_msg_nome">${messageObject.username}</div>
            <div class="unidade_msg_payload">${messageObject.payload}</div>
            <div class="unidade_msg_date">${messageObject.data}</div>
            </div>
        `
        messages_container.insertAdjacentHTML('afterbegin', html)
    })
}

function adicionarMensagem(mensagem) {

    console.log(mensagem.username)
    console.log(mensagem.payload)
    console.log(mensagem.data)
    let novaMensagem = {
        "username": mensagem.username,
        "payload": mensagem.payload,
        "data": mensagem.data
    }
    mensagens_array.push(novaMensagem)

    // Atualizar a tela com as novas mensagens
    display_messages(mensagens_array);
}

function send_message() {
    const msgInput = document.getElementById('input_mensagem');
    const msg_payload = msgInput.value.trim();

    if (msg_payload !== '') {
        const mensagem = {
            "username": username,
            "payload": msg_payload,
            "data": format_time(new Date())
        }

        const mensagem_buffer = JSON.stringify(mensagem);

        if (socket.readyState === WebSocket.OPEN) {
            socket.send(mensagem_buffer);
        } else {
            console.error('O WebSocket não está aberto.');
        }
        adicionarMensagem(mensagem);
        // Limpando o campo de mensagem
        msgInput.value = '';
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
