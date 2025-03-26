import express from "express";
import Database from "better-sqlite3";
import path from "path";
import cors from "cors";

const port = 8000;
const app = express();

// CORS-konfiguration för att tillåta requests från frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Gör bilder i public-mappen tillgängliga
app.use(express.static("public"));

// Middleware för att hantera JSON-data
app.use(express.json());

// Databasinställningar - använd samma sökväg som klasskamraten för enkelhetens skull
const dbPath = "./db/freakyfashion.db";

// Initiera databasen
function setupDb() {
  const db = new Database(dbPath, { verbose: console.log });

  // Skapa tabellen om den inte finns
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      sku TEXT NOT NULL,
      price REAL NOT NULL,
      brand TEXT,
      image TEXT,
      slug TEXT
    )
  `);

  return db;
}

// Initiera databasen
const db = setupDb();

// Test-route för att se om servern fungerar
app.get("/", (req, res) => {
  res.send("Backend fungerar! 🚀");
});

// ===== FRONTEND API ROUTES =====

// Hämta alla produkter (för frontend ProductGrid)
app.get("/products", (req, res) => {
  try {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  } catch (error) {
    console.error("Fel vid hämtning av produkter:", error);
    res.status(500).json({ error: "Något gick fel med databasen" });
  }
});

// Sök efter produkter (för frontend sökning)
app.get("/products/search", (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.status(400).json({ error: "Ingen sökterm angiven" });
  }

  try {
    console.log("Sökterm:", query);
    const sql = `SELECT * FROM products WHERE LOWER(name) LIKE ?`;
    const products = db.prepare(sql).all(`%${query}%`);
    res.json(products);
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Fel vid hämtning av produkter" });
  }
});

// Hämta liknande produkter (för SimilarProducts-komponenten)
app.get("/products/similar", (req, res) => {
  const productId = req.query.id;

  if (!productId) {
    return res.status(400).json({ error: "Missing product ID" });
  }

  try {
    const similarProducts = db
      .prepare("SELECT * FROM products WHERE id != ? LIMIT 3")
      .all(productId);

    res.json(similarProducts);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res
      .status(500)
      .json({ error: "Something went wrong fetching similar products" });
  }
});

// Hämta produkt via slug (för ProductDetails)
app.get("/products/:slug", (req, res) => {
  const { slug } = req.params;
  try {
    console.log("Hämtar produkt med slug:", slug);

    const product = db
      .prepare("SELECT * FROM products WHERE slug = ?")
      .get(slug);

    if (!product) {
      return res.status(404).json({ error: "Produkten hittades inte" });
    }

    res.json(product);
  } catch (error) {
    console.error("Fel vid hämtning av produkt:", error);
    res.status(500).json({ error: "Något gick fel vid hämtning av produkt" });
  }
});

// ===== ADMIN API ROUTES =====

// Hämta alla produkter för admin
app.get("/api/admin/products", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM products").all();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Lägg till en ny produkt (admin)
app.post("/api/admin/products", (req, res) => {
  try {
    const { name, description, sku, price, brand, image } = req.body;

    console.log("Mottagen data:", req.body);

    if (!name || !sku || !price) {
      console.error("Fel: Saknar nödvändiga fält");
      return res.status(400).json({ error: "Alla fält måste vara ifyllda" });
    }

    // Generera slug
    const slug = name
      .toLowerCase()
      .replace(/å/g, "a")
      .replace(/ä/g, "a")
      .replace(/ö/g, "o")
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Använd better-sqlite3 för att infoga data
    const stmt = db.prepare(`
      INSERT INTO products (name, description, sku, price, brand, image, slug) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(name, description, sku, price, brand, image, slug);

    console.log("Produkt sparad, skickar JSON-svar...");
    res.status(201).json({
      id: info.lastInsertRowid,
      name,
      description,
      sku,
      price,
      brand,
      image,
      slug,
    });
  } catch (err) {
    console.error("Databasfel:", err);
    return res.status(500).json({ error: "Kunde inte spara produkten" });
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Server körs på http://localhost:${port}`);
});
