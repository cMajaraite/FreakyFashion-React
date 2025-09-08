import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import "../../assets/SearchResults.css"; // kan återanvändas

const CategoryPage = () => {
  const { category } = useParams(); // läser t.ex. "dam" från /kategori/dam
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/products/category/${category}`);
        if (!response.ok) throw new Error("Något gick fel vid hämtningen av produkter");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <h2>{category.toUpperCase()} ({products.length} produkter)</h2>

      {loading && <p>Laddar produkter...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          !loading && <p>Inga produkter i denna kategori.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
