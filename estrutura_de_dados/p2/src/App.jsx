import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <h1>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            E-Commerce.
          </Link>
        </h1>
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
