const express = require("express");
const server = require("http").createServer();
const app = express();

app.get("/", function(req, res) {
    res.sendFile("index.html", {root: __dirname});
});

server.on("request", app);
server.listen(3000, function() {console.log("server started on port 3000")});

/** Begin Websocket */
const WebsocketServer = require("ws").Server;

const wss = new WebsocketServer({server: server});

wss.on("connection", function connection(ws) {
    const numClients = wss.clients.size;
    console.log(`Clients connected`, numClients);

    wss.boardcast(`Current visitors: ${numClients}`);

    if(ws.readyState === ws.OPEN) {
        ws.send("Welcome to my server");
    }

    ws.on('close', function close() {
        wss.boardcast(`Current visitors: ${numClients}`);
        console.log("Client has disconnected");
    });
});

wss.boardcast = function broadcast(data) {
    wss.clients.forEach(function each(clients) {
        clients.send(data);
    });
} 