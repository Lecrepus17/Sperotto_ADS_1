// Componente PessoasFiltradas
function PessoasFiltradas({ pessoas }) {
    return (
      <ul>
        {pessoas
          .filter((pessoa) => pessoa.startsWith("A"))
          .map((pessoa, index) => (
            <li key={index}>{pessoa}</li>
          ))}
      </ul>
    );
  }
  

export default PessoasFiltradas;
