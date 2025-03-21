import { Outlet } from "react-router-dom";
import BackofficeNavigation from "./BackofficeNavigation";



const Backoffice = () => {
  return (
    <article className="backoffice">
      <h1>Backoffice</h1>
        <BackofficeNavigation />
      <div className="backofficeContent">
        <Outlet />
      </div>
    </article>
  );
};

export default Backoffice;
