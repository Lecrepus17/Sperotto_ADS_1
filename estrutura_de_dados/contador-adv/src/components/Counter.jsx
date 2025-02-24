import { useReducer } from "react";
import { counterReducer, initialState } from "../reducers/counterReducer";
function Counter() {
  // Inicializa o useReducer com o reducer e o estado inicial
  const [state, dispatch] = useReducer(counterReducer, initialState);
  return (
    <div>
      <h2>Contador: {state.count}</h2>
      {/* Botões para incrementar, decrementar e resetar */}
      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        Incrementar
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        Decrementar
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>Resetar</button>
    </div>
  );
}
export default Counter;
