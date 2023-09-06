import expressServer from './clients/express';
import buildSioServer from './clients/socketio';
import prisma from './clients/prismadb';
import http from 'http';
import dotenv from 'dotenv';

if (process.env.ENV !== 'DOCKER') {
  dotenv.config();
}

const server = http.createServer(expressServer);

expressServer.set('socketio', buildSioServer(server));
expressServer.set('prismadb', prisma);

server.listen(process.env.PORT ?? 3000, () => {
  console.log(`listening on *:${process.env.PORT ?? 3000}`);
});
