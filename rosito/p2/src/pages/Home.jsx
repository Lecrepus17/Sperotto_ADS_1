import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    // Faz algo (por exemplo, autenticação ou validação)
    navigate("/products"); // Redireciona para a página "Sobre Nós"
  };
  return (
    <div>
      <h1>
        Bem-vindo à Admin Store! Gerencie seus produtos de maneira fácil e
        prática.
      </h1>
      <p>Bem-vindo à nossa loja online!</p>
      <button onClick={handleClick} className="product-link">Ir para a Lista de produtos!</button>
    </div>
  );
}
export default Home;
