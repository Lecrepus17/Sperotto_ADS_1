export class Carro {
  public marca: string = "";
  public modelo: string = "";
  public cor: string = "";
  private placa: string = "";
  private velocidade: number;

  constructor(
    marca: string,
    modelo: string,
    cor: string,
    placa: string,
    velocidade: number = 0
  ) {
    this.marca = marca;
    this.modelo = modelo;
    this.cor = cor;
    this.placa = placa;
    this.velocidade = velocidade || 0;
  }

  public acelerar() {
    if (this.velocidade < 300) this.velocidade++;
  }

  public frear() {
    if (this.velocidade > 0) this.velocidade--;
  }

  public obterVelocidade() {
    return this.velocidade;
  }
}

// let carroBom = new Carro("ford", "gt", "burro quando foge", "1565safsf", 299);
