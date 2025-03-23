import { Outlet, Link } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <>
      <header>
        <div className="header-text">
          <h1>Administration</h1>
        </div>
      </header>

      <main>
        <div className="container">
          <aside className="sidebar">
            <h2>Produkter</h2>
          </aside>

          <div className="content-container">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminLayout;
