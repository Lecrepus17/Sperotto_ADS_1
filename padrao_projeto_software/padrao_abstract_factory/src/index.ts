import { Pedido } from "./class/Pedido";
import { HamburgueriaFactory } from "./factory/HamburgueriaFactory";
import { PizzariaFactory } from "./factory/PizzariaFactory";

console.log("--- Pedido 1: Hamburgueria ---");
const tipoRestaurante1: string = "Hamburgueria";
let factory = tipoRestaurante1 === "Hamburgueria" ? new HamburgueriaFactory() : new PizzariaFactory();

const pedido = new Pedido(factory);
pedido.montar();

console.log("\n--- Pedido 2: Pizzaria ---");
const tipoRestaurante2: string = "Pizzaria";
let factory2 = tipoRestaurante2 === "Hamburgueria" ? new HamburgueriaFactory() : new PizzariaFactory();

const pedido2 = new Pedido(factory2);
pedido2.montar();