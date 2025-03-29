import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import "./NewProduct.css";

function NewProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    brand: "",
    image: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        if (resp.ok) {
          alert("Produkt sparad");
          navigate("/admin/products");
        }
      })
      .catch((error) => {
        console.error("Fel vid sparande:", error);
        alert("Kunde inte spara produkten");
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  document.title = "Administration";
  return (
    <>
      <div className="content">
        <h3>Ny produkt</h3>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Namn:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="description">Beskrivning:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>

          <label htmlFor="image">Bild:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="brand">Märke:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="sku">SKU:</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="price">Pris:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="save-btn">
            Lägg till
          </button>
        </form>
      </div>
    </>
  );
}

export default NewProduct;
