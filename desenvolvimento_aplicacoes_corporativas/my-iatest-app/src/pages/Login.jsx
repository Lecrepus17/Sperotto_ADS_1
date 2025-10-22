import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }
    if (email === "aluno@ifrs.edu.br" && senha === "123456") {
      setErro("");
      navigate("/dashboard");
    } else {
      setErro("Credenciais inválidas.");
    }
  }
  return (
    <div>
      <h1 data-testid="titulo-pagina">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="campo-email"
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="campo-senha"
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button id="botao-entrar" type="submit">
          Entrar
        </button>
      </form>
      {erro && <p id="mensagem-erro">{erro}</p>}
    </div>
  );
}
