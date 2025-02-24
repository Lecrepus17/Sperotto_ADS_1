import { Link, useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const handleLogout = async (id) => {
    alert("Deslogado Com sucesso.");
    window.location.reload();
  };

  return (
    <div>
      <h1>
        Bem-vindo à Admin Store! Gerencie seus produtos de maneira fácil e
        prática.
      </h1>
      <p>Bem-vindo à nossa loja online!</p>
      <Link to={`/products/`} className="product-link">
        Ir para a Lista de produtos!
      </Link>
      <br />
      <br />
      <button onClick={() => handleLogout()} className="delete-button">
        Checkout
      </button>
    </div>
  );
}
export default Home;
