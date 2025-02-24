// Componente user
function User({ tipoUser }) {
  return (
    <div>
      {tipoUser === "admin" ? (
        <div>
          <h1>Bem-vindo, Admin</h1>
          <button href="#admin"> Gerenciar Usuários</button>
        </div>
      ) : tipoUser === "visitante" ? (
        <div>
          <h1>Bem-vindo, Visitante</h1>
          <button href="#login">Fazer Login</button>
        </div>
      ) : (
        <div>
          <h1>Bem-vindo, Editor</h1>
          <button href="#editr">Textos para editar</button>
        </div>
      )}
    </div>
  );
}

export default User;
