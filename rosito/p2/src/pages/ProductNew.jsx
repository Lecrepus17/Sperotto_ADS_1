import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductsNew() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para redirecionar após criar o produto

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        formData
      );
      console.log("Produto criado:", response.data);
      setLoading(false);
      alert("Produto adicionado com suesso.");
      navigate("/products"); // Redireciona para a lista de produtos
    } catch (err) {
      console.error("Erro ao criar produto:", err);
      setError("Ocorreu um erro ao criar o produto. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="product-new-container">
      <h1 className="product-new-title">Adicionar Novo Produto</h1>
      <form className="product-new-form" onSubmit={handleSubmit}>
        {error && <p className="product-new-error">{error}</p>}
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
        <button type="submit" className="product-new-submit" disabled={loading}>
          {loading ? "Salvando..." : "Adicionar Produto"}
        </button>
      </form>
    </div>
  );
}

export default ProductsNew;
