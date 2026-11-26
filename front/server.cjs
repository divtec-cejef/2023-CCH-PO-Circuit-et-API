const http = require('express');
const fs = require('fs');
const httpPort = 8080;

const app = http();

fs.readdirSync("dist").forEach(v => {
    if(v !== 'index.html')
        app.use('/' + v, http.static('dist/' + v))
})

app.all('*', (req, res) => {
    res.sendFile('index.html', {root: 'dist'});
});

app.listen(httpPort, () => {
    console.log(`HTTP server listening on port ${httpPort}`);
});
