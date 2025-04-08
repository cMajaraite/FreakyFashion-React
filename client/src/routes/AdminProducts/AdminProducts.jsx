// Importerar React-hooks: useEffect (för bieffekter, t.ex. hämta data) och useState (för att skapa state/variabler)
import { useEffect, useState } from "react";

// Importerar Link-komponenten från React Router för att navigera mellan sidor utan att ladda om sidan
import { Link } from "react-router-dom";

// Importerar CSS-specifik stil för denna komponent
import "./AdminProducts.css";

// Funktionell komponent som visar en lista över produkter i adminvyn
function AdminProducts() {
  // Skapar ett state som håller en lista med produkter (börjar tom)
  const [products, setProducts] = useState([]);

  // Skapar ett state som visar om produkterna fortfarande laddas (true tills datan hämtats)
  const [isLoading, setIsLoading] = useState(true);

  // useEffect körs en gång när komponenten mountas (eftersom dependency-arrayen är tom: [])
  useEffect(() => {
    // Hämtar produktdata från backend-API:et
    fetch("/api/admin/products")
      .then((resp) => resp.json()) // Konverterar svaret till JSON
      .then((data) => {
        setProducts(data);         // Sparar den hämtade produktlistan i state
        setIsLoading(false);       // Sätter loading till false så att datan kan visas
      })
      .catch((error) => {
        // Om ett fel uppstår vid hämtning, loggas det och loading sätts ändå till false
        console.error("Kunde inte hämta produkter:", error);
        setIsLoading(false);
      });
  }, []); // Tom array = körs endast vid första rendern (mount)

  // Uppdaterar flikens titel i webbläsaren
  document.title = "Administration";

  // Returnerar JSX som beskriver vad som visas i användargränssnittet
  return (
    <>
      {/* Översta rubrik- och knappsektionen */}
      <div className="content-header">
        <h3 className="flex-item">Produkter</h3>
        <div className="button-container">
          {/* Navigeringslänk till en sida för att lägga till en ny produkt */}
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
            {/* Om produkterna fortfarande laddas visas en rad med "Laddar..." */}
            {isLoading ? (
              <tr>
                <td colSpan="3">Laddar...</td>
              </tr>

            // Om ingen produkt hittats visas ett meddelande om det
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="3">Inga produkter hittades</td>
              </tr>

            // Annars loopar vi igenom produkterna och visar varje i en tabellrad
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

