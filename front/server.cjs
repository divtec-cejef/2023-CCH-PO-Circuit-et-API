const express = require('express');
const path = require('path');
const fs = require('fs');
const httpPort = 8080;

const app = express();

// On cible explicitement le dossier dist qui est dans le sous-dossier 'front'
const distPath = path.join(__dirname, 'front', 'dist');

console.log(`Chemin cible du dist : ${distPath}`);

if (fs.existsSync(distPath)) {
    fs.readdirSync(distPath).forEach(v => {
        if (v !== 'index.html') {
            app.use('/' + v, express.static(path.join(distPath, v)));
        }
    });
} else {
    console.error(`ATTENTION : Le dossier dist est introuvable à l'emplacement : ${distPath}`);
}

app.all('*', (req, res) => {
    res.sendFile('index.html', { root: distPath });
});

app.listen(httpPort, () => {
    console.log(`HTTP server listening on port ${httpPort}`);
});