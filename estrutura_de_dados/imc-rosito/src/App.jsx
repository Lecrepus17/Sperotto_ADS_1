import { useState } from "react";
import "./App.css";

function App() {
  // Estados para armazenar o peso, altura e IMC
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState(null);

  // Função para calcular o IMC
  const calcularIMC = () => {
    if (peso > 0 && altura > 0) {
      const alturaMetros = altura / 100;
      const imcCalculado = peso / (alturaMetros * alturaMetros);
      setImc(imcCalculado.toFixed(2));
    } else {
      alert("Por favor, insira valores válidos para peso e altura.");
    }
  };

  // Função para classificar o IMC
  const classificarIMC = (imc) => {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc >= 18.5 && imc <= 24.9) return "Peso normal";
    if (imc >= 25 && imc <= 29.9) return "Sobrepeso";
    if (imc >= 30) return "Obesidade";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cálculo do IMC</h1>
      <div>
        <label>
          Peso (kg):
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Ex: 70"
          />
        </label>
      </div>
      <div>
        <label>
          Altura (cm):
          <input
            type="number"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Ex: 170"
          />
        </label>
      </div>
      <button onClick={calcularIMC}>Calcular IMC</button>

      {/* Exibir o resultado do IMC e a classificação */}
      {imc && (
        <div>
          <h2>Seu IMC: {imc}</h2>
          <p>{classificarIMC(imc)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
