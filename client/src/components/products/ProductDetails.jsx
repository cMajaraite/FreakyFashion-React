import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarProducts from "../products/SimilarProducts";

// const skapar en konstant variabel som innehåller en funktion- productdetails.
// den kan inte byta värde (productdetails), men då det är en funktion kan den användas som komponent.
const ProductDetails = () => {
  const { slug } = useParams(); // Plockar ut slug från URL
  const [product, setProduct] = useState(null); // useState=skapa tillstånd i komponenten för produktinfo. setProduct för att kunna uppdatera värdet senare. Product=värdet.
  const [loading, setLoading] = useState(true); // Skapar state för hålla koll om produkten laddas. Först loading=true, när datan hämtats= false.
  const [error, setError] = useState(null); // Skapar state för felhantering. Om fel, anropas setError= visar felmeddelanden.

  // kod här körs när komponenten laddas eller när "slug" ändras
  useEffect(() => {
    setLoading(true); // Sätter loading-> true och visar "laddar produkt" 
    fetch(`http://localhost:8000/products/${slug}`) // Gör ett GET-anrop till servern (slug)
    // Om ok, konverterar till JSON. Om ej, ger felmeddelande.
    .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      // Loggar produktdata i konsolen. 
      .then((data) => {
        console.log("Produktdata:", data);
        setProduct(data); //Sparar produktdatan i product-tillståndet via setProduct.
        setLoading(false); // Sätter loading till false (så gränssnittet kan visa datan).
      })
      // Fångar fel om det finns några 
      .catch((error) => {
        console.error("Fel vid hämtning:", error);
        setError(error.message); // Sparar felmedd i error
        setLoading(false); // Sätter loading till false igen.
      });
  }, [slug]); // är en dependencies array. Effekten körs när slug ändras — t.ex. om man navigerar till en annan produkt.

// useEffect körs varje gång "product" ändras. När produkten hämtats från API:et → product uppdateras → useEffect körs! useEffect kör saker utanför komp rendering=bieffekter.
useEffect(() => {
  if (product) {
    // När produkten har laddats, uppdateras flikens titel till produktens namn
    document.title = product.name;
  }
}, [product]); // Körs bara när "product" uppdateras. Beroende-array. Kör useEffect-koden endast när product har ändrats.

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

      {/* Similar Products Section */}
      <SimilarProducts currentProductId={product.id} /> {/*Renderar similarproducts kompon och skickar med en prop som heter currentProductId*/}
    </div>
  );
};
export default ProductDetails;
