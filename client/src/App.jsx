import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Head from "./components/head/Head";
import Header from "./components/header/Header";
import "./assets/global.css";
import Hero from "./components/hero/Hero";
import Spot from "./components/spot/Spot";
import ProductGrid from "./components/products/Productgrid";
import FeatureList from "./components/feature/FeatureList";
import Footer from "./components/footer/Footer";
import SearchResults from "./components/search/SearchResults";
import ProductDetails from "./components/products/ProductDetails";
import AdminLayout from "./layouts/AdminLayout";
import AdminProducts from "./routes/AdminProducts/AdminProducts";
import NewProduct from "./routes/NewProduct/NewProduct";
import "./App.css";

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
