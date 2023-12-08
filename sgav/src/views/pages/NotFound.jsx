import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

export default function NotFound() {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column", // Cambiado a "column"
    width: "100vw",
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <h1
        className="text-white"
        style={{ fontSize: "10em", fontWeight: "bolder" }}
      >
        404
      </h1>
      <h2 className="text-3xl">Ups... Parece que te has perdido</h2>
      <section
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <span>Toca el link de abajo para ir a la página principal</span>
        <Button color="secondary" variant="shadow" as={Link} to="/"> 
            Ir al inicio
        </Button>
      </section>
    </div>
     
  );
}
