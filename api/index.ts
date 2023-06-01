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
  const sectionTest = async () => {
    return await prisma.section.findFirst({ where: { label: 'test' } });
  };
  (async () => {
    if (await sectionTest() !== null) {
      console.info('Test section already exists');
      return;
    }

    await prisma.activity.create({
      data: {
        label: 'tester',
        section: {
          create: {
            label: 'test',
            password: cjs.SHA256('Admlocal1').toString()
          }
        }
      }
    });
    console.info('Created test section');
  })();
}

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
