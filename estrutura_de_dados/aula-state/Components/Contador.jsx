import { useState } from "react";
function Contador() {
  // Declaramos uma variável de estado chamada 'contador' com valor inicial 0
  const [contador, setContador] = useState(0);
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador((prevContador) => prevContador + 1)}>
        Incrementar
      </button>
    </div>
  );
}
export default Contador;
