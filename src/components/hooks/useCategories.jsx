import { useState, useEffect } from "react";
import axios from "axios";

const useCategories = () => {
  // Her gemmer jeg listen af kategorier fra serveren
  const [categories, setCategories] = useState([]);

  // Viser loading imens data hentes
  const [isLoading, setIsLoading] = useState(true);

  // Gemmer fejl hvis noget går galt
  const [error, setError] = useState(null);

  useEffect(() => {
    // Funktion der henter kategorier fra API
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3042/categories");
        const data = response.data?.data || [];

        // Fjerner dubletter hvis der er flere med samme navn
        const unique = data.filter(
          (cat, index, self) =>
            index === self.findIndex((c) => c.name === cat.name)
        );

        setCategories(unique);
      } catch (err) {
        // Gem fejlbesked hvis noget går galt
        setError(err.message);
      } finally {
        // Uanset hvad - færdig med at loade
        setIsLoading(false);
      }
    };

    fetchCategories(); // Kør når komponent loader
  }, []);

  // Returnér kategorier + loading-status + fejl
  return { categories, isLoading, error };
};

export default useCategories;
