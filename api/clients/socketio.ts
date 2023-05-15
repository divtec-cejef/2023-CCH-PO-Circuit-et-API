import sio from 'socket.io';
import type { Socket } from 'socket.io';
import { getShortestRaces, getRacesByCar, getRankByCar } from '../services/race/implementation';
import { getCarById, getCarByQueryId } from '../services/car/implementation';

const io = new sio.Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', async (socket: Socket) => {
  console.log('a user connected');

  if (typeof socket.handshake.query.carId !== 'string') {
    socket.disconnect(true);
    return;
  }

  socket.data.carId = parseInt(socket.handshake.query.carId);
  if (!await getCarById(socket.data.carId)) {
    socket.send({ status: 404, message: 'car not found' }).disconnect();
    return;
  }
  // envoyer les données de classement au client
  socket.emit('updatedRaces', await getShortestRaces());
  // envoyer les données de manches au client
  socket.emit('updatedUserRaces', {
    races: await getRacesByCar(socket.data.carId),
    rank: await getRankByCar(socket.data.carId)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

export default io;
