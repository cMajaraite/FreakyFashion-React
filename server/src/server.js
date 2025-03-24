import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const port = 8000;
const app = express();

// Middleware för att hantera JSON-data
app.use(express.json());

// Öppna databasen
async function openDb() {
  return open({
    filename: "./db/freakyfashion.db",
    driver: sqlite3.Database,
  });
}

// Skapa tabellen om den inte finns
async function setupDb() {
  const db = await openDb();
  await db.exec(`
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
let dbPromise = setupDb();

// Hämta alla produkter
app.get("/api/admin/products", async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Lägg till en ny produkt
app.post("/api/admin/products", async (req, res) => {
  try {
    const db = await dbPromise;
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

    const result = await db.run(
      `INSERT INTO products (name, description, sku, price, brand, image, slug) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, description, sku, price, brand, image, slug]
    );

    console.log("Produkt sparad, skickar JSON-svar...");
    res.status(201).json({
      id: result.lastID,
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
  console.log(`Server körs på port ${port}`);
});
