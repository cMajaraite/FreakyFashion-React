// src/routes/AdminProducts/AdminProducts.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((resp) => resp.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Kunde inte hämta produkter:", error));
  }, []);

  return (
    <div>
      <h2>Produkter</h2>
      <div className="header-actions">
        <Link to="/admin/products/new" className="new-product-btn">
          Ny produkt
        </Link>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Namn</th>
            <th>SKU</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3">Inga produkter hittades</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Link to={`/admin/products/${product.id}`}>
                    {product.name}
                  </Link>
                </td>
                <td>{product.sku}</td>
                <td>{product.price} SEK</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
