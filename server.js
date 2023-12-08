const WebSocketServer = require('ws');
 
const wss = new WebSocketServer.Server({ port: 8080 })
 
wss.on("connection", ws => {
    console.log(`New guest connected`);
 
    ws.send(`username:ex/payload:ex`);
 
    ws.on("message", data => {
        console.log(`Client has sent us:`, data.toString())
    });
 
    ws.on("close", () => {
        console.log("the client has disconnected");
    });
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");