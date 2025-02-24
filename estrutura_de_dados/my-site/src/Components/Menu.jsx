// Componente Menu
function Menu({ menus }) {
  return (
    <nav>
      <ul>
        {menus.map((men, index) => (
          <li>
            <a key={index} href={men.href}>{men.nome}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
