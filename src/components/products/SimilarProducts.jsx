import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    fetch(`http://localhost:5000/products/similar?id=${currentProductId}`)
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
    <section className="similar-products">
      <h2 className="similar-title">Liknande produkter</h2>
      <div className="similar-product-container">
        {similarProducts.map((similar) => (
          <div key={similar.id} className="product-item">
            <Link to={`/products/${similar.slug}`} className="prod">
              {similar.image && (
                <img 
                  src={`http://localhost:5000${similar.image}`} 
                  alt={similar.name || 'Product'} 
                />
              )}
            </Link>
            
            <div className="product-information">
              <p className="prod-name">{similar.name || 'Product'}</p>
              <p className="prod-price">{similar.price || 0} SEK</p>
            </div>
            <p className="brand">{similar.brand || ''}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
