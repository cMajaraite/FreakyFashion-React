// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Head from "./components/head/Head";
import Layout from "./components/layout/Layout";

// Pages
import HomePage from "./components/pages/HomePage";
import CategoryPage from "./components/pages/CategoryPage";
import ProductPage from "./components/pages/ProductPage";
import SearchPage from "./components/pages/SearchPage";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import AdminProducts from "./routes/AdminProducts/AdminProducts";
import NewProduct from "./routes/NewProduct/NewProduct";

// Global CSS
import "./assets/global.css";
import "./App.css";
import AdminCategories from "./routes/AdminCategories/AdminCategories";
import NewCategory from "./routes/NewCategory/NewCategory";

function App() {
  return (
    <BrowserRouter>
      <Head title="Freaky Fashion" />

      <Routes>
        {/* Vanliga användarsidor - wrapped in Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="categories/:category" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="products/:slug" element={<ProductPage />} />
        </Route>

        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<NewProduct />} />
          <Route index element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/new" element={<NewCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
