🚀 Como Configurar e Executar
Pré-requisitos
Certifique-se de ter o Node.js instalado na sua máquina.

Passo 1: Instalar dependências
Na raiz do projeto, inicialize o Node e instale as dependências de desenvolvimento do TypeScript:

Bash
npm init -y
 # Módulo Checkout E-commerce — Padrão Strategy

Este repositório demonstra a aplicação do padrão de projeto **Strategy** em um módulo de Finalização de Compra (Checkout). O objetivo é desacoplar regras de desconto, pagamento e notificação em estratégias intercambiáveis.

## Visão Geral

- Domínios: Desconto, Pagamento, Notificação
- Contexto principal: `ProcessadorPedido`

## Estrutura de Pastas

```text
src/
├── domain/
│   ├── ItemPedido.ts
│   └── Pedido.ts
├── strategies/
│   ├── desconto/
│   ├── pagamento/
│   └── notificacao/
├── ProcessadorPedido.ts
├── implements.ts
└── main.ts
```

### Estratégias (resumo)

- Descontos:
    - `DescontoClienteVIPStrategy` — 15% de desconto
    - `DescontoPorQuantidadeStrategy` — 10% quando itens > 5
    - `DescontoCupomFixoStrategy` — subtrai valor fixo (não negativo)
- Pagamentos:
    - `PagamentoPixStrategy` — pagamento imediato (sem taxas)
    - `PagamentoCartaoCreditoStrategy` — adiciona +2.5% de taxa
    - `PagamentoBoletoStrategy` — adiciona taxa fixa R$2,50
- Notificações:
    - `NotificacaoEmailStrategy`
    - `NotificacaoSMSStrategy`
    - `NotificacaoWhatsAppStrategy`

## Requisitos

- Node.js (v14+ recomendado)

## Instalação

Na raiz do projeto:

```bash
npm init -y
npm install -D typescript ts-node @types/node
npx tsc --init
```

Verifique `tsconfig.json` para garantir compatibilidade CommonJS. Remova ou defina `"verbatimModuleSyntax": false` se presente.

## Execução

```bash
npx ts-node src/main.ts
```

Sugestão: adicione um script em `package.json`:

```json
{
    "scripts": {
        "start": "ts-node src/main.ts"
    }
}
```

## Exemplo de Uso (src/main.ts)

```typescript
import {
    Pedido,
    ProcessadorPedido,
    DescontoPorQuantidadeStrategy,
    PagamentoCartaoCreditoStrategy,
    NotificacaoWhatsAppStrategy
} from './implements';

const pedido = new Pedido('PED-100', [
    { nome: 'Teclado Mecânico', preco: 250, quantidade: 2 },
    { nome: 'Mousepad', preco: 50, quantidade: 4 }
], '+55 11 99999-9999');

const checkout = new ProcessadorPedido(
    new DescontoPorQuantidadeStrategy(),
    new PagamentoCartaoCreditoStrategy(),
    new NotificacaoWhatsAppStrategy()
);

checkout.processar(pedido);
```