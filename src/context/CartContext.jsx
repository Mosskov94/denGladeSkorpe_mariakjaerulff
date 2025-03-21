import React, { createContext, useState, useContext } from "react";

// Opretter kontext
const CartContext = createContext();

// Provider der omslutter appen
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Tilføj til kurv
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Fjern fra kurv
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook til at bruge kurv-kontext
export const useCart = () => useContext(CartContext);
