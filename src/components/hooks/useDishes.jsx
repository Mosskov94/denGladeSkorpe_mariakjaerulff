import { useState, useEffect } from "react";
import axios from "axios";

const useDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:3042/dishes");
        const fetchedDishes = response.data?.data || [];

        // Debug: Se om billederne kommer korrekt fra backend
        console.log("🔍 Henter retter:", fetchedDishes);

        setDishes(fetchedDishes);
      } catch (err) {
        console.error("Fejl ved hentning af retter:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishes();
  }, []);

  return { dishes, isLoading, error };
};

export default useDishes;
