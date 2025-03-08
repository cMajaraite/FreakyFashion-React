import React from "react";
import Header from "./components/header/Header";
import './assets/global.css';
import Hero from "./components/hero/Hero";
import Spot from "./components/spot/Spot";



function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Spot />
      <main>
        {/* Här kommer resten av sidan */}
      </main>
    </div>
  );
}

export default App;

