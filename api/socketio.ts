import sio from 'socket.io';

const io = new sio.Server();

io.on('connection', (socket: any) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

export default io;
