import { Component } from "react";
class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "Maria",
      idade: 25,
      cidade: "São Paulo",
    };
  }
  atualizarIdade = () => {
    // Atualiza apenas a idade, mantendo as outras propriedades do estado
    this.setState({
      idade: 26,
    });
  };
  render() {
    return (
      <div>
        <p>Nome: {this.state.nome}</p>
        <p>Idade: {this.state.idade}</p>
        <p>Cidade: {this.state.cidade}</p>
        <button onClick={this.atualizarIdade}>Atualizar Idade</button>
      </div>
    );
  }
}
export default Perfil;
