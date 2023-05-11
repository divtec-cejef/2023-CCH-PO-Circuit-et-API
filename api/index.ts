import expressServer from "./clients/express";
import sioServer from "./clients/socketio";
import prisma from "./clients/prismadb";
import http from "http";

const server = http.createServer(expressServer);
sioServer.attach(server);
expressServer.set("socketio", sioServer);
expressServer.set("prismadb", prisma);

server.listen(3000, () => {
	console.log("listening on *:3000");
});
