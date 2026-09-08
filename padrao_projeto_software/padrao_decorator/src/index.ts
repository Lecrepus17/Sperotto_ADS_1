import { NotificadorEmail } from "./Notificator/NotificadorEmail";
import { SMSDecorator } from "./Notificator/SMSDecorator";
import { WhatsAppDecorator } from "./Notificator/WhatsAppDecorator";
import { LogDecorator } from "./Notificator/LogDecorator";

console.log("=== TESTE BÁSICO ===");
const notificadorBasico = new NotificadorEmail();
notificadorBasico.enviar("Bem-vindo ao nosso sistema!");

console.log("\n=== CENÁRIO A: E-mail + SMS ===");
const notificadorCenarioA = new SMSDecorator(notificadorBasico);
notificadorCenarioA.enviar("Seu pedido foi faturado.");

console.log("\n=== CENÁRIO B: E-mail + WhatsApp + SMS + Log ===");
// Composição dinâmica conforme as regras
const notificadorCenarioB = new LogDecorator(
  new WhatsAppDecorator(notificadorCenarioA),
);
notificadorCenarioB.enviar("Alerta crítico de segurança na conta.");
