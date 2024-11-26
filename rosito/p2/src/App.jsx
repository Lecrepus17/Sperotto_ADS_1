import { Outlet, Link } from "react-router-dom";
function App() {
  return (
    <div>
      <header>
        <h1>E-Commerce.</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2024 Minha Loja. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
export default App;
