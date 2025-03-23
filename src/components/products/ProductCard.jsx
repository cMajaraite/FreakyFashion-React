import React from "react";
import "../../assets/Product.css";

const ProductCard = ({ product }) => {
  // Check if product exists before rendering
  if (!product) return null;

  return (
    <div className="product">
      <a href={`/products/${product.slug}`}>
        <div className="product-image">
          {/* Add more defensive checks */}
          <img 
            src={product.image ? `http://localhost:5000${product.image}` : ''} 
            alt={product.name || 'Product'} 
          />
          {product.isNew === 1 && <span className="new-badge">Nyhet!</span>}
        </div>
        <div className="product-name">
          <span>{product.name || 'Product'}</span>
          <span>{product.price || 0} SEK</span>
        </div>
        <div className="product-brand">{product.brand || ''}</div>
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
