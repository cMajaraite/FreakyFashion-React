import express from "express";
import Database from "better-sqlite3";
import path from "path";
import cors from "cors";
import fs from "fs";
import multer from "multer";

// Hämta nuvarande arbetskatalog (för att hantera filvägar)
const __dirname = process.cwd();
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

const dbPath = "./db/freakyfashion.db";

// Initiera databasen med relationsdatabas
function setupDb() {
  const db = new Database(dbPath, { verbose: console.log });

  // STEG 1: Skapa categories-tabellen FÖRST (master table)
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT
    )
  `);

  // STEG 2: Skapa products-tabellen med FOREIGN KEY (din struktur)
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
      isFavorite INTEGER DEFAULT 0,
      category_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    )
  `);

    // Spot-texts (oberoende tabell)
  db.exec(`
    CREATE TABLE IF NOT EXISTS spot_texts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      spot_key TEXT NOT NULL UNIQUE,
      display_text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // STEG 3: Lägg till grundkategorier om tabellen är tom
  const categoryCount = db
    .prepare("SELECT COUNT(*) as count FROM categories")
    .get();
  if (categoryCount.count === 0) {
    const insertCategory = db.prepare(
      "INSERT INTO categories (name, image) VALUES (?, ?)"
    );
    insertCategory.run("Dam", null);
    insertCategory.run("Herr", null);
    insertCategory.run("Barn", null);
    console.log("✅ Grundkategorier har lagts till");
  }

    // Grund spot-texts
  const spotCount = db.prepare("SELECT COUNT(*) as count FROM spot_texts").get();
  if (spotCount.count === 0) {
    const insertSpot = db.prepare("INSERT INTO spot_texts (spot_key, display_text) VALUES (?, ?)");
    insertSpot.run("women", "KVINNOR");
    insertSpot.run("men", "MÄN");
    insertSpot.run("kids", "BARN");
    console.log("✅ Grund spot-texts har lagts till");
  }

  // STEG 4: Lägg till testprodukter om tabellen är tom (din data)
  const productCount = db
    .prepare("SELECT COUNT(*) as count FROM products")
    .get();
  if (productCount.count === 0) {
    const insertProduct = db.prepare(`
      INSERT INTO products (id, name, price, brand, image, isNew, slug, description, sku, isFavorite, category_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertProduct.run(
      1,
      "Vit Skjorta",
      "299",
      "Levis",
      "/images/vit-skjorta.png",
      1,
      "Vit-Skjorta",
      "En vit skjorta i glatt material",
      "AAA111",
      1,
      1
    );
    insertProduct.run(
      2,
      "Svart Skjorta",
      "299",
      "Levis",
      "/images/svart-skjorta.png",
      1,
      "Svart-Skjorta",
      "Lorem ipsum dolor sit amet",
      "BBB111",
      0,
      1
    );
    insertProduct.run(
      3,
      "Grön Skjorta",
      "299",
      "Levis",
      "/images/grön-skjorta.png",
      0,
      "Gron-Skjorta",
      "Lorem ipsum dolor sit amet",
      "CCC111",
      0,
      2
    );
    insertProduct.run(
      4,
      "Vit Klänning",
      "599",
      "Levis",
      "/images/vit-klänning.png",
      0,
      "Vit-Klänning",
      "Lorem ipsum dolor sit amet",
      "DDD111",
      0,
      1
    );
    insertProduct.run(
      5,
      "Svart Klänning",
      "599",
      "Levis",
      "/images/svart-klänning.png",
      0,
      "Svart-Klänning",
      "Lorem ipsum dolor sit amet",
      "EEE111",
      0,
      1
    );
    insertProduct.run(
      6,
      "Svart Kjol",
      "399",
      "Levis",
      "/images/svart-kjol.png",
      0,
      "Svart-Kjol",
      "Lorem ipsum dolor sit amet",
      "FFF111",
      0,
      1
    );
    insertProduct.run(
      7,
      "Denim Kjol",
      "399",
      "Levis",
      "/images/denim-kjol.png",
      0,
      "Denim-Kjol",
      "Lorem ipsum dolor sit amet",
      "GGG111",
      0,
      2
    );
    insertProduct.run(
      8,
      "Blå Klänning",
      "599",
      "Levis",
      "/images/blå-klänning.png",
      0,
      "Bla-Klanning",
      "Lorem ipsum dolor sit amet",
      "HHH111",
      0,
      3
    );

    console.log("✅ Testprodukter har lagts till med kategori-relationer");
  }

  return db;
}

// säkerställ att mappar finns
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
ensureDir(path.join(__dirname, "public/images/products"));
ensureDir(path.join(__dirname, "public/images/categories"));

// enkel filtypskontroll
const imageFileFilter = (req, file, cb) => {
  if (/^image\//.test(file.mimetype)) cb(null, true);
  else cb(new Error("Only image uploads are allowed"), false);
};

// filnamn: tidsstämpel + originalext
const filename = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
  cb(null, `${Date.now()}-${base}${ext}`);
};

// separat storage för produkter och kategorier
const storageProducts = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "public/images/products")),
  filename,
});
const storageCategories = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "public/images/categories")),
  filename,
});

