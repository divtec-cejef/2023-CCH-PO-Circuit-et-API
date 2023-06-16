import sio from 'socket.io';
import type { Socket } from 'socket.io';
import {
  getShortestRaces,
  getRacesByCar,
  getRankByCar,
  getNumberRaces,
  getShortestRace
} from '../services/race/implementation';
import { getCarById } from '../services/car/implementation';
import http from 'http';
import { getRealisationCount } from '../services/realise/implementation';

export default function buildSioServer (server: http.Server) {
  const io = new sio.Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', async (socket: Socket) => {
    if (socket.handshake.query.carId !== undefined) {
      if (typeof socket.handshake.query.carId !== 'string') {
        socket.disconnect(true);
        return;
      }

      socket.data.carId = parseInt(socket.handshake.query.carId);
      if (!await getCarById(socket.data.carId)) {
        socket.send({ status: 404, message: 'car not found' }).disconnect();
        return;
      }

      // envoyer les données de manches au client
      socket.emit('updatedUserRaces', {
        races: await getRacesByCar(socket.data.carId),
        rank: await getRankByCar(socket.data.carId)
      });

      console.log(`User connected with car id ${socket.handshake.query.carId}\n`);
    } else {
      console.log('User connected anonymously\n');
    }

    // envoyer les données de classement au client
    socket.emit('updatedRaces', {
      races: await getShortestRaces(),
      count: await getNumberRaces(),
      fastest: await getShortestRace()
    });

    // envoyer les données d'activité au client
    socket.emit('updatedActivities', {
      count: await getRealisationCount()
    });

    socket.on('disconnect', () => {
      console.log('user disconnected\n');
    });

    socket.prependAny((eventName, ...args) => {
      console.log('Caught incoming Event: ' + eventName);
      console.log('\n');
    });

    socket.prependAnyOutgoing((eventName, ...args) => {
      console.log('Caught outgoing Event: ' + eventName);
      console.log('\n');
    });
  });
  return io;
}
