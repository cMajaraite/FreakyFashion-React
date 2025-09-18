
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import spot1 from "/src/assets/images/spot1.png";
import spot2 from "/src/assets/images/spot2.jpg";
import spot3 from "/src/assets/images/spot3.jpg";
import "/src/assets/Spot.css";

function Spots() {
  const [spotTexts, setSpotTexts] = useState({
    women: 'KVINNOR',
    men: 'MÄN',
    kids: 'BARN'
  });

  // Fixed spot configuration - only text is dynamic
  const spotConfig = [
    {
      key: 'women',
      image: spot1,
      link: '/category/women',
      alt: 'Spot1 Woman'
    },
    {
      key: 'men',
      image: spot2,
      link: '/category/men',
      alt: 'Spot2 Men'
    },
    {
      key: 'kids',
      image: spot3,
      link: '/category/kids',
      alt: 'Spot3 Kids'
    }
  ];

  useEffect(() => {
    fetchSpotTexts();
  }, []);

  const fetchSpotTexts = async () => {
    try {
      const response = await fetch('/api/spot-texts');
      if (response.ok) {
        const texts = await response.json();
        setSpotTexts(texts);
      }
    } catch (error) {
      console.error('Error fetching spot texts:', error);
      // Keep default texts if API fails
    }
  };

  return (
    <div className="spots-container">
      {spotConfig.map((spot) => (
        <Link key={spot.key} to={spot.link} className="spot">
          <img src={spot.image} alt={spot.alt} />
          <h2>{spotTexts[spot.key] || spot.key.toUpperCase()}</h2>
        </Link>
      ))}
    </div>
  );
}

export default Spots;