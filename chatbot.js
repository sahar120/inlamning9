const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Skapa en anslutning till MySQL-databasen
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webbserverprogrammering",
});

// Öppna anslutningen
connection.connect((err) => {
  if (err) {
    console.error("Fel vid anslutning till MySQL-databasen: ", err);
  } else {
    console.log("Anslutning till MySQL-databasen lyckades");
  }
});

// Definiera en rutt för GET-anrop
app.get("/result", (req, res) => {
  const userInput = req.query.input;

  // Hämta motsvarande output från databasen
  const query = `SELECT output FROM chatbot WHERE input='${userInput}'`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Fel vid SQL-fråga: ", err);
      res.status(500).send("Ett fel inträffade");
    } else if (results.length === 0) {
      res.status(404).send("Ingen matchande post hittades");
    } else {
      const output = results[0].output;
      res.send(`Output: ${output}`);
    }
  });
});

// Starta servern
app.listen(port, () => {
  console.log(`Servern är igång på post ${post}.`);
});
