import React from "react";
import "../../assets/Product.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product">
      <a href={`/products/${product.slug}`}>
        <div className="product-image">
        <img src={`http://localhost:5000${product.image}`} alt={product.name} />
          {product.isNew === 1 && <span className="new-badge">Nyhet!</span>}
        </div>
        <div className="product-name">
          <span>{product.name}</span>
          <span>{product.price} SEK</span>
        </div>
        <div className="product-brand">{product.brand}</div>
      </a>
      <span className="full-heart">
      <img
  src={`http://localhost:5000/svg/${product.isFavorite === 1 ? 'filled-heart.svg' : 'hjärta.svg'}`}
  alt="Heart"
/>
      </span>
    </div>
  );
};

export default ProductCard;
