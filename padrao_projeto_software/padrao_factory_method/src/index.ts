import { GerenciadorNotificacao } from "./abstract/GerenciadorNotificacao";
import { GerenciadorEmail } from "./class/GerenciadorEmail";
import { GerenciadorPush } from "./class/GerenciadorPush";
import { GerenciadorSMS } from "./class/GerenciadorSMS";

function clienteEnviarNotificacao(gerenciador: GerenciadorNotificacao, mensagem: string, destinatario: string): void {
  gerenciador.notificar(mensagem, destinatario);
}

console.log("--- Testando envio por E-mail ---");
let gerenciador: GerenciadorNotificacao = new GerenciadorEmail();
clienteEnviarNotificacao(gerenciador, "Seu pedido foi enviado!", "cliente@email.com");

console.log("\n--- Testando envio por SMS ---");
gerenciador = new GerenciadorSMS();
clienteEnviarNotificacao(gerenciador, "Seu código de rastreio é 12345.", "(11) 98765-4321");

console.log("\n--- Testando envio por Push Notification ---");
gerenciador = new GerenciadorPush();
clienteEnviarNotificacao(gerenciador, "O entregador está próximo.", "device_token_abc123");