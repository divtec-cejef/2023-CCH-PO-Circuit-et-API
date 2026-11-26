const express = require('express');
const path = require('path');
const fs = require('fs');
const httpPort = 8080;

const app = express();

// Cherche le dossier dist soit à la racine, soit dans un sous-dossier 'front'
let distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
    const alternativePath = path.join(__dirname, 'front', 'dist');
    if (fs.existsSync(alternativePath)) {
        distPath = alternativePath;
    }
}

console.log(`Using dist path: ${distPath}`);

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