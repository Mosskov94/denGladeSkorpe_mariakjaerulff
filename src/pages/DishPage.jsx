import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Henter id fra URL'en
import axios from "axios";
import { useCart } from "../context/CartContext"; // Tilføjer til kurv
import styles from "./dishPage.module.css";

const DishPage = () => {
  const { id } = useParams(); // Bruger id'et fra URL
  const { addToCart } = useCart(); // Tilføj funktion fra kurv-context

  // Her gemmer jeg retten og hvad der bliver valgt
  const [dish, setDish] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("normal");
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);

  // Når komponenten loader, henter vi retten baseret på id
  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(`http://localhost:3042/dishes?id=${id}`);

        // Hvis vi ikke får noget tilbage
        if (!response.data.data || response.data.data.length === 0) {
          throw new Error("Ret ikke fundet.");
        }

        const fetchedDish = response.data.data[0]; // Vi tager den første ret
        setDish(fetchedDish);
        setExtraIngredients(fetchedDish.availableExtras || []); // Gemmer mulige ekstra
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Uanset hvad, så stopper loading
      }
    };

    fetchDish();
  }, [id]);

  // Tilføjer en ekstra ingrediens
  const handleAddExtra = (event) => {
    const selectedIngredient = event.target.value;
    if (selectedIngredient && !selectedExtras.includes(selectedIngredient)) {
      setSelectedExtras([...selectedExtras, selectedIngredient]);
    }
  };

  // Fjerner en valgt ekstra ingrediens
  const handleRemoveExtra = (ingredient) => {
    setSelectedExtras(selectedExtras.filter((item) => item !== ingredient));
  };

  // Tilføjer retten til kurven
  const handleAddToCart = () => {
    if (!dish || !dish.price) return;

    const basePrice = dish.price[selectedSize] || dish.price.normal;
    const extraPrice = selectedExtras.length * 10;
    const totalPrice = basePrice + extraPrice;

    const cartItem = {
      id: dish._id,
      title: dish.title,
      size: selectedSize,
      extras: selectedExtras,
      price: totalPrice,
    };

    addToCart(cartItem);
    alert(`${dish.title} tilføjet til kurven!`);
  };

  // Håndtering af loading, fejl og manglende ret
  if (isLoading) return <p>Indlæser...</p>;
  if (error) return <p>Fejl: {error}</p>;
  if (!dish) return <p>Ret ikke fundet.</p>;

  return (
    <section className={styles.container}>
      <img
        src={`http://localhost:3042/uploads/${dish.image}`} // Her sætter vi korrekt sti
        alt={dish.title}
        className={styles.dishImage}
      />
      <h1 className={styles.title}>{dish.title}</h1>
      <p className={styles.ingredients}>{dish.ingredients.join(", ")}</p>

      <h2 className={styles.sizeTitle}>Vælg størrelse</h2>
      <select
        className={styles.sizeDropdown}
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
      >
        <option value="normal">Normal ({dish.price.normal},-)</option>
        {dish.price.family && (
          <option value="family">Family ({dish.price.family},-)</option>
        )}
      </select>

      <h2 className={styles.extraTitle}>Tilføj ekstra ingredienser</h2>
      <select className={styles.extraDropdown} onChange={handleAddExtra}>
        <option value="">Vælg en ingrediens</option>
        {extraIngredients.map((ingredient) => (
          <option key={ingredient} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>

      {/* Viser de ekstra ingredienser brugeren har valgt */}
      {selectedExtras.length > 0 && (
        <div className={styles.selectedExtras}>
          <h3>Valgte ekstra ingredienser:</h3>
          <ul>
            {selectedExtras.map((ingredient) => (
              <li key={ingredient}>
                {ingredient}{" "}
                <button
                  className={styles.removeExtra}
                  onClick={() => handleRemoveExtra(ingredient)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 className={styles.price}>Pris</h2>
      <p className={styles.priceValue}>
        {dish.price[selectedSize] + selectedExtras.length * 10},-
      </p>

      <button className={styles.addToCart} onClick={handleAddToCart}>
        Tilføj {dish.title} til kurven
      </button>
    </section>
  );
};

export default DishPage;
