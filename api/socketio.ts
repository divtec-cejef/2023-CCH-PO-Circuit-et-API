import sio from 'socket.io';
import {getShortestRaces} from "./services/race/implementation";

const io = new sio.Server();

io.on('connection', async (socket: any) => {
	console.log('a user connected');

    // envoyer les données de classement au client
	socket.emit('updatedRaces', await getShortestRaces());

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

export default io;
