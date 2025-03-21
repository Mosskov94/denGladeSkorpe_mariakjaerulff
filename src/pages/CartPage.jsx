import React from "react";
import { useCart } from "../context/CartContext"; // Henter kurv-data og funktioner
import styles from "./cartPage.module.css";

const CartPage = () => {
  const { cart, removeFromCart } = useCart(); // Kurvens indhold + mulighed for at fjerne varer

  // Udregner totalpris for alle varer i kurven
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <section className={styles.container}>
      <h1>Din Kurv</h1>

      {/* Hvis kurven er tom */}
      {cart.length === 0 ? (
        <p>
          Kurven er tom.{" "}
          <a href="/">← Tilbage til menu</a>
        </p>
      ) : (
        <div className={styles.cartItems}>
          {/* Gennemgå hver vare i kurven */}
          {cart.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              <h3>{item.title} ({item.size})</h3>
              <p>
                Ekstra:{" "}
                {item.extras.length > 0 ? item.extras.join(", ") : "Ingen"}
              </p>
              <p>Pris: {item.price},-</p>
              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(index)}
              >
                ❌ Fjern
              </button>
            </div>
          ))}

          {/* Samlet pris og betalings-knap */}
          <h2>Total: {totalPrice},-</h2>
          <button className={styles.checkoutButton}>Gå til betaling</button>
        </div>
      )}
    </section>
  );
};

export default CartPage;
