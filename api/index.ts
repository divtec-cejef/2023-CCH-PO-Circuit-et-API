import expressServer from './clients/express';
import sioServer from './clients/socketio';
import prisma from './clients/prismadb';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer(expressServer);
sioServer.attach(server);
expressServer.set('socketio', sioServer);
expressServer.set('prismadb', prisma);

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
