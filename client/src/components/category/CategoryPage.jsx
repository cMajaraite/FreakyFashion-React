import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import "../../assets/SearchResults.css";

const CategoryPage = () => {
  const { category } = useParams(); // läser kategori-ID från URL
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        // Först hämta alla kategorier för att hitta ID baserat på namn
        const categoriesResponse = await fetch(`/categories`);
        const categories = await categoriesResponse.json();

        // Hitta kategorin som matchar namnet från URL
        const currentCategory = categories.find(
          (cat) => cat.name.toLowerCase() === category.toLowerCase()
        );

        if (!currentCategory) {
          setError("Kategorin hittades inte");
          setLoading(false);
          return;
        }

        setCategoryName(currentCategory.name);

        // Hämta produkter med kategori-ID
        const response = await fetch(
          `/products/category/${currentCategory.id}`
        );
        if (!response.ok)
          throw new Error("Något gick fel vid hämtningen av produkter");

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
      <h2>
        {categoryName} ({products.length} produkter)
      </h2>

      {loading && <p>Laddar produkter...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="product-grid">
        {products.length > 0
          ? products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : !loading && <p>Inga produkter i denna kategori.</p>}
      </div>
    </div>
  );
};

export default CategoryPage;
