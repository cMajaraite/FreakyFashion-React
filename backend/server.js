const express = require("express");
const Database = require("better-sqlite3");
const cors = require('cors');
const app = express();

const db = new Database("freakyfashion.db", { verbose: console.log });

app.use(express.json()); // Möjliggör JSON-data i POST-requests

app.use(express.static('public'));  // Gör bilder i public-mappen tillgängliga

app.use(cors({
  origin: "http://localhost:3000", // Tillåt endast förfrågningar från denna URL
}));

const PORT = 5000; // Backend körs på en annan port än frontend

// Test-route för att se om servern fungerar
app.get("/", (req, res) => {
  res.send("Backend fungerar! 🚀");
});

// Route för att hämta produkter
app.get("/products", (req, res) => {
  try {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Något gick fel med databasen" });
  }
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
