import sio from 'socket.io';
import type { Socket } from 'socket.io';
import {
  getShortestRaces,
  getRacesByCar,
  getRankByCar,
  getNumberRaces,
  getShortestRace
} from '../services/race';
import { getCarById } from '../services/car';
import http from 'http';
import { getRealisationCount, mostRealisedActivity, lastRealisedActivity } from '../services/realise';

export default function buildSioServer (server: http.Server) {
  const io = new sio.Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', async (socket: Socket) => {
    if (!socket.handshake.query.carId) {
      console.log('User connected anonymously\n');
    } else {
      if (typeof socket.handshake.query.carId !== 'string') {
        socket.disconnect(true);
        return;
      }

      socket.data.carId = parseInt(socket.handshake.query.carId);
      // vérifie la validité de l'id
      if (typeof socket.data.carId === null || isNaN(socket.data.carId)) {
        socket.send({ status: 400, message: 'invalid car id' }).disconnect();
        return;
      }

      if (!await getCarById(socket.data.carId)) {
        socket.send({ status: 404, message: 'car not found' }).disconnect();
        return;
      }

      // envoyer les données de manches au client
      try {
        socket.emit('updatedUserRaces', {
          races: await getRacesByCar(socket.data.carId),
          rank: await getRankByCar(socket.data.carId)
        });
      } catch (e) {
        if (typeof e === 'string') {
          socket.emit('updatedUserRaces', { message: e });
        } else if (e instanceof Error) {
          socket.emit('updatedUserRaces', { message: e.message });
        } else {
          socket.emit('updatedUserRaces', { message: 'internal server error' });
        }
      }

      console.log(`User connected with car id ${socket.handshake.query.carId}\n`);
    }

    // envoyer les données de classement au client
    try {
      const ranking = {
        races: await getShortestRaces(),
        count: await getNumberRaces(),
        fastest: await getShortestRace()
      };
      socket.emit('updatedRaces', ranking);
    } catch (e) {
      if (typeof e === 'string') {
        socket.emit('updatedRaces', { message: e });
      } else if (e instanceof Error) {
        socket.emit('updatedRaces', { message: e.message });
      } else {
        socket.emit('updatedRaces', { message: 'internal server error' });
      }
    }

    // envoyer les données d'activité au client
    try {
      socket.emit('updatedActivities', {
        count: await getRealisationCount(),
        mostPopular: await mostRealisedActivity(),
        last: await lastRealisedActivity()
      });
    } catch (e) {
      if (typeof e === 'string') {
        socket.emit('updatedActivities', { message: e });
      } else if (e instanceof Error) {
        socket.emit('updatedActivities', { message: e.message });
      } else {
        socket.emit('updatedActivities', { message: 'internal server error' });
      }
    }

    socket.on('disconnect', () => {
      console.log('user disconnected\n');
    });

    socket.prependAny((eventName) => {
      console.log('Caught incoming Event: ' + eventName);
      console.log('\n');
    });

    socket.prependAnyOutgoing((eventName) => {
      console.log('Caught outgoing Event: ' + eventName);
      console.log('\n');
    });
  });
  return io;
}
