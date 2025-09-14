import React, { useState } from "react";

const accordionData = [
  { title: "Shopping", links: ["Vinterjackor", "Pufferjackor", "Kappa", "Trenchcoats"] },
  { title: "Mina Sidor", links: ["Mina Ordrar", "Mitt Konto"] },
  { title: "Kundtjänst", links: ["Returnpolicy", "Integritetspolicy"] },
];

const FooterAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="footer-accordion">
      <div className="accordion">
        {accordionData.map((section, index) => (
          <div className="accordion-item" key={index}>
            <button className="footer-title" onClick={() => toggleAccordion(index)}>
              {section.title}
            </button>
            <div className="accordion-content" style={{ display: openIndex === index ? "block" : "none" }}>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}>{link}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterAccordion;
