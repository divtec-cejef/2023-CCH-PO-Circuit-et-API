const express = require('express');
const path = require('path');
const fs = require('fs');
const httpPort = 8080;

const app = express();

// Utilise un chemin absolu basé sur l'emplacement de ton script
const distPath = path.join(__dirname, 'dist');

// Vérifie si le dossier dist existe avant de faire le readdirSync pour éviter un crash total
if (fs.existsSync(distPath)) {
    fs.readdirSync(distPath).forEach(v => {
        if (v !== 'index.html') {
            app.use('/' + v, express.static(path.join(distPath, v)));
        }
    });
}

app.all('*', (req, res) => {
    res.sendFile('index.html', { root: distPath });
});

app.listen(httpPort, () => {
    console.log(`HTTP server listening on port ${httpPort}`);
});