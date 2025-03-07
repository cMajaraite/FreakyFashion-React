import React from "react";
import heroImage from "../../assets/images/hero1.jpg"; // Anpassa sökvägen till din bild
import "../../assets/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-image">
        <img id="hero" src={heroImage} alt="Hero" />
      </div>
      <div className="hero-text">
        <h1>Din modeupplevelse börjar här</h1>
        <p className="text-hero">
          Köp nu och njut av gratis frakt, snabb leverans och säker betalning. Missa inte våra nyheter!
        </p>
      </div>
    </section>
  );
}

export default Hero;
