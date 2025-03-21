import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchCategories, useFetchDishes } from "../../components/hooks/useFetchData";

import styles from "./categoriesSection.module.css";

const CategoriesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories, isLoading: loadingCats, error: errorCats } = useFetchCategories();
  const { dishes, isLoading: loadingDishes, error: errorDishes } = useFetchDishes();

  // Funktion til at konstruere korrekt billede-URL
  const getImageUrl = (image) => {
    if (!image) return ""; // Hvis der ikke er noget billede, vis intet
    return image.startsWith("http") ? image : `http://localhost:3042/uploads/${image}`;
  };

  // Filtrér retter baseret på valgt kategori
  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.category === selectedCategory)
    : dishes.slice(0, 6); // Vis 6 tilfældige retter hvis ingen kategori er valgt

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Vælg kategori</h1>

      {/* Indlæsnings- og fejlmeddelelser for kategorier */}
      {loadingCats && <p>Indlæser kategorier...</p>}
      {errorCats && <p className={styles.error}>Fejl: {errorCats}</p>}

      {/* Kategori kort */}
      <div className={styles.categoriesWrapper}>
        {categories?.map((category) => (
          <div
            key={category._id}
            className={`${styles.categoryCard} ${selectedCategory === category.name ? styles.active : ""}`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <img
              src={getImageUrl(category.image)}
              alt={category.name}
              className={styles.categoryImage}
            />
            <p className={styles.categoryText}>{category.name}</p>
          </div>
        ))}
      </div>

      {/* Indlæsnings- og fejlmeddelelser for retter */}
      <div className={styles.itemsWrapper}>
        {loadingDishes && <p>Indlæser retter...</p>}
        {errorDishes && <p className={styles.error}>Fejl: {errorDishes}</p>}

        {/* Viste retter */}
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <Link to={`/dish/${dish._id}`} key={dish._id} className={styles.itemCard}>
              <img
                src={getImageUrl(dish.image)}
                alt={dish.title}
                className={styles.itemImage}
              />
              <p className={styles.itemText}>{dish.title}</p>
            </Link>
          ))
        ) : (
          <p className={styles.noItems}>Ingen retter fundet.</p>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
