import { Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useFetchDishes, useFetchCategories } from "../../components/hooks/useFetchData";

import { useAlert } from "../../context/alertContext";

const BackofficeDishes = () => {
  const { dishes, deleteDish, refetch } = useFetchDishes();
  const navigate = useNavigate();
  const { showError, showConfirmation } = useAlert();

  const handleAddDish = () => {
    navigate("/backoffice/dishes/add");
  };

  const handleEdit = (dishId) => {
    navigate(`/backoffice/dishes/edit/${dishId}`);
  };

  const handleConfirmation = (dishId) => {
    showConfirmation(
      "Du er ved at slette denne ret",
      "Er du sikker?",
      () => deleteDish(dishId),
      () => showError("Sletning annulleret.")
    );
  };

  return (
    <article>
      <h2>Retter</h2>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Beskrivelse</th>
            <th>Kategori</th>
            <th>Billede</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes?.map((dish) => (
            <tr key={dish._id} className="backofficeItem">
              <td>{dish.title}</td>
              <td>{`${dish.description.slice(0, 20)}...`}</td>
              <td>{dish.category}</td>
              <td>
                <img src={dish.image} alt={dish.title} width="50" />
              </td>
              <td className="buttons">
                <Button
                  buttonText="Slet"
                  background="red"
                  onClick={() => handleConfirmation(dish._id)}
                />
                <Button
                  buttonText="Redigér"
                  onClick={() => handleEdit(dish._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button
                buttonText="Tilføj ret"
                background="green"
                onClick={handleAddDish}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet context={{ refetch }} />
    </article>
  );
};

export default BackofficeDishes;
