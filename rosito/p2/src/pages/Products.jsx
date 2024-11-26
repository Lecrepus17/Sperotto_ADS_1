import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function ProductList() {
  const [productList, setProductList] = useState([
    {
      id: null,
      title: "",
      image: "",
      price: 0,
    },
  ]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responses = await axios.get("https://fakestoreapi.com/products");
        // Extraindo os dados das respostas
        const product = responses.data;
        setProductList(product);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();
  }, []);

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

  return (
    <div className="product-grid">
      <Link to={"/products/new"} className="product-link">
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
              <Link to={`/products/edit/${product.id}`} className="product-link-edit">
                Editar Cadastro
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="delete-button"
              >Excluir</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ProductList;
