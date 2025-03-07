import React from "react";
import "./Header.css"; // Importera CSS
import logo from "../../assets/images/FreakyFashionLogo.png";
import searchIcon from "../../assets/svg/search.svg";
import favoritesIcon from "../../assets/svg/favorites.svg";
import basketIcon from "../../assets/svg/varukorg.svg";

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="logo-search">
          <div>
            <a href="/">
              <img id="logo" src={logo} alt="Logo" />
            </a>
          </div>

          <div className="search-icons">
            <div className="search">
              <img src={searchIcon} alt="search-icon" className="search-img" />
              <input className="search-input" placeholder="Sök produkt" />
            </div>

            <div className="icons">
              <div className="favorite">
                <a href="#">
                  <img src={favoritesIcon} alt="favoriter" />
                </a>
              </div>
              <div className="basket">
                <a href="#" className="varukorg-icon">
                  <img src={basketIcon} alt="varukorg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nav">
        <nav>
          <ul>
            <li><a href="#">Nyheter</a></li>
            <li className="kategori"><a href="#">Kategorier</a></li>
            <li><a href="#">Topplistan</a></li>
            <li><a href="#">Rea</a></li>
            <li><a href="#">Kampanjer</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
