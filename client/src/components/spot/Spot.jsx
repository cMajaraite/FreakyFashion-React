
import React from "react";
import spot1 from "../../assets/images/Spot1.png";
import spot2 from "../../assets/images/spot2.jpg";
import spot3 from "../../assets/images/spot3.jpg";
import "../../assets/Spot.css";

function Spots() {
  return (
    <div className="spots-container">
      <a href="#" className="spot">
        <img src={spot1} alt="Spot1 Woman" />
        <h2>KVINNOR</h2>
      </a>
      <a href="#" className="spot">
        <img src={spot2} alt="Spot2 Men" />
        <h2>MÄN</h2>
      </a>
      <a href="#" className="spot">
        <img src={spot3} alt="Spot3 Kids" />
        <h2>BARN</h2>
      </a>
    </div>
  );
}

export default Spots;
