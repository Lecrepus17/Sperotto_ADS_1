import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [productList, setProductList] = useState([]); // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [error, setError] = useState(null); // Estado para erros

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        setProductList(response.data); // Atualiza a lista de produtos
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Erro ao carregar os produtos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Executa apenas na montagem do componente

  const handleDelete = async (id) => {
    if (!window.confirm("Você tem certeza que deseja excluir este produto?")) {
      return;
    }

    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProductList((prevList) =>
        prevList.filter((product) => product.id !== id)
      );
      alert("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Não foi possível excluir o produto. Tente novamente.");
    }
  };

  if (loading) {
    return <p>Carregando produtos...</p>; // Indicador de carregamento
  }

  if (error) {
    return <p className="error-message">{error}</p>; // Exibe mensagens de erro
  }

  return (
    <div className="product-grid">
      <Link to="/products/new" className="product-link">
        Adicionar Novo Produto
      </Link>
      {productList.map((product) => (
        <div className="product-card" key={product.id}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <div className="product-details">
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">R$ {product.price.toFixed(2)}</p>
            <div className="product-actions">
              <Link to={`/products/${product.id}`} className="product-link">
                Ver detalhes
              </Link>
              <Link
                to={`/products/edit/${product.id}`}
                className="product-link-edit"
              >
                Editar Cadastro
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="delete-button"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
