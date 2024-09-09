// Componente Sidebar
function Sidebar({title, sidebar}) {
  return (
    <aside>
      <h3>{title}</h3>
      <ul>
        {sidebar.map((sidebar, index) => (
        <li key={index}>{sidebar.nome}</li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;