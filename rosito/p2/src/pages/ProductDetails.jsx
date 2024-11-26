import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams(); // Obtém o ID dos parâmetros da URL
  const [product, setProduct] = useState(null); // Estado para armazenar o produto

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data); // Define o produto no estado
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };
    fetchProductById();
  }, [id]);

  if (!product) {
    return <p>Carregando produto...</p>; // Exibe um estado de carregamento enquanto o produto é buscado
  }

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-details-image" 
        />
        <div className="product-details-info">
          <h1 className="product-details-title">{product.title}</h1>
          <p className="product-details-description">Descrição: {product.description}</p>
          <p className="product-details-description">Categoria: {product.category}</p>
          <p className="product-details-price">Preço: R$ {product.price.toFixed(2)}</p>
          <Link to="/products" className="product-details-back-link">
            Voltar para a lista de produtos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
