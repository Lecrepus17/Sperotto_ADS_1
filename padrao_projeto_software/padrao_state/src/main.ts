import { Pedido } from "./Pedido";

console.log(
  "===============================================================================",
);
console.log(
  "🛒 SIMULAÇÃO DO SISTEMA DE GERENCIAMENTO DE PEDIDOS DE E-COMMERCE (PADRÃO STATE)",
);
console.log(
  "===============================================================================\n",
);

// ==========================================================================
// FLUXO 1: FLUXO BEM-SUCEDIDO (HAPPY PATH)
// ==========================================================================
console.log(
  "-------------------------------------------------------------------------------",
);
console.log("📦 FLUXO 1: Fluxo Completo Bem-Sucedido");
console.log("Aguardando Pagamento ➔ Pago ➔ Enviado ➔ Entregue");
console.log(
  "-------------------------------------------------------------------------------",
);

const pedido1 = new Pedido("PED-101");

// 1. Pagar o pedido
pedido1.pagar();

// 2. Enviar o pedido para a transportadora
pedido1.enviar();

// 3. Concluir a entrega do pedido ao cliente
pedido1.concluirEntrega();

// 4. Testar ações informativas no Estado Final (Entregue)
console.log("\n--- Tentando interações no estado final (Entregue) ---");
pedido1.pagar();
pedido1.enviar();
pedido1.cancelar();

// ==========================================================================
// FLUXO 2: FLUXO COM TENTATIVAS DE TRANSIÇÕES INVÁLIDAS
// ==========================================================================
console.log(
  "\n-------------------------------------------------------------------------------",
);
console.log("⚠️ FLUXO 2: Simulação de Tentativas de Transições Inválidas");
console.log(
  "-------------------------------------------------------------------------------",
);

const pedido2 = new Pedido("PED-102");

// 1. Tentativas inválidas em "Aguardando Pagamento"
console.log(
  "\n[Cenário 2.1] Tentando enviar e concluir entrega antes do pagamento:",
);
pedido2.enviar(); // Inválido: Não foi pago ainda
pedido2.concluirEntrega(); // Inválido: Não foi pago nem enviado

// 2. Realizando o pagamento válido
console.log("\n[Cenário 2.2] Realizando pagamento legítimo:");
pedido2.pagar(); // Válido: Transita para Pago

// 3. Tentativas inválidas em "Pago"
console.log(
  "\n[Cenário 2.3] Tentando pagar novamente e concluir entrega sem despachar:",
);
pedido2.pagar(); // Inválido/Aviso: Já está pago
pedido2.concluirEntrega(); // Inválido: Ainda não foi enviado

// 4. Despachando o pedido (Pago -> Enviado)
console.log("\n[Cenário 2.4] Enviando o pedido:");
pedido2.enviar(); // Válido: Transita para Enviado

// 5. Tentativa inválida em "Enviado"
console.log(
  "\n[Cenário 2.5] Tentando cancelar pedido que já está em transporte:",
);
pedido2.cancelar(); // Inválido/Aviso: Não pode cancelar pedido em trânsito
pedido2.enviar(); // Inválido/Aviso: Pedido já despachado

// 6. Concluindo entrega
console.log("\n[Cenário 2.6] Concluindo a entrega:");
pedido2.concluirEntrega(); // Válido: Transita para Entregue

// ==========================================================================
// FLUXO 3: CANCELAMENTOS (ANTES E DEPOIS DO PAGAMENTO)
// ==========================================================================
console.log(
  "\n-------------------------------------------------------------------------------",
);
console.log(
  "🛑 FLUXO 3: Fluxos de Cancelamento e Tentativas de Interação em Cancelado",
);
console.log(
  "-------------------------------------------------------------------------------",
);

// Cenário 3A: Cancelamento antes de pagar
console.log("\n[Cenário 3A] Cancelando pedido antes de efetuar pagamento:");
const pedido3A = new Pedido("PED-103A");
pedido3A.cancelar(); // Válido: Transita para Cancelado
// Tentando agir sobre pedido cancelado
pedido3A.pagar(); // Inválido: Pedido cancelado
pedido3A.enviar(); // Inválido: Pedido cancelado

// Cenário 3B: Cancelamento após pagamento (com reembolso)
console.log(
  "\n[Cenário 3B] Cancelando pedido após o pagamento (com reembolso):",
);
const pedido3B = new Pedido("PED-103B");
pedido3B.pagar(); // Válido: Transita para Pago
pedido3B.cancelar(); // Válido: Transita para Cancelado (com reembolso)
pedido3B.concluirEntrega(); // Inválido: Pedido cancelado

console.log(
  "\n===============================================================================",
);
console.log("🏁 SIMULAÇÃO CONCLUÍDA COM SUCESSO!");
console.log(
  "===============================================================================\n",
);
