import React from "react";
import styles from "./footer.module.css";
import Logo from "/src/assets/logo.png"; // Importér logoet

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {/* Logo i venstre side */}
        <img src={Logo} alt="Logo" className={styles.logo} />

        {/* Kontaktoplysninger */}
        <div className={styles.info}>
          <p>Email: gladskorpe@pizzaglad.dk</p>
          <p>Tlf: 12 34 56 78</p>
          <p>Adresse: Skorpevej 42, 1234 Pizzabyen</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
