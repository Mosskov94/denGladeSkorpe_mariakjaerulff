import React from "react";
import styles from "./hero.module.css";

const Hero = ({ title, subtitle }) => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.textContainer}>
        <p className={styles.smallText}>Den</p>
        <h1 className={styles.bigText}>GLADE</h1>
        <p className={styles.smallText}>Skorpe</p>
      </div>
    </div>
  );
};

export default Hero;
