import { Link } from "react-router-dom";

const BackofficeNavigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/backoffice/dashboard">Dashboard</Link></li>
        <li><Link to="/backoffice/dishes">Dishes</Link></li>
        <li><Link to="/backoffice/categories">Categories</Link></li>
      </ul>
    </nav>
  );
};

export default BackofficeNavigation;
