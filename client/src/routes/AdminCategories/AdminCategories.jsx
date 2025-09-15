import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminCategories.css";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hämta kategorier automatiskt när komponenten laddas
    fetch("/api/admin/categories")
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Kunde inte hämta kategorier:", error);
        setIsLoading(false);
      });
  }, []);

  document.title = "Administration - Kategorier";

  return (
    <>
      <div className="content-header">
        <h3 className="flex-item">Kategorier</h3>
        <div className="button-container">
          <Link to="/admin/categories/new" className="new-category-btn">
            Ny kategori
          </Link>
        </div>
      </div>

      <div className="table-container">
        <table className="categories-table">
          <thead>
            <tr>
              <th>Namn</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="1">Laddar...</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="1">Inga kategorier hittades</td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminCategories;
