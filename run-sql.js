// run-sql.js (CommonJS)
const { Client } = require("pg");
const fs = require("fs");
const readline = require("readline");

const client = new Client({
    user: "webadmin",
    host: "195.15.237.246",
    database: "postgres",
    password: "IZeSDT1Sfi",
    port: 5432,
});

const nomRequete = [
    'ActiviteLesPlusEffectue',
    'NombreDeVoiture',
    'NombreDeCourse',
    'NombreDeCourseAvecVideo',
    'NombreActiviteEffectue',
    'NombreDeVoitureAyantEffectueMinimumUneActivite',
    'NombreDeVoitureAyantEffectueMinimumUneCourse',
    'NombreDeParticipantEffectueeMinimumUneCourseEtUneActivite'
]

const NomFichierRequeteSQL = "statistique.sql"
const cheminDossierRequeteSQL = "resultats-statistique/"

function poserUneQuestion(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}
async function createFile(nomFichierACreer) {
    try {
        await client.connect();

        const sqlFile = fs.readFileSync(NomFichierRequeteSQL, "utf8");
        const queries = sqlFile
            .split(";")
            .map(q => q.trim())
            .filter(q => q.length > 0);

        let allResults = {};

        for (let i = 0; i < queries.length; i++) {
            console.log(`▶️ Exécution de la requête ${i+1}: ${nomRequete[i]}`);
            const res = await client.query(queries[i]);
            allResults[nomRequete[i]] = res.rows;
        }

        fs.writeFileSync(cheminDossierRequeteSQL + nomFichierACreer, JSON.stringify(allResults, null, 2));
        console.log("✅ Résultats sauvegardés dans /resultats-statistique/" + nomFichierACreer);

    } catch (err) {
        console.error("❌ Erreur :", err);
    } finally {
        await client.end();
    }
}

async function creerOuModifierFichier() {
    console.log("Bonjour !");
    console.log("Avant de créer le fichier JSON, il faudra me donner l'année actuel (exemple rentrée en aout 2024 [2024-2025])");
    console.log("Mais si vous voulez modifier un fichier spécifique (changer totalement les données, entrez son année cela la remplacera");

    const reponseAnnee = await poserUneQuestion("Choisissez une année (exemple 2024-2025) : ");
    const nomFichier = "resultatStat_" + reponseAnnee + ".json";

    createFile(nomFichier);
}

creerOuModifierFichier()