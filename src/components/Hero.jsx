import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-image">
        <img id="hero" src="images/hero1.jpg" alt="Hero" />
      </div>
      <div className="hero-text">
        <h1>Din modeupplevelse börjar här</h1>
        <p className="text-hero">
          Köp nu och njut av gratis frakt, snabb leverans och säker betalning. Missa inte våra nyheter!
        </p>
      </div>
    </section>
  );
};

export default Hero;
