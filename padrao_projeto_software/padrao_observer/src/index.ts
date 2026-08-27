import { EmailService, InventoryService, LogService, Pedido } from "./observerPedido";

const email = new EmailService("user@example.com");
const inventory = new InventoryService(5);
const log = new LogService();

// Cria o pedido com status inicial "Criado" e código "560"
const pedido = new Pedido("Criado", "560");

// 1. INSCRIÇÃO DOS OBSERVADORES
pedido.subscribe(email);
pedido.subscribe(inventory);
pedido.subscribe(log);

// 2. MUDANÇAS DE ESTADO (Descomente uma por vez ou rode tudo para ver o fluxo)
console.log("--- Pagando o pedido ---");
pedido.setStatus("Pago");

console.log("\n--- Enviando o pedido ---");
pedido.setStatus("Enviado");
