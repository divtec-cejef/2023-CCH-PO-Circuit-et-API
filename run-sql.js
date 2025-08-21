// run-sql.js (CommonJS)
const { Client } = require("pg");
const fs = require("fs");

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

async function run() {
  try {
    await client.connect();

    const sqlFile = fs.readFileSync("statistique.sql", "utf8");
    const queries = sqlFile
        .split(";")
        .map(q => q.trim())
        .filter(q => q.length > 0);

    let allResults = {};

    for (let i = 0; i < queries.length; i++) {
      console.log(`▶️ Exécution de la requête ${i+1}`);
      const res = await client.query(queries[i]);
      allResults[nomRequete[i]] = res.rows;
    }

    fs.writeFileSync("result.json", JSON.stringify(allResults, null, 2));
    console.log("✅ Résultats sauvegardés dans result.json");

  } catch (err) {
    console.error("❌ Erreur :", err);
  } finally {
    await client.end();
  }
}

run();
