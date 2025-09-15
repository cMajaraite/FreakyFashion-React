import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewProduct.css";

function NewProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);

  // Formfält (utan image-sträng – vi använder File-objekt separat)
  const [form, setForm] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    brand: "",
    category_id: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch((e) => console.error("Kunde inte hämta kategorier:", e));
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onFile = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Bygg FormData (viktigt: sätt INTE Content-Type manuellt)
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("sku", form.sku);
    fd.append("price", form.price);
    fd.append("brand", form.brand);
    if (form.category_id) fd.append("category_id", String(form.category_id));
    if (imageFile) fd.append("image", imageFile); // <-- måste heta "image" (multer)

    const resp = await fetch("/api/admin/products", {
      method: "POST",
      body: fd,
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      alert(err.error || "Kunde inte spara produkten");
      return;
    }

    alert("Produkt sparad");
    navigate("/admin/products");
  };

  document.title = "Administration";

  return (
    <div className="content">
      <h3>Ny produkt</h3>

      {/* encType behövs för filuppladdning */}
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label htmlFor="name">Namn:</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={onChange}
          required
        />

        <label htmlFor="description">Beskrivning:</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={onChange}
          required
        />

        <label htmlFor="image">Bild:</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={onFile}
          // required kan vara valfritt beroende på dina regler
          required
        />
        {preview && (
          <img
            src={preview}
            alt="Förhandsvisning"
            style={{ maxWidth: 200, display: "block", marginBottom: 12 }}
          />
        )}

        <label htmlFor="brand">Märke:</label>
        <input
          id="brand"
          name="brand"
          value={form.brand}
          onChange={onChange}
          required
        />

        <label htmlFor="sku">SKU:</label>
        <input
          id="sku"
          name="sku"
          value={form.sku}
          onChange={onChange}
          required
        />

        <label htmlFor="price">Pris:</label>
        <input
          id="price"
          name="price"
          type="number"
          inputMode="decimal"
          value={form.price}
          onChange={onChange}
          required
        />

        <label htmlFor="category_id">Kategori:</label>
        <select
          id="category_id"
          name="category_id"
          value={form.category_id}
          onChange={onChange}
          required
        >
          <option value="">Välj kategori</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button type="submit" className="save-btn">
          Lägg till
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
