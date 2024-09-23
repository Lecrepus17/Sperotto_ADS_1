import { useState } from "react";
import "./App.css";
// Dados de carros em memória
const carrosEmMemoria = [
  { id: 1, marca: "Toyota", modelo: "Corolla", ano: 2020, preco: 85000 },
  { id: 2, marca: "Honda", modelo: "Civic", ano: 2019, preco: 90000 },
  { id: 3, marca: "Ford", modelo: "Focus", ano: 2018, preco: 70000 },
  { id: 4, marca: "Chevrolet", modelo: "Cruze", ano: 2021, preco: 95000 },
  { id: 5, marca: "Hyundai", modelo: "Elantra", ano: 2022, preco: 105000 },
];
function App() {
  // Estado para armazenar os carros
  const [carros, setCarros] = useState(carrosEmMemoria);
  // Estado para armazenar a marca a ser filtrada
  const [filtroMarca, setFiltroMarca] = useState("");
  // Função para lidar com a mudança no campo de filtro de marca
  const handleFiltrarMarca = (e) => {
    const marca = e.target.value;
    setFiltroMarca(marca);
    // Filtrar carros pela marca
    if (marca === "") {
      setCarros(carrosEmMemoria); // Mostra todos os carros se o filtro estiver vazio
    } else {
      setCarros(
        carrosEmMemoria.filter((carro) =>
          carro.marca.toLowerCase().includes(marca.toLowerCase())
        )
      );
    }
  };
  return (
    <>
      <h1>Listagem de Carros</h1>
      <div>
        <label htmlFor="filtroMarcaCarro">Filtrar por marca:</label>
        <input
          id="filtroMarcaCarro"
          type="text"
          value={filtroMarca}
          onChange={handleFiltrarMarca}
          placeholder="Digite a marca"
        />
      </div>
      <br />
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Preço (R$)</th>
          </tr>
        </thead>
        <tbody>
          {carros.length > 0 ? (
            carros.map((carro) => (
              <tr key={carro.id}>
                <td>{carro.marca}</td>
                <td>{carro.modelo}</td>
                <td>{carro.ano}</td>
                <td>
                  {carro.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum carro encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
export default App;
