import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Contador from "../Components/Contador";
import PessoasFiltradas from "../Components/Pessoa";
import IMC from "../Components/IMC";

function App() {
  return (
    <>
      {/* <Contador /> */}
      {/* <PessoasFiltradas /> */}
      {/* <PerfilUsuario /> */}
      {/* <ListaTarefa /> */}
      <IMC />
    </>
  );
}

export default App;
