import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductEdit() {
  const { id } = useParams(); // Obtém o ID do produto da URL
  const navigate = useNavigate(); // Para redirecionar após atualização

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Busca os dados do produto para preencher o formulário
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setFormData(response.data);
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError("Não foi possível carregar os dados do produto.");
      }
    };

    fetchProduct();
  }, [id]);

  // Atualiza os campos do formulário conforme o usuário edita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Envia os dados atualizados para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(`https://fakestoreapi.com/products/${id}`, formData);
      alert("Produto atualizado com sucesso!");
      navigate("/"); // Redireciona para a lista de produtos
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      setError("Não foi possível atualizar o produto. Tente novamente.");
      setLoading(false);
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!formData.title && !error) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="product-edit-container">
      <h1 className="product-edit-title">Editar Produto</h1>
      <form className="product-edit-form" onSubmit={handleSubmit}>
        {error && <p className="product-edit-error">{error}</p>}
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL da Imagem</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="product-edit-submit" disabled={loading}>
          {loading ? "Salvando..." : "Atualizar Produto"}
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;
