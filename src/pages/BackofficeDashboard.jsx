import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./BackofficeDashboard.module.css";

const BackofficeDashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [newDish, setNewDish] = useState({
    title: "",
    image: null,
    ingredients: "",
    price: { normal: "", family: "" },
    category: ""
  });

  const navigate = useNavigate();

  // Tjekker login og henter retter ved load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/backoffice");
    } else {
      fetchDishes();
    }
  }, [navigate]);

  // Henter alle retter
  const fetchDishes = () => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3042/dishes", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setDishes(res.data.data || []);
      })
      .catch((err) => {
        console.error("Fejl ved hentning af retter:", err);
        localStorage.removeItem("token");
        navigate("/backoffice");
      });
  };

  // Returnerer korrekt billede-URL
  const getImageUrl = (image) => {
    if (!image) return ""; // Vis intet hvis tom
    if (image.startsWith("http")) return image;
    return `http://localhost:3042/uploads/${image}`;
  };

  const handleDelete = (_id) => {
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:3042/dish/${_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(fetchDishes)
      .catch((err) => console.error("Fejl ved sletning:", err));
  };

  const handleUpdate = (dish) => {
    setSelectedDish({ ...dish, ingredients: dish.ingredients.join(", ") });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedDish((prev) => ({
      ...prev,
      [name]: name.includes("price")
        ? { ...prev.price, [name.split(".")[1]]: value }
        : value,
    }));
  };

  const handleUpdateSubmit = () => {
    const token = localStorage.getItem("token");
    const updatedDish = {
      ...selectedDish,
      ingredients: selectedDish.ingredients.split(","),
    };
    axios.put("http://localhost:3042/dish", { ...updatedDish, id: selectedDish._id }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setSelectedDish(null);
        fetchDishes();
      })
      .catch((err) => console.error("Fejl ved opdatering:", err));
  };

  const handleNewDishChange = (e) => {
    const { name, value } = e.target;
    setNewDish((prev) => ({
      ...prev,
      [name]: name.includes("price")
        ? { ...prev.price, [name.split(".")[1]]: value }
        : value,
    }));
  };

  const handleImageUpload = (e) => {
    setNewDish((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddDish = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", newDish.title);
    formData.append("category", newDish.category);
    formData.append("ingredients", newDish.ingredients);
    formData.append("price", JSON.stringify(newDish.price));
    if (newDish.image) {
      formData.append("file", newDish.image);
    }
    axios.post("http://localhost:3042/dish", formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setNewDish({ title: "", image: null, ingredients: "", price: { normal: "", family: "" }, category: "" });
        fetchDishes();
      })
      .catch((err) => console.error("Fejl ved oprettelse:", err));
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>Backoffice</h2>
      <a href="/">Tilbage til forsiden</a>

      <h3>Dishes</h3>
      <table className={styles.dishTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Ingredients</th>
            <th>Price</th>
            <th>Price (family)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish._id}>
              <td>{dish.title}</td>
              <td>
                {dish.image && (
                  <img
                    src={getImageUrl(dish.image)}
                    alt={dish.title}
                    className={styles.dishImage}
                  />
                )}
              </td>
              <td>{dish.ingredients?.join(", ")}</td>
              <td>{dish.price?.normal} kr</td>
              <td>{dish.price?.family || "-"} kr</td>
              <td>{dish.category || "-"}</td>
              <td>
                <button className={styles.updateBtn} onClick={() => handleUpdate(dish)}>Update</button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(dish._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.addDishForm}>
        <h3>Tilføj ny ret</h3>
        <input type="text" name="title" value={newDish.title} onChange={handleNewDishChange} placeholder="Titel" />
        <input type="file" name="image" onChange={handleImageUpload} />
        <input type="text" name="ingredients" value={newDish.ingredients} onChange={handleNewDishChange} placeholder="Ingredienser" />
        <input type="text" name="price.normal" value={newDish.price.normal} onChange={handleNewDishChange} placeholder="Pris (normal)" />
        <input type="text" name="price.family" value={newDish.price.family} onChange={handleNewDishChange} placeholder="Pris (family)" />
        <input type="text" name="category" value={newDish.category} onChange={handleNewDishChange} placeholder="Kategori" />
        <button onClick={handleAddDish}>Opret</button>
      </div>
    </div>
  );
};

export default BackofficeDashboard;
