import "./App.css";
import { useState } from "react";
function App() {
  // Estado que armazena os valores do formulário
  const [formData, setFormData] = useState({
    linguagemFavorita: "",
    aceitaTermos: false,
    genero: "",
  });
  // Função para lidar com mudanças nos inputs
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Se o tipo for "checkbox", usamos 'checked' para o valor
    const valor = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: valor, // Atualiza o campo correto no estado
    }));
  };
  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Linguagem favorita: ${formData.linguagemFavorita}\nGênero: ${
        formData.genero
      }\nAceita os termos: ${formData.aceitaTermos ? "Sim" : "Não"}`
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* Select */}
      <div>
        <label>
          Linguagem favorita:
          <select
            name="linguagemFavorita"
            value={formData.linguagemFavorita}
            onChange={handleChange}
          >
            <option value="">Selecione uma linguagem</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>
        </label>
      </div>
      {/* Radio Buttons */}
      <div>
        <p>Gênero:</p>
        <label>
          <input
            type="radio"
            name="genero"
            value="Masculino"
            checked={formData.genero === "Masculino"}
            onChange={handleChange}
          />
          Masculino
        </label>
        <label>
          <input
            type="radio"
            name="genero"
            value="Feminino"
            checked={formData.genero === "Feminino"}
            onChange={handleChange}
          />
          Feminino
        </label>
        <label>
          <input
            type="radio"
            name="genero"
            value="Outro"
            checked={formData.genero === "Outro"}
            onChange={handleChange}
          />
          Outro
        </label>
      </div>
      {/* Checkbox */}
      <div>
        <label>
          <input
            type="checkbox"
            name="aceitaTermos"
            checked={formData.aceitaTermos}
            onChange={handleChange}
          />
          Aceito os termos e condições
        </label>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}
export default App;
