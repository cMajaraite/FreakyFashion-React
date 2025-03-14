import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Head from "./components/head/Head";
import Header from "./components/header/Header";
import './assets/global.css';
import Hero from "./components/hero/Hero";
import Spot from "./components/spot/Spot";
import ProductGrid from "./components/products/Productgrid";
import FeatureList from "./components/feature/FeatureList";
import Footer from "./components/footer/Footer";
import SearchResults from "./components/search/SearchResults"; // Lägg till sökresultatsidan

function App() {
  return (
    <Router>
      <div className="App">
        <Head title="Freaky Fashion" />
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Spot />
              <ProductGrid />
              <FeatureList />
            </>
          } />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


