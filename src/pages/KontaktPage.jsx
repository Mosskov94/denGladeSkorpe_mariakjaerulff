import React from "react";
import Kontakt from "/src/components/kontakt/Kontakt"; // Korrekt sti
import Hero from "../components/hero/Hero";

const KontaktPage = () => {
  console.log("📩 KontaktPage.jsx er loaded!"); // Debug log
  return (
    <div>
      <Hero title="Den" subtitle=" Skorpe"/>
      <Kontakt />
    </div>
  );
};

export default KontaktPage;
