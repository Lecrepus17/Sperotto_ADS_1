import Header from "./Components/Header";
import Menu from "./Components/Menu";
import News from "./Components/News";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";

function App() {
  const noticias = [
    { nome: "funcionarei segundo?" },
    { nome: "Parece que temos um shakespeare" },
    { nome: "Aqui..." },
  ];
  const menu = [
    { nome: "Home?", href: "#home" },
    { nome: "funcionará segundo", href: "#segundo" },
    { nome: "Será o sobre", href: "#terceiro" },
  ];
  const sidebar = [
    { nome: "Artigo importantíssimo?" },
    { nome: "Artigo importantíssimo terceiro" },
    { nome: "Artigo importantíssimo segundo" },
  ];

  return (
    <div>
      <Header valor="Esse é o nome do site" />
      <Menu menus={menu} />
      <News title="Notícias importantes" noticias={noticias} />
      <Sidebar title="As mais ouvidas" sidebar={sidebar} />
      <Footer valor="© 2024 Meu Website. Todos os direitos reservados." />
    </div>
  );
}

export default App;
