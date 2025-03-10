import React from "react";

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
          src={product.isFavorite === 1 ? "/svg/filled-heart.svg" : "/svg/hjärta.svg"}
          alt="Heart"
        />
      </span>
    </div>
  );
};

export default ProductCard;
