import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./components/category/CategoryPage";
import Head from "./components/head/Head";
import Layout from "./components/layout/Layout";
import "./assets/global.css";
import Hero from "./components/section/hero/Hero";
import Spot from "./components/section/spot/Spot";
import ProductGrid from "./components/products/Productgrid";
import FeatureList from "./components/layout/feature/FeatureList";
import SearchResults from "./components/search/SearchResults";
import ProductDetails from "./components/products/ProductDetails";
import AdminLayout from "./layouts/AdminLayout";
import AdminProducts from "./routes/AdminProducts/AdminProducts";
import NewProduct from "./routes/NewProduct/NewProduct";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Head title="Freaky Fashion" />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <main>
                  <Hero
                    title="Utforska de senaste trenderna"
                    text="Handla idag och få exklusiva erbjudanden!"
                  />
                  <Spot />
                  <ProductGrid />
                  <FeatureList />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/kategori/:category"
            element={
              <>
                <Header />
                <main>
                  <CategoryPage />
                  <FeatureList />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <Header />
                <main>
                  <SearchResults />
                  <FeatureList />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/products/:slug"
            element={
              <>
                <Header />
                <main>
                  <ProductDetails />
                  <FeatureList />
                </main>
                <Footer />
              </>
            }
          />

          {/* Admin-sidor*/}

          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<NewProduct />} />
            <Route index element={<AdminProducts />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
