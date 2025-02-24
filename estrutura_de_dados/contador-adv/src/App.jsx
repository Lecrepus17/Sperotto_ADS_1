import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter";

function App() {
  return (
    <>
      <h1>Exemplo de Contador com useReducer</h1>
      <Counter />
    </>
  );
}

export default App;
