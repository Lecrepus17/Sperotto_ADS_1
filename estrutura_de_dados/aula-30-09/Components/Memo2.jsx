import { memo, useState } from "react";
// Componente pai
function Memo2() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  return (
    <>
      <label>
        Nome:
        <input
          name="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Endereço:
        <input
          name="endereco"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <hr />
      <Saudacao name={name} />
    </>
  );
}
// Componente filho
const Saudacao = memo(({ name }) => {
  console.log("Renderizando Saudacao em", new Date().toLocaleTimeString());
  return <h3>Olá, {name}!</h3>;
});
export default Memo2;
