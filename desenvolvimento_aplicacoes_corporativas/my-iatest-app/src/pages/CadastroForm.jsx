import { useState } from "react";
export default function CadastroForm() {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!nome) {
      setMensagem("Por favor, preencha o nome.");
    } else {
      setMensagem(`Usuário ${nome} cadastrado com sucesso!`);
    }
  }
  return (
    <div>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="campo-nome"
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button id="botao-enviar">Cadastrar</button>
      </form>
      <p id="mensagem">{mensagem}</p>
    </div>
  );
}
