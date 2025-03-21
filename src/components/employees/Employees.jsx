import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./employees.module.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log("🔄 Henter ansatte...");
        const response = await axios.get("http://localhost:3042/employees");
        console.log("✅ API Response:", response.data);

        if (!response.data.data || !Array.isArray(response.data.data)) {
          throw new Error("API svarede ikke med en gyldig liste af ansatte.");
        }

        // **Filtrer dubletter baseret på `name` (så kun én version af hver medarbejder vises)**
        const uniqueEmployees = response.data.data.filter(
          (employee, index, self) =>
            index === self.findIndex((e) => e.name === employee.name)
        );

        console.log("📊 Unikke ansatte:", uniqueEmployees);
        setEmployees(uniqueEmployees);
      } catch (err) {
        console.error("❌ Fejl ved hentning af ansatte:", err);
        setError("Kunne ikke hente ansatte. Prøv igen senere.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Vores medarbejdere</h1>
      <p className={styles.description}>
        Hos Den Glade Skorpe har vi et fantastisk team af dedikerede medarbejdere,
        der brænder for at lave de bedste pizzaer og give vores kunder en uforglemmelig oplevelse!
      </p>

      {/* Indlæsnings- og fejlmeddelelser */}
      {isLoading && <p className={styles.loading}>⏳ Indlæser medarbejdere...</p>}
      {error && <p className={styles.error}>❌ {error}</p>}

      {/* Vis medarbejdere kun hvis data er tilgængelig */}
      {!isLoading && !error && employees.length > 0 && (
        <div className={styles.employeeGrid}>
          {employees.map((employee) => (
            <div key={employee._id} className={styles.employeeCard}>
              <img
                src={employee.image}
                alt={employee.name}
                className={styles.employeeImage}
              />
              <h3 className={styles.employeeName}>{employee.name}</h3>
              <p className={styles.employeeRole}>{employee.position}</p>
            </div>
          ))}
        </div>
      )}

      {/* Hvis ingen ansatte findes */}
      {!isLoading && !error && employees.length === 0 && (
        <p className={styles.noEmployees}>😞 Ingen medarbejdere fundet.</p>
      )}
    </section>
  );
};

export default Employees;
