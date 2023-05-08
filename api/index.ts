import expressServer from "./express";
import sioServer from "./socketio";
import http from "http";

const server = http.createServer(expressServer);
sioServer.attach(server);
expressServer.set("socketio", sioServer);

server.listen(3000, () => {
	console.log("listening on *:3000");
});
