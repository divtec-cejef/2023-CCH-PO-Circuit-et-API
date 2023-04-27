const http = require('express');
const httpPort = 80;

const app = http();
app.use('/assets', http.static('dist/assets'));

app.all('*', (req, res) => {
	res.sendFile('index.html', { root: 'dist' });
});



app.listen(httpPort, () => {
	console.log(`HTTP server listening on port ${httpPort}`);
});
