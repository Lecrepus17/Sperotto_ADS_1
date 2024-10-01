import ThemeProvider from "../Provider/ThemeProvider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home";
import "./App.css";

function App() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Home />
        <Footer />
      </ThemeProvider>

      {/* <ContadorCustomizado /> */}
      {/* <Memo2 /> */}
      {/* <CallBack /> */}
      {/* <PerfilUsuario /> */}
      {/* <Memo /> */}
      {/* <Contador /> */}
    </>
  );
}

export default App;
