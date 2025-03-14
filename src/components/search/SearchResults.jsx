import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../products/ProductCard";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get("q")?.toLowerCase() || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/search?q=${query}`);
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
  }, [query]);

  return (
    <div>
      <h2>Sökresultat för "{query}"</h2>

      {loading && <p>Laddar produkter...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => <ProductCard key={product.id} product={product} />)
        ) : (
          !loading && <p>Inga produkter matchade din sökning.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

