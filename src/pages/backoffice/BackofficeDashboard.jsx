import { useNavigate } from "react-router-dom";
import { useFetchDishes, useFetchCategories } from "../../components/hooks/useFetchData";
import styles from "./backofficeDashboard.module.css";

const BackofficeDashboard = () => {
  const { dishes, isLoading: loadingDishes, error: errorDishes } = useFetchDishes();
  const { categories, isLoading: loadingCategories, error: errorCategories } = useFetchCategories();
  const navigate = useNavigate();

  return (
    <article className={styles.dashboardContainer}>
      <h2>Dashboard</h2>

      {/* Håndtering af loading og fejl */}
      {loadingDishes || loadingCategories ? <p>Indlæser data...</p> : null}
      {errorDishes ? <p>Fejl ved hentning af retter: {errorDishes}</p> : null}
      {errorCategories ? <p>Fejl ved hentning af kategorier: {errorCategories}</p> : null}

      <section className={styles.dashboardCards}>
        <div className={styles.dashboardCard} onClick={() => navigate("/backoffice/dishes")}>
          <h3>Retter</h3>
          <p>{dishes?.length || 0} retter</p>
        </div>

        <div className={styles.dashboardCard} onClick={() => navigate("/backoffice/categories")}>
          <h3>Kategorier</h3>
          <p>{categories?.length || 0} kategorier</p>
        </div>
      </section>
    </article>
  );
};

export default BackofficeDashboard;
