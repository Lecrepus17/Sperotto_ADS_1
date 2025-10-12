import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(form.email, form.password, form.role);
      alert("Usuário registrado com sucesso! Agora você pode fazer o login.");
      navigate("/login");
    } catch (err) {
      setError("Erro ao registrar. Verifique os dados e tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h1>Criar Nova Conta</h1>
      {error && <p className="alert">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <FormInput
          label="E-mail"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Senha"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <label className="form-group">
          <span className="form-label">Tipo de Usuário</span>
          {/* Em um app real, este campo seria restrito ou removido */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-input"
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <Button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </Button>
      </form>
    </section>
  );
}