const uploadProductImage = multer({
  storage: storageProducts,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const uploadCategoryImage = multer({
  storage: storageCategories,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Initiera databasen
const db = setupDb();

// Test-route för att se om servern fungerar
app.get("/", (req, res) => {
  res.send("Backend fungerar! 🚀");
});

// ===== FRONTEND API ROUTES =====

// Hämta alla produkter med kategorinamn (JOIN)
app.get("/products", (req, res) => {
  try {
    const products = db
      .prepare(
        `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
    `
      )
      .all();
    res.json(products);
  } catch (error) {
    console.error("Fel vid hämtning av produkter:", error);
    res.status(500).json({ error: "Något gick fel med databasen" });
  }
});

// Hämta alla kategorier (för dynamisk meny)
app.get("/categories", (req, res) => {
  try {
    const categories = db
      .prepare("SELECT * FROM categories ORDER BY name")
      .all();
    res.json(categories);
  } catch (error) {
    console.error("Fel vid hämtning av kategorier:", error);
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
    const sql = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE LOWER(p.name) LIKE ?
    `;
    const products = db.prepare(sql).all(`%${query}%`);
    res.json(products);
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Fel vid hämtning av produkter" });
  }
});

app.get("/api/spot-texts", (req, res) => {
  try {
    const rows = db
      .prepare("SELECT spot_key, display_text FROM spot_texts ORDER BY spot_key")
      .all();
    
    // Konvertera till objekt för enklare användning
    const textsObject = {};
    rows.forEach(row => {
      textsObject[row.spot_key] = row.display_text;
    });
    
    res.json(textsObject);
  } catch (error) {
    console.error("Fel vid hämtning av spot texts:", error);
    res.status(500).json({ error: "Något gick fel med spot texts" });
  }
});

// Hämta produkter via kategori
app.get("/products/category/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = db
      .prepare(
        `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ?
    `
      )
      .all(categoryId);
    res.json(products);
  } catch (error) {
    console.error("Fel vid hämtning av produkter för kategori:", error);
    res.status(500).json({ error: "Något gick fel" });
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
      .prepare(
        `
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id != ? LIMIT 3
      `
      )
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
      .prepare(
        `
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.slug = ?
      `
      )
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

// Hämta alla kategorier (för dynamisk meny)
app.get("/categories", (req, res) => {
  try {
    const categories = db
      .prepare("SELECT * FROM categories ORDER BY name")
      .all();
    res.json(categories);
  } catch (error) {
    console.error("Fel vid hämtning av kategorier:", error);
    res.status(500).json({ error: "Något gick fel med databasen" });
  }
});

// ===== ADMIN API ROUTES =====

// Hämta alla produkter för admin med kategorinamn (JOIN)
app.get("/api/admin/products", (req, res) => {
  try {
    const rows = db
      .prepare(
        `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
    `
      )
      .all();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Lägg till en ny produkt (admin) med kategori-relation
// Lägg till en ny produkt (admin) med kategori-relation + filuppladdning
app.post(
  "/api/admin/products",
  uploadProductImage.single("image"),
  (req, res) => {
    try {
      const { name, description, sku, price, brand, category_id } = req.body;

      if (!name || !sku || !price) {
        return res
          .status(400)
          .json({ error: "Alla fält (namn, sku, pris) måste vara ifyllda" });
      }

      // bygg bild-URL från uppladdad fil
      const imageUrl = req.file
        ? `/images/products/${req.file.filename}`
        : null;

      // generera slug
      const slug = name
        .toLowerCase()
        .replace(/å/g, "a")
        .replace(/ä/g, "a")
        .replace(/ö/g, "o")
        .replace(/[\s\W-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const stmt = db.prepare(`
        INSERT INTO products (name, description, sku, price, brand, image, slug, category_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const info = stmt.run(
        name,
        description,
        sku,
        price,
        brand,
        imageUrl,
        slug,
        category_id ? Number(category_id) : null
      );

      res.status(201).json({
        id: info.lastInsertRowid,
        name,
        description,
        sku,
        price,
        brand,
        image: imageUrl,
        slug,
        category_id,
      });
    } catch (err) {
      console.error("Databasfel:", err);
      return res.status(500).json({ error: "Kunde inte spara produkten" });
    }
  }
);

// ===== KATEGORI ADMIN API ROUTES =====

// Hämta alla kategorier för admin
app.get("/api/admin/categories", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM categories ORDER BY name").all();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Lägg till en ny kategori (admin)
// Lägg till en ny kategori (admin) med bilduppladdning
app.post(
  "/api/admin/categories",
  uploadCategoryImage.single("image"),
  (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ error: "Kategorinamn måste vara ifyllt" });
      }

      // bygg bild-URL från uppladdad fil
      const imageUrl = req.file
        ? `/images/categories/${req.file.filename}`
        : null;

      const stmt = db.prepare(`
        INSERT INTO categories (name, image) 
        VALUES (?, ?)
      `);

      const info = stmt.run(name, imageUrl);

      res.status(201).json({
        id: info.lastInsertRowid,
        name,
        image: imageUrl,
      });
    } catch (err) {
      console.error("Databasfel:", err);
      return res.status(500).json({ error: "Kunde inte spara kategorin" });
    }
  }
);

// Starta servern
app.listen(port, () => {
  console.log(`Server körs på http://localhost:${port}`);
});
