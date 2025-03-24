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

app.get("/products/search", (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.status(400).json({ error: "Ingen sökterm angiven" });
  }

  try {
    console.log("Sökterm:", query); // Logga söktermen
    const sql = `SELECT * FROM products WHERE LOWER(name) LIKE ?`;
    const products = db.prepare(sql).all(`%${query}%`); // Synkron SQLite-sökning
    res.json(products);
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Fel vid hämtning av produkter" });
  }
});

// This route should come BEFORE the :slug route
app.get("/products/similar", (req, res) => {
  const productId = req.query.id;
  
  if (!productId) {
    return res.status(400).json({ error: "Missing product ID" });
  }
  
  try {
    // You can customize this query based on your database structure
    // This example just gets 4 random products that aren't the current product
    const similarProducts = db
      .prepare("SELECT * FROM products WHERE id != ? LIMIT 3")
      .all(productId);
    
    res.json(similarProducts);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res.status(500).json({ error: "Something went wrong fetching similar products" });
  }
});

// The dynamic parameter route should come AFTER the specific route
app.get("/products/:slug", (req, res) => {
  const { slug } = req.params;
  try {
    console.log("Hämtar produkt med slug:", slug); // Testa om slug tas emot

    const product = db.prepare("SELECT * FROM products WHERE slug = ?").get(slug);

    if (!product) {
      return res.status(404).json({ error: "Produkten hittades inte" });
    }

    res.json(product);
  } catch (error) {
    console.error("Fel vid hämtning av produkt:", error);
    res.status(500).json({ error: "Något gick fel vid hämtning av produkt" });
  }
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
