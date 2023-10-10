import type { Socket } from 'socket.io';
import sio from 'socket.io';
import { getNumberRaces, getRacesByCar, getRankByCar, getShortestRace, getShortestRaces } from '../services/race';
import { getCarById } from '../services/car';
import http from 'http';
import { getRealisationCount, lastRealisedActivity, mostRealisedActivity } from '../services/realise';
import { TypedEventBroadcaster } from "socket.io/dist/typed-events";

export async function emitEvent (io: TypedEventBroadcaster<{[eventName: string]: any}>, eventName: string, data: any) {
  try {
    io.emit(eventName, data);
  } catch (e) {
    if (typeof e === 'string') {
      io.emit(eventName, { message: e });
    } else if (e instanceof Error) {
      io.emit(eventName, { message: e.message });
    } else {
      io.emit(eventName, { message: 'internal server error' });
    }
  }
}

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

      await emitEvent(socket, 'updatedUserRaces', {
        races: await getRacesByCar(socket.data.carId),
        rank: await getRankByCar(socket.data.carId)
      });

      console.log(`User connected with car id ${socket.handshake.query.carId}\n`);
    }

    // envoyer les données de classement au client
      const ranking = {
        races: await getShortestRaces(),
        count: await getNumberRaces(),
        fastest: await getShortestRace()
      };
    await emitEvent(socket, 'updatedRaces', ranking);

    // envoyer les données d'activité au client
    await emitEvent(socket, 'updatedActivities', {
      count: await getRealisationCount(),
      mostPopular: await mostRealisedActivity(),
      last: await lastRealisedActivity()
    })

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
