import sio from 'socket.io';
import type { Socket } from 'socket.io';
import { getShortestRaces, getRacesByCar } from '../services/race/implementation';
import { getCarByQueryId } from '../services/car/implementation';

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

  socket.data.carId = (await getCarByQueryId(socket.handshake.query.carId))?.id_car;
  // envoyer les données de classement au client
  socket.emit('updatedRaces', await getShortestRaces());
  // envoyer les données de manches au client
  socket.emit('updatedUserRaces', await getRacesByCar(socket.data.carId));

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

export default io;
