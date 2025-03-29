import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/ProductDetails.css";

const SimilarProducts = ({ currentProductId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentProductId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8000/products/similar?id=${currentProductId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch similar products");
        }
        return res.json();
      })

      .then((data) => {
        console.log("Similar products:", data);
        setSimilarProducts(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching similar products:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [currentProductId]);

  if (loading) return <p>Laddar liknande produkter...</p>;
  if (error) return <p>Kunde inte ladda liknande produkter: {error}</p>;
  if (!similarProducts || similarProducts.length === 0) return null;

  return (
    <div className="similar-products">
      <h2>Liknande produkter</h2>
      <div className="similar-products-container">
        {similarProducts.map((product) => (
          <Link
            to={`/products/${product.slug}`}
            key={product.id}
            className="similar-product-card"
          >
            {product.image && (
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.name}
              />
            )}
            <h3>{product.name}</h3>
            <p>{product.price} kr</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
