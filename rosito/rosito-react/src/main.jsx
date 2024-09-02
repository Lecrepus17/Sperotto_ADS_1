import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PrimeiroComponente from "./Components/PrimeiroComponente";
import SegundoComponente from "./Components/SegundoComponente";
import { CompA, CompB as Rosito } from "./Components/DoisComponentes";
import MultiElementos from './Components/MultiElementos';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeiroComponente valor="Bom dia" valor2={Math.random()} />
    <SegundoComponente>Seja bem vindo!!!</SegundoComponente>
    <div>
      <CompA valor="Olá, eu sou A!" />
      <Rosito valor="B está na área!" />
    </div>
      <MultiElementos />
  </StrictMode>
);
