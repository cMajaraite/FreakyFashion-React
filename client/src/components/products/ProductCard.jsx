import React from "react";
import { Link } from "react-router-dom";
import "../../assets/Product.css";

const ProductCard = ({ product }) => {
  // Check if product exists before rendering
  if (!product) return null;

  return (
    <div className="product">
      <Link to={`/products/${product.slug}`}>
        <div className="product-image">
          <img
            src={
              product.image
                ? product.image.startsWith("http")
                  ? product.image
                  : `http://localhost:8000${product.image}`
                : ""
            }
            alt={product.name || "Product"}
          />
          {product.isNew === 1 && <span className="new-badge">Nyhet!</span>}
        </div>
        <div className="product-name">
          <span>{product.name || "Product"}</span>
          <span>{product.price || 0} SEK</span>
        </div>
        <div className="product-brand">{product.brand || ""}</div>
      </Link>
      <span className="full-heart">
        <img
          src={`http://localhost:8000/svg/${
            product.isFavorite === 1 ? "filled-heart.svg" : "hjärta.svg"
          }`}
          alt="Heart"
          className={product.isFavorite === 1 ? "filled-heart" : "empty-heart"}
        />
      </span>
    </div>
  );
};

export default ProductCard;
