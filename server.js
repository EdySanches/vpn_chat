const WebSocket = require('ws')

const websocket = new WebSocket.Server({ port: 8080 })

let connections = [];

// httpserver.listen(8080, () => console.log("My server is listening on port 8080"))

//when a legit websocket request comes listen to it and get the connection .. ond 
websocket.on("request", request => {
    const connection = request.accept(null, request.origin)
    connection.on("message", message => {
        connections.forEach( c => c.send(`Usuario ${connection.socket.remotePort} disse ${message.utf8Data}!`)  )
    })
    //someone just sent a message tell everybody
    connections.push(connection)
    //someone just connected, tell everybody
    connections.forEach( c => c.send(`Usuario ${connection.socket.remotePort} se conectou!`) )
})
