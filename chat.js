/* globais */
let socket

const ip = sessionStorage.getItem("ip")
const username = sessionStorage.getItem("username")

const msg1 = {
    username: 'sistema',
    payload: 'Você está online! Inicie uma conversa!',
    data: format_time(new Date())
    
}
const mensagens_array = [ msg1 ]

/* elementos */
const messages_container = document.querySelector('.bloco_msgs')
const bl_chat = document.querySelector('.bloco_chat')

/* inicia o processo */
init_web_socket(ip, username)

/* funcoes */
function init_web_socket(ip, username) {
    
    display_messages(mensagens_array);

    const cleanIp = ip.replace(/^http:\/\//, '');

    try {
        socket = new WebSocket(`ws://${cleanIp}`);
        console.log(socket)

        socket.addEventListener('open', (event) => {
            console.log('Connected to WebSocket server');
        });
          
        socket.addEventListener('message', (event) => {
        try {

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
