
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    fetch("/api/admin/products")
      .then((resp) => resp.json()) 
      .then((data) => {
        setProducts(data);         
        setIsLoading(false);       
      })
      .catch((error) => {
        console.error("Kunde inte hämta produkter:", error);
        setIsLoading(false);
      });
  }, []); 
  
  document.title = "Administration";
  
  return (
    <>
      <div className="content-header">
        <h3 className="flex-item">Produkter</h3>
        <div className="button-container">
          <Link to="/admin/products/new" className="new-product-btn">
            Ny produkt
          </Link>
        </div>
      </div>

      {/* Innehåller tabellen med alla produkter */}
      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Namn</th>
              <th>SKU</th>
              <th>Pris</th>
            </tr>
          </thead>
          <tbody>
            
            {isLoading ? (
              <tr>
                <td colSpan="3">Laddar...</td>
              </tr>

            
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="3">Inga produkter hittades</td>
              </tr>

            
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.price} SEK</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Exporterar komponenten så att den kan användas i andra delar av projektet
export default AdminProducts;

