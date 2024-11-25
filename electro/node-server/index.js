const express = require("express");
const app = express();
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const options = {
  key: fs.readFileSync(path.join(__dirname, "server-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "server-cert.pem"))
};
const serverHttps = https.createServer(options, app);
const { Server } = require("socket.io");

const server = http.createServer();
const ioHttp = new Server(server);
const ioHttps = new Server(serverHttps);

// Définit les routes pour les fichiers du site
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Ouvre le serveur au port 3000
serverHttps.listen(8080, () => {
  console.log("Https opened on *:8080");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

// Lorsqu'on se connecte au server
ioHttp.on("connection", (socketHttp) => {
  console.log("A user has been connected");

  ioHttps.on("connection", (socket) => {
    console.log("A user has been connected");
  
    // Redirige les requêtes lorsqu"une nouvelle voiture est scannée
    socket.on("newCar", (id) => {
        console.log("Nouvelle voiture : " + id);
        socketHttp.emit("newCar", id);
    });
  
    // Test listener
    socket.on("test", (value) => {
      console.log(value);
    });
  });
});

