import sio from 'socket.io';
import type { Socket } from 'socket.io';
import { getShortestRaces } from '../services/race/implementation';

const io = new sio.Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', async (socket: Socket) => {
  console.log('a user connected');

  // envoyer les données de classement au client
  socket.emit('updatedRaces', await getShortestRaces());

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.data.carId = socket.handshake.query.carId;
});

export default io;
