import expressServer from './clients/express';
import buildSioServer from './clients/socketio';
import prisma from './clients/prismadb';
import http from 'http';
import dotenv from 'dotenv';
import cjs from 'crypto-js';

dotenv.config();

const server = http.createServer(expressServer);

expressServer.set('socketio', buildSioServer(server));
expressServer.set('prismadb', prisma);

if (process.env.CONTEXT === 'testing') {
  (async () => {
    await prisma.section.create({
      data: {
        label: 'test',
        password: cjs.SHA256('Admlocal1').toString()
      }
    });

    await prisma.activity.create({
      data: {
        label: 'tester',
        section: {
          connect: {
            label: 'test'
          }
        }
      }
    });
  })();
}

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
