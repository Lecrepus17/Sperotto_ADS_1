import { useState } from "react";

function IMC() {
  const [imc, setIMC] = useState({
    peso: 0,
    altura: 0,
    imc: 0,
  });

  const calcularIMC = () => {
    setIMC((prevIMC) => ({
      ...prevIMC,
      imc: prevIMC.peso / ((prevIMC.altura / 100) * (prevIMC.altura / 100)),
    }));
  };

  return (
    <div>
      <h1>Cálculo do IMC</h1>
      <p>
        Peso (Kg):{" "}
        <input
          type="number"
          value={imc.peso}
          onChange={(e) => setIMC({ ...imc, peso: parseFloat(e.target.value) })}
        />
      </p>
      <p>
        Altura (m):{" "}
        <input
          type="number"
          value={imc.altura}
          onChange={(e) =>
            setIMC({ ...imc, altura: parseFloat(e.target.value) })
          }
        />
      </p>
      <button onClick={calcularIMC}>Calcular IMC</button>
      <h1>Seu IMC é: {imc.imc.toFixed(2)}</h1>
      <p>
        {imc.imc.toFixed(2) <= 18.5
          ? "Abaixo do peso"
          : imc.imc.toFixed(2) <= 24.9
          ? "Peso normal"
          : imc.imc.toFixed(2) <= 29.9
          ? "Sobrepeso"
          : "Obesidade"}
      </p>
    </div>
  );
}
export default IMC;
