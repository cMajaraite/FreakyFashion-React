CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL,
      price TEXT NOT NULL,
      brand TEXT NOT NULL,
      image TEXT,
      isNew INTEGER DEFAULT 0,
      slug TEXT,
      description TEXT,
      sku TEXT NOT NULL,
      isFavorite INTEGER DEFAULT 0
      
);


INSERT INTO products (id, name, price, brand, image, isNew, slug, description, sku, isFavorite) 
VALUES 
(1, 'Vit Skjorta', '299', 'Levis', '/images/vit-skjorta.png', 1, 'Vit-Skjorta', 'En vit skjorta i glatt material', 'AAA111', 1),
(2, 'Svart Skjorta', '299', 'Levis', '/images/svart-skjorta.png', 1, 'Svart-Skjorta', 'Lorem ipsum dolor sit amet', 'BBB111', 0),
(3, 'Grön Skjorta', '299', 'Levis', '/images/grön-skjorta.png', 0, 'Gron-Skjorta', 'Lorem ipsum dolor sit amet', 'CCC111', 0),
(4, 'Vit Klänning', '599', 'Levis', '/images/vit-klänning.png', 0, 'Vit-Klänning', 'Lorem ipsum dolor sit amet', 'DDD111', 0),
(5, 'Svart Klänning', '599', 'Levis', '/images/svart-klänning.png', 0, 'Svart-Klänning', 'Lorem ipsum dolor sit amet', 'EEE111', 0),
(6, 'Svart Kjol', '399', 'Levis', '/images/svart-kjol.png', 0, 'Svart-Kjol', 'Lorem ipsum dolor sit amet', 'FFF111', 0),
(7, 'Denim Kjol', '399', 'Levis', '/images/denim-kjol.png', 0, 'Denim-Kjol', 'Lorem ipsum dolor sit amet', 'GGG111', 0),
(8, 'Blå Klänning', '599', 'Levis', '/images/blå-klänning.png', 0, 'Bla-Klanning', 'Lorem ipsum dolor sit amet', 'HHH111', 0)

