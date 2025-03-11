import React from "react";

const FeatureItem = ({ icon, text }) => {
  return (
    <div className="feature-item">
      <span>
        <img src={icon} alt={text} />
      </span>
      <span className="feature-text">{text}</span>
    </div>
  );
};

export default FeatureItem;
