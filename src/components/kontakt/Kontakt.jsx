import React, { useState } from "react";
import axios from "axios";
import styles from "./kontakt.module.css";

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Håndter ændringer i inputfelterne
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Valider inputfelterne
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Navn er påkrævet";
    if (!formData.email.trim()) {
      newErrors.email = "Email er påkrævet";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Indtast en gyldig emailadresse";
    }
    if (!formData.subject.trim()) newErrors.subject = "Emne er påkrævet";
    if (!formData.message.trim()) newErrors.message = "Besked er påkrævet";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Håndter formularindsendelse
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:3042/contact", formData);
      console.log("✅ Besked sendt:", response.data);
      setSuccessMessage("Din besked er blevet sendt!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("❌ Fejl ved afsendelse:", error);
      setSuccessMessage("Der opstod en fejl. Prøv igen.");
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Har du spørgsmål eller ønsker du at bestille din favoritpizza?</h1>
      <p className={styles.description}>
        Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi glæder os til at høre fra dig!
      </p>

      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Navn */}
        <label className={styles.label}>Navn</label>
        <input
          type="text"
          name="name"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        {/* Email */}
        <label className={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        {/* Emne */}
        <label className={styles.label}>Emne</label>
        <input
          type="text"
          name="subject"
          className={styles.input}
          value={formData.subject}
          onChange={handleChange}
        />
        {errors.subject && <p className={styles.error}>{errors.subject}</p>}

        {/* Beskrivelse */}
        <label className={styles.label}>Beskrivelse</label>
        <textarea
          name="message"
          className={styles.textarea}
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && <p className={styles.error}>{errors.message}</p>}

        {/* Send-knap */}
        <button type="submit" className={styles.button}>Send</button>
      </form>
    </section>
  );
};

export default Kontakt;
