import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarProducts from "../products/SimilarProducts";

const ProductDetails = () => {
  const { slug } = useParams(); // Plockar ut slug från URL
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  

  useEffect(() => {
    setLoading(true);  
    fetch(`http://localhost:8000/products/${slug}`) 
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

useEffect(() => {
  if (product) {
    document.title = product.name;
  }
}, [product]);  

  if (loading) return <p>Laddar produkt...</p>;
  if (error) return <p>Ett fel uppstod: {error}</p>;
  if (!product) return <p>Ingen produkt hittades.</p>;

  return (
    <div className="product-details">
      <div className="product-details-card">
        <div className="product-image">
          {product.image && (
            <img
              src={
                product.image
                  ? product.image.startsWith("http")
                    ? product.image
                    : `http://localhost:8000${product.image}`
                  : ""
              }
              alt={product.name}
            />
          )}
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p>{product.brand}</p>
          <p>{product.description}</p>
          <p>{product.price} SEK</p>

          {/* Lägg i varukorg */}
          <button
            onClick={() => console.log("Lägger i varukorg:", product.name)}
            className="cart-button"
          >
            Lägg i varukorg
          </button>
        </div>
      </div>

      {/* Similar Products Section, barn*/}
      <SimilarProducts currentProductId={product.id} /> {/*Renderar similarproducts kompon och skickar med en prop som heter currentProductId*/}
    </div>
  );
};
export default ProductDetails;
