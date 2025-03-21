import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Navigation og footer
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";

// Sider
import Home from "./pages/Home";
import Personale from "./pages/Personale";
import KontaktPage from "./pages/KontaktPage";
import DishPage from "./pages/DishPage";
import CartPage from "./pages/CartPage";


// Kurv-kontext (gør det muligt at gemme ting i kurven)
import { CartProvider } from "./context/CartContext";

// Global styling
import "./App.css";
import Backoffice from "./pages/backoffice/Backoffice";
import BackofficeDashboard from "./pages/backoffice/BackofficeDashboard";

function App() {
  return (
    // Pakker hele appen ind i kurv-provider så vi kan bruge kurven overalt
    <CartProvider>
      <Router>
        <div className="appContainer">
          <Navigation />

          {/* Indholdet af siden skifter her ud fra route */}
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/personale" element={<Personale />} />
              <Route path="/kontakt" element={<KontaktPage />} />
              <Route path="/dish/:id" element={<DishPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/backoffice" element={<Backoffice />} />
              <Route path="/backoffice/dashboard" element={<BackofficeDashboard />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
