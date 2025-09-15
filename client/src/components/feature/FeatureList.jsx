import React from "react";
import FeatureItem from "./FeatureItem";
import "../../assets/Feature.css";

const features = [
  { icon: "/svg/globe.svg", text: "Gratis frakt och retur" },
  { icon: "/svg/plane.svg", text: "Expressfrakt" },
  { icon: "/svg/shield.svg", text: "Säkra betalningar" },
  { icon: "/svg/smiley.svg", text: "Nyheter varje dag" },
];

const FeatureList = () => {
  return (
    <div className="features-container">
      {features.map((feature, index) => (
        <FeatureItem key={index} icon={feature.icon} text={feature.text} />
      ))}
    </div>
  );
};

export default FeatureList;
