import React from "react";
import heroImage from "../../assets/images/hero1.jpg"; // Anpassa sökvägen till din bild
import "../../assets/Hero.css";

function Hero({ title, text }) {
  return (
    <section className="hero">
      <div className="hero-image">
        <img id="hero" src={heroImage} alt="Hero" />
      </div>
      <div className="hero-text">
        <h1>{title}</h1>
        <p className="text-hero">{text}</p>
      </div>
    </section>
  );
}


export default Hero;
