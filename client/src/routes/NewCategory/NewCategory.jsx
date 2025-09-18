import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewCategory.css";

function NewCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", name);
    if (file) fd.append("image", file);

    const resp = await fetch("/api/admin/categories", {
      method: "POST",
      body: fd, // viktigt: sätt INTE Content-Type själv
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      alert(err.error || "Kunde inte spara kategorin");
      return;
    }

    alert("Kategori sparad");
    navigate("/admin/categories");
  };

  document.title = "Administration - Ny kategori";

  return (
    <div className="content">
      <h3>Ny kategori</h3>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name">Namn:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ange namn"
          maxLength="25"
          required
        />

        <label htmlFor="image">Bild:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={onFileChange}
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Förhandsvisning"
            style={{ maxWidth: 200, display: "block", marginBottom: 12 }}
          />
        )}

        <button type="submit" className="save-btn">
          Lägg till
        </button>
      </form>
    </div>
  );
}

export default NewCategory;
