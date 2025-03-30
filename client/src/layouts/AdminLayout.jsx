import { Outlet, Link } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-text">
          <h1>Administration</h1>
        </div>
      </div>

      <div className="admin-main">
        <div className="container">
          <aside className="sidebar">
            <h2>Produkter</h2>
          </aside>

          <div className="content-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
