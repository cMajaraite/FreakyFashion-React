import { Outlet, NavLink } from "react-router-dom";
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
            <nav className="sidebar-nav">
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                Produkter
              </NavLink>
              <NavLink
                to="/admin/categories"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                Kategorier
              </NavLink>
            </nav>
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
