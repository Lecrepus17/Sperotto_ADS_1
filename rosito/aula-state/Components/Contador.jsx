import { useState } from "react";
function Contador() {
  // Declaramos uma variável de estado chamada 'contador' com valor inicial 0
  const [contador, setContador] = useState(0);
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador((prevContador) => prevContador + 1)}>
        Incrementar
      </button>
    </div>
  );

  // import { Component } from "react";
  // class Contador extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       // Definindo o estado inicial no construtor
  //       contador: 2,
  //     };
  //   }
  //   render() {
  //     return (
  //       <div>
  //         <p>Contador: {this.state.contador}</p>
  //         <button onClick={() => this.incrementar()}>Incrementar</button>
  //       </div>
  //     );
  //   }
  //   // Método para atualizar o estado
  //   incrementar1 = () => {
  //     // Atualiza o estado com setState
  //     this.setState((prevState) => ({
  //       contador: prevState.contador + 1,
  //     }));
  //     console.log(this.state.contador);
  //   };
  //   //   incrementar() da seguinte forma:
  //   // Método para atualizar o estado
  //   incrementar = () => {
  //     // Atualiza o estado com setState
  //     this.setState({ contador: this.state.contador + 1 }, () => {
  //       console.log("Estado atualizado:", this.state.contador);
  //     });
  //   };
}
export default Contador;
