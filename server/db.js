const Database = require("better-sqlite3");

// Öppna eller skapa databasen
const db = new Database("./db/freakyfashion.db", { verbose: console.log });

// Skapa tabellen om den inte redan finns
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    brand TEXT NOT NULL,
    image TEXT,
    isNew INTEGER DEFAULT 0,
    slug TEXT,
    description TEXT,
    sku TEXT NOT NULL UNIQUE,
    isFavorite INTEGER DEFAULT 0
  )
`);

// Funktion för att lägga till produkter om databasen är tom
function addProducts() {
  const products = [
    {
      id: 1,
      name: "Vit Skjorta",
      price: "299",
      brand: "Levis",
      image: "/images/vit-skjorta.png",
      isNew: 1,
      slug: "Vit-Skjorta",
      description: "En vit skjorta i glatt material",
      sku: "AAA111",
      isFavorite: 1,
    },
    {
      id: 2,
      name: "Svart Skjorta",
      price: "299",
      brand: "Levis",
      image: "/images/svart-skjorta.png",
      isNew: 1,
      slug: "Svart-Skjorta",
      description: "Lorem ipsum dolor sit amet",
      sku: "BBB111",
      isFavorite: 0,
    },
    {
      id: 3,
      name: "Grön Skjorta",
      price: "299",
      brand: "Levis",
      image: "/images/grön-skjorta.png",
      isNew: 0,
      slug: "Gron-Skjorta",
      description: "Lorem ipsum dolor sit amet",
      sku: "CCC111",
      isFavorite: 0,
    },
    {
      id: 4,
      name: "Vit Klänning",
      price: "599",
      brand: "Levis",
      image: "/images/vit-klänning.png",
      isNew: 0,
      slug: "Vit-Klänning",
      description: "Lorem ipsum dolor sit amet",
      sku: "DDD111",
      isFavorite: 0,
    },
    {
      id: 5,
      name: "Svart Klänning",
      price: "599",
      brand: "Levis",
      image: "/images/svart-klänning.png",
      isNew: 0,
      slug: "Svart-Klänning",
      description: "Lorem ipsum dolor sit amet",
      sku: "EEE111",
      isFavorite: 0,
    },
    {
      id: 6,
      name: "Svart Kjol",
      price: "399",
      brand: "Levis",
      image: "/images/svart-kjol.png",
      isNew: 0,
      slug: "Svart-Kjol",
      description: "Lorem ipsum dolor sit amet",
      sku: "FFF111",
      isFavorite: 0,
    },
    {
      id: 7,
      name: "Denim Kjol",
      price: "399",
      brand: "Levis",
      image: "/images/denim-kjol.png",
      isNew: 0,
      slug: "Denim-Kjol",
      description: "Lorem ipsum dolor sit amet",
      sku: "GGG111",
      isFavorite: 0,
    },
    {
      id: 8,
      name: "Blå Klänning",
      price: "599",
      brand: "Levis",
      image: "/images/blå-klänning.png",
      isNew: 0,
      slug: "Bla-Klanning",
      description: "Lorem ipsum dolor sit amet",
      sku: "HHH111",
      isFavorite: 0,
    },
  ];

  const stmt = db.prepare(`
    INSERT INTO products (name, price, brand, image, isNew, slug, description, sku, isFavorite)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  products.forEach((product) => {
    try {
      stmt.run(
        product.name,
        product.price,
        product.brand,
        product.image,
        product.isNew,
        product.slug,
        product.description,
        product.sku,
        product.isFavorite
      );
    } catch (error) {
      console.log(
        `❌ Kunde inte lägga in produkt med SKU ${product.sku}: ${error.message}`
      );
    }
  });

  console.log("✅ Produkter har lagts till i databasen!");
}

// Funktion för att hämta alla produkter
function getAllProducts() {
  return db.prepare("SELECT * FROM products").all();
}

// Lägg till produkterna om databasen är tom
if (getAllProducts().length === 0) {
  addProducts();
}

// Exportera funktioner för att användas i server.js
module.exports = { db, getAllProducts };
