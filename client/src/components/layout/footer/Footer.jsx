import React from "react";
import FooterAccordion from "./FooterAccordion";
import FooterSection from "./FooterSection";
import "../../assets/Footer.css";

const Footer = () => {
  return (
    <footer>
      <FooterAccordion />
      <div className="footer">
        <div className="footer-section-container">
          <FooterSection title="Shopping" links={["Vinterjackor", "Pufferjackor", "Kappa", "Trenchcoats"]} />
          <FooterSection title="Mina Sidor" links={["Mina Ordrar", "Mitt Konto"]} />
          <FooterSection title="Kundtjänst" links={["Returnpolicy", "Integritetspolicy"]} />
        </div>
        <div className="footer-bottom">
          <span>© Freaky Fashion</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
