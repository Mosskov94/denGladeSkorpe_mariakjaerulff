import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCategories from "../../components/hooks/useCategories";
import useDishes from "../../components/hooks/useDishes";
import styles from "./categoriesSection.module.css";

const CategoriesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories, isLoading: loadingCats, error: errorCats } = useCategories();
  const { dishes, isLoading: loadingDishes, error: errorDishes } = useDishes();

  // Funktion til at lave korrekt billede-URL
  const getImageUrl = (image) => {
    if (!image) return ""; // Hvis der ikke er noget billede, vises intet
    return image.startsWith("http") ? image : `http://localhost:3042/uploads/${image}`;
  };

  // Filtrer retter baseret på valgte kategori
  const filteredDishes = selectedCategory
    ? dishes.filter((dish, index, self) =>
        dish.category === selectedCategory &&
        index === self.findIndex((d) => d.title === dish.title)
      )
    : dishes.sort(() => 0.5 - Math.random()).slice(0, 6); // Vis 6 tilfældige retter hvis ingen kategori er valgt

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Vælg kategori</h1>

      {/* Indlæsnings- og fejlmeddelelser for kategorier */}
      {loadingCats && <p>Indlæser kategorier...</p>}
      {errorCats && <p>Fejl: {errorCats}</p>}

      {/* Viser kategorier */}
      <div className={styles.categoriesWrapper}>
        {categories.map((category) => (
          <div
            key={category._id}
            className={`${styles.categoryCard} ${selectedCategory === category.name ? styles.active : ""}`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <img 
              src={getImageUrl(category.image)} 
              alt={category.name} 
              className={styles.categoryImage}
              crossOrigin="anonymous" // 💡 Undgår CORB-fejl
            />
            <p className={styles.categoryText}>{category.name}</p>
          </div>
        ))}
      </div>

      {/* Indlæsnings- og fejlmeddelelser for retter */}
      <div className={styles.itemsWrapper}>
        {loadingDishes && <p>Indlæser retter...</p>}
        {errorDishes && <p>Fejl: {errorDishes}</p>}

        {/* Vis retter eller meddelelse hvis ingen findes */}
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <Link to={`/dish/${dish._id}`} key={dish._id} className={styles.itemCard}>
              <img
                src={getImageUrl(dish.image)}
                alt={dish.title}
                className={styles.itemImage}
                crossOrigin="anonymous" // 💡 Undgår CORB-fejl
              />
              <p className={styles.itemText}>{dish.title}</p>
            </Link>
          ))
        ) : (
          <p>Ingen retter fundet.</p>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
