# Atividade 2: Sistema de Gerenciamento de Pedidos de E-commerce (Padrão State)

Este projeto implementa o padrão comportamental **State (Estado)** em TypeScript para o fluxo de pedidos de um e-commerce, isolando as regras de transição e o comportamento de cada estado do ciclo de vida de um pedido em classes concretas, eliminando condicionais encadeadas (`if/else`) e flags booleanas.

---

## 📌 Regras de Negócio e Estados do Pedido

O ciclo de vida do pedido possui 5 estados principais:

1. **Aguardando Pagamento (`AguardandoPagamentoState`)**
   - `pagar()`: Transita para o estado **Pago**.
   - `cancelar()`: Transita para o estado **Cancelado**.
   - `enviar()` / `concluirEntrega()`: Transições inválidas (exibem mensagem de aviso).

2. **Pago (`PagoState`)**
   - `enviar()`: Transita para o estado **Enviado**.
   - `cancelar()`: Transita para o estado **Cancelado** (com emissão de reembolso).
   - `pagar()`: Exibe aviso de que o pedido já está pago.
   - `concluirEntrega()`: Transição inválida (o pedido ainda precisa ser despachado).

3. **Enviado (`EnviadoState`)**
   - `concluirEntrega()`: Transita para o estado **Entregue**.
   - `cancelar()`: Exibe aviso de que não é possível cancelar um pedido que já está em trânsito.
   - `pagar()` / `enviar()`: Exibem aviso de operação desnecessária.

4. **Entregue (`EntregueState`) - Estado Final**
   - Nenhuma alteração de estado é permitida. Apenas exibe mensagens informativas.

5. **Cancelado (`CanceladoState`) - Estado Final**
   - Nenhuma alteração de estado é permitida. Apenas exibe avisos informando que o pedido está encerrado.

---

## 🏗️ Estrutura do Projeto

```text
padrao_state/
├── src/
│   ├── interfaces/
│   │   └── EstadoPedido.ts              # Interface comum para todos os estados
│   ├── states/
│   │   ├── AguardandoPagamentoState.ts  # Estado 1: Aguardando Pagamento
│   │   ├── PagoState.ts                 # Estado 2: Pago
│   │   ├── EnviadoState.ts              # Estado 3: Enviado
│   │   ├── EntregueState.ts             # Estado 4: Entregue (Final)
│   │   ├── CanceladoState.ts            # Estado 5: Cancelado (Final)
│   │   └── index.ts                     # Re-exportação dos estados
│   ├── Pedido.ts                        # Contexto: mantém estado atual e delega ações
│   ├── main.ts                          # Script de teste (fluxos válidos e inválidos)
│   └── index.ts                         # Ponto de entrada
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado (v18+)

### Instalação das Dependências

Na pasta `padrao_projeto_software/padrao_state`:

```bash
npm install
```

### Executar a Simulação / Testes

```bash
npm start
```
ou:
```bash
npm test
```
ou em modo observador (watch):
```bash
npm run dev
```
