import React from "react";

const FooterSection = ({ title, links }) => {
  return (
    <div className="footer-section">
      <h3>{title}</h3>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
