import React, { useState } from "react";
import { Link } from "react-router-dom"; // Gør det muligt at linke internt i app'en
import styles from "./navigation.module.css";
import { FaBars } from "react-icons/fa"; // Burger-ikon
import { useCart } from "../../context/CartContext"; // Bruger kurv-context
import Logo from "/src/assets/logo.png"; // Logo til venstre
import cartPizza from "/src/assets/basket_icon.png"; // Pizza-ikon som kurv

const Navigation = () => {
  // Henter kurv-data fra context
  const { cart } = useCart();

  // Styrer om burger-menuen er åben (mobilvisning)
  const [menuOpen, setMenuOpen] = useState(false);

  // Holder styr på om brugeren er logget ind (baseret på om der er en token i localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  // Skifter mellem åben/lukket mobilmenu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Når brugeren klikker logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo (klikbart, går til forsiden) */}
      <Link to="/">
        <img src={Logo} alt="Logo" className={styles.logo} />
      </Link>

      {/* Navigationslinks – vises normalt, skjules ved mobilburger */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/personale">Personale</Link></li>
        <li><Link to="/kontakt">Kontakt</Link></li>
        <li><Link to="/cart">Kurv</Link></li>

        {/* Viser Login eller Logout alt efter om man er logget ind */}
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </li>
        ) : (
          <li><Link to="/backoffice">Login</Link></li>
        )}
      </ul>

      {/* Kurv-ikon med tæller */}
      <div className={styles.cartContainer}>
        <Link to="/cart">
          <img src={cartPizza} alt="Kurv" className={styles.cartIcon} />
          {/* Hvis der er varer i kurven, vis antal */}
          {cart.length > 0 && <span className={styles.cartCount}>{cart.length}</span>}
        </Link>
      </div>

      {/* Burger-menu (vises kun på mobil) */}
      <button className={styles.menuButton} onClick={toggleMenu}>
        <FaBars className={styles.menuIcon} />
      </button>
    </nav>
  );
};

export default Navigation;
