import { Carro } from "./carro";

class Motorista {
  public nome: string = "";
  private cnh: number = 0;

  constructor(nome: string, cnh: number = 0) {
    this.nome = nome;
    this.cnh = cnh || 0;
  }
  dirigirCarro(carro: Carro) {
    return this.nome + " está dirigindo o carro " + carro.modelo;
  }
}
let carroBom = new Carro(
  "ford",
  "fusca 1949",
  "burro quando foge",
  "1565safsf",
  299
);

let motoristaTeste = new Motorista("Motorista para teste", 299);

console.log(motoristaTeste.dirigirCarro(carroBom));
