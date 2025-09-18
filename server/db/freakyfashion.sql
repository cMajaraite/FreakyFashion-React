
-- En-till-många relation: En kategori kan ha många produkter

-- Ta bort gamla tabeller om de finns
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- STEG 1: Skapa categories-tabellen (master table)
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  image TEXT
);

-- STEG 2: Skapa products-tabellen med FOREIGN KEY relation (behåller din struktur)
CREATE TABLE products (
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
);

-- STEG 3: Lägg till grundkategorier
INSERT INTO categories (name, image) VALUES 
('Dam', NULL),
('Herr', NULL),
('Barn', NULL);

-- STEG 4: Lägg till testprodukter med kategori-relationer (din data + category_id)
INSERT INTO products (id, name, price, brand, image, isNew, slug, description, sku, isFavorite, category_id) VALUES 
(1, 'Vit Skjorta', '299', 'Levis', '/images/products/vit-skjorta.png', 1, 'Vit-Skjorta', 'En vit skjorta i glatt material', 'AAA111', 1, 1),
(2, 'Svart Skjorta', '299', 'Levis', '/images/products/svart-skjorta.png', 1, 'Svart-Skjorta', 'Lorem ipsum dolor sit amet', 'BBB111', 0, 1),
(3, 'Grön Skjorta', '299', 'Levis', '/images/products/grön-skjorta.png', 0, 'Gron-Skjorta', 'Lorem ipsum dolor sit amet', 'CCC111', 0, 2),
(4, 'Vit Klänning', '599', 'Levis', '/images/products/vit-klänning.png', 0, 'Vit-Klänning', 'Lorem ipsum dolor sit amet', 'DDD111', 0, 1),
(5, 'Svart Klänning', '599', 'Levis', '/images/products/svart-klänning.png', 0, 'Svart-Klänning', 'Lorem ipsum dolor sit amet', 'EEE111', 0, 1),
(6, 'Svart Kjol', '399', 'Levis', '/images/products/svart-kjol.png', 0, 'Svart-Kjol', 'Lorem ipsum dolor sit amet', 'FFF111', 0, 1),
(7, 'Denim Kjol', '399', 'Levis', '/images/products/denim-kjol.png', 0, 'Denim-Kjol', 'Lorem ipsum dolor sit amet', 'GGG111', 0, 2),
(8, 'Blå Klänning', '599', 'Levis', '/images/products/blå-klänning.png', 0, 'Bla-Klanning', 'Lorem ipsum dolor sit amet', 'HHH111', 0, 3);

-- STEG 5: Visa relationer med JOIN (test query)
SELECT 
  p.name as produkt_namn, 
  p.price, 
  p.sku,
  p.brand,
  p.isNew,
  p.isFavorite,
  c.name as kategori_namn 
FROM products p 
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY c.name, p.name;