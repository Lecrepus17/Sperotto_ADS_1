import "./App.css";
import User from "./components/ComponenteUse";

function App() {
  const tipoUser = "editor";

  return (
    <div>
      <User tipoUser={tipoUser} />
    </div>
  );
}

export default App;
