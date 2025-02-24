// Estado inicial do contador
const initialState = { count: 0 };
// Função reducer para gerenciar as ações do contador
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 }; // Incrementa o valor
    case "DECREMENT":
      return { count: state.count - 1 }; // Decrementa o valor
    case "RESET":
      return { count: 0 }; // Reseta o valor
    default:
      return state;
  }
}
export { counterReducer, initialState };
