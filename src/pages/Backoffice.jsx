import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Backoffice = () => {
  // Gemmer email og kodeord fra inputfelterne
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Når man klikker "Login"
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sender login-oplysninger til serveren
      const res = await axios.post("http://localhost:3042/auth/signin", {
        email,
        password,
      });

      // Hvis login er godkendt, gem token og send videre til dashboard
      localStorage.setItem("token", res.data.token);
      navigate("/backoffice/dashboard");
    } catch (error) {
      // Hvis login fejler, vis besked
      alert("Login fejlede - prøv igen");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>

      {/* Login-formular */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Adgangskode"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Backoffice;
