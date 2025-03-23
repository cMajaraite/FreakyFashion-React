import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarProducts from "../products/SimilarProducts";

const ProductDetails = () => {
  const { slug } = useParams(); // Get slug from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/products/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Produktdata:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fel vid hämtning:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Laddar produkt...</p>;
  if (error) return <p>Ett fel uppstod: {error}</p>;
  if (!product) return <p>Ingen produkt hittades.</p>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      {product.image && (
        <img 
          src={`http://localhost:5000${product.image}`} 
          alt={product.name} 
          style={{ maxWidth: "100%" }} 
        />
      )}
      <p>{product.description}</p>
      <p>Pris: {product.price} kr</p>
      <p>Varumärke: {product.brand}</p>

      {/* Lägg i varukorg */}
      <button onClick={() => console.log("Lägger i varukorg:", product.name)} className="cart-button">
        Lägg i varukorg
      </button>

      {/* 👇 Här lägger vi in SimilarProducts 👇 */}
      <SimilarProducts currentProductId={product.id} />
    </div>
  );
};

export default ProductDetails;


