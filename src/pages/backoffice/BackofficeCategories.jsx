import { Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useFetchDishes, useFetchCategories } from "../../components/hooks/useFetchData";
import { useAlert } from "../../context/alertContext";

const BackofficeCategories = () => {
  const { categories, deleteCategory, refetch } = useFetchCategories();
  const navigate = useNavigate();
  const { showError, showConfirmation } = useAlert();

  const handleAddCategory = () => {
    navigate("/backoffice/categories/add");
  };

  const handleEdit = (categoryId) => {
    navigate(`/backoffice/categories/edit/${categoryId}`);
  };

  const handleConfirmation = (categoryId) => {
    showConfirmation(
      "Du er ved at slette denne kategori",
      "Er du sikker?",
      () => deleteCategory(categoryId),
      () => showError("Sletning annulleret.")
    );
  };

  return (
    <article>
      <h2>Kategorier</h2>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Beskrivelse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category._id} className="backofficeItem">
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td className="buttons">
                <Button
                  buttonText="Slet"
                  background="red"
                  onClick={() => handleConfirmation(category._id)}
                />
                <Button
                  buttonText="Redigér"
                  onClick={() => handleEdit(category._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button
                buttonText="Tilføj kategori"
                background="green"
                onClick={handleAddCategory}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet context={{ refetch }} />
    </article>
  );
};

export default BackofficeCategories;
