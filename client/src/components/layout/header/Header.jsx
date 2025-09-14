import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/Header.css";
import logo from "../../assets/images/FreakyFashionLogo.png";
import searchIcon from "../../assets/svg/search.svg";
import favoritesIcon from "../../assets/svg/favorites.svg";
import basketIcon from "../../assets/svg/varukorg.svg";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <header>
      <div className="header">
        <div className="logo-search">
          <div>
            <Link to="/">
              <img id="logo" src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="search-icons">
            <form className="search" onSubmit={handleSearch}>
              <img src={searchIcon} alt="search-icon" className="search-img" />
              <input
                className="search-input"
                type="text"
                placeholder="Sök produkt"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>

            <div className="icons">
              <div className="favorite">
                <Link to="/favorites">
                  <img src={favoritesIcon} alt="favoriter" />
                </Link>
              </div>
              <div className="basket">
                <Link to="/cart" className="varukorg-icon">
                  <img src={basketIcon} alt="varukorg" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nav">
        <nav>
          <ul>
            <li>
              <Link to="/nyheter">Nyheter</Link>
            </li>
            <li className="kategori">
              <Link to="/kategorier">Kategorier</Link>
            </li>
            <li>
              <Link to="/topplistan">Topplistan</Link>
            </li>
            <li>
              <Link to="/rea">Rea</Link>
            </li>
            <li>
              <Link to="/kampanjer">Kampanjer</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
