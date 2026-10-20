# ⚔️ Simulador RPG Paranormal

**Descrição do Projeto:**
Simulador de combate de RPG de mesa focado na interação entre Agentes e Criaturas. O sistema resolve a complexidade de instanciar diferentes tipos de personagens, gerenciar modificadores de equipamentos de forma escalável, alternar regras de dano e notificar eventos globais durante a partida sem acoplar a lógica de negócio.

O projeto possui duas interfaces sobre o mesmo domínio:

- **App Expo (React Native)**: front-end com tema roxo escuro estilo jogo, para celular (Expo Go) e navegador.
- **CLI (terminal)**: simulação de combate via `tsx`.

## 🚀 Instruções de Execução

**Pré-requisitos:** [Node.js](https://nodejs.org/) 18+. Para celular, o app **Expo Go** (Android/iOS), com celular e computador na mesma rede Wi-Fi.

1. Instale as dependências: `npm install --legacy-peer-deps`
2. Execute a versão desejada:

| Versão | Comando | Observação |
|---|---|---|
| App Expo | `npm start` | Escaneie o QR Code no Expo Go, ou pressione `w` (navegador), `a` (Android) ou `i` (iOS) |
| Android / iOS / Web | `npm run android` / `npm run ios` / `npm run web` | Atalhos do Expo |
| Terminal (CLI) | `npm run cli` | Equivale a `npx tsx src/index.ts` |

## 🎮 Regras e funcionalidades do app

- **Agente** (Investigador): 100 HP no app (50 HP na CLI).
- **Criaturas** (escolhidas via Factory):
  - 🧟 Zumbi de Sangue (50 HP, afinidade Física)
  - 👁️ Anjo Decaído (80 HP, afinidade Paranormal)
  - 💀 Relíquia do Abismo (120 HP, afinidade Paranormal)
- **Fórmulas de Dano e Afinidade (Strategy)**:
  - **Ataque Físico**: rola **`1d20`** (1 a 20 de dano). Se o alvo for Paranormal, o dano é **reduzido pela metade**.
  - **Ritual Paranormal**: rola **`2d10`** (2 a 20 de dano). Se o alvo for Físico, o dano é **reduzido pela metade**.
- **Amuleto de Força (Decorator)**: adiciona **`+5`** de dano por amuleto, acumulável dinamicamente.
- A cada turno o agente ataca e, se a criatura sobreviver, ela contra-ataca. O combate termina quando o HP de um lado chega a 0.
- Diário do Mestre mostra os logs em tempo real com dados rolados e alertas do Observer.

## 🧩 Mapeamento dos 5 Padrões Aplicados

* **Singleton (Criacional)**
  * **Onde foi aplicado:** `src/Singleton/BattleLogger.ts` (`BattleLogger`).
  * **Justificativa:** Garante uma única instância em toda a aplicação e fornece um ponto de acesso global aos logs de combate, evitando duplicações e inconsistências.

* **Strategy (Comportamental)**
  * **Onde foi aplicado:** `src/Strategy/` (`EstrategiaAtaque`, `AtaqueFisico`, `AtaqueParanormal`).
  * **Justificativa:** Encapsula os algoritmos de dano (`1d20` para Físico e `2d10` para Paranormal com suas regras de redução contra tipos opostos). No app, a estratégia é trocada em tempo de execução via `setEstrategia`.

* **Observer (Comportamental)**
  * **Onde foi aplicado:** `src/Observer/` (`MestreDeJogo` implementando `Observador`).
  * **Justificativa:** Define dependência um-para-muitos; quando uma entidade tem a vida zerada, notifica automaticamente o Mestre de Jogo para emitir alertas de combate.

* **Factory Method (Criacional)**
  * **Onde foi aplicado:** `src/Factory/EntidadeFactory.ts` (`EntidadeFactory`).
  * **Justificativa:** Centraliza e desacopla a instanciação das diferentes entidades do jogo (`Agente` e `Criatura`).

* **Decorator (Estrutural)**
  * **Onde foi aplicado:** `src/Decorator/` (`EquipamentoDecorator`, `AmuletoDeForca`).
  * **Justificativa:** Adiciona responsabilidades (+5 de bônus por amuleto) dinamicamente aos personagens sem alterar a classe base nem depender de herança rígida.

## 🗂️ Estrutura do projeto

```
simulador_rpg/
├── App.tsx                 # Tela principal (Expo)
├── index.ts                # Entry point do Expo
├── app.json                # Configuração do Expo
├── src/
│   ├── index.ts            # Simulação via terminal
│   ├── Factory/            # Entidade, Agente, Criatura, PersonagemBase, EntidadeFactory
│   ├── Strategy/           # Estratégias de ataque (1d20 e 2d10 com afinidades)
│   ├── Decorator/          # Equipamentos
│   ├── Observer/           # Observador e MestreDeJogo
│   ├── Singleton/          # BattleLogger
│   └── styles/theme.ts     # Tema roxo escuro
└── package.json
```

## 🎨 Tema visual

Estilo "dark arcana": fundos roxo muito escuro (`#0B0514`, `#140924`, `#1E0F35`), destaques neon roxo (`#9D4EDD`, `#C77DFF`), carmesim para criaturas (`#E63946`) e dourado para equipamentos (`#F59E0B`), definidos em `src/styles/theme.ts`.

## 🛠️ Tecnologias

TypeScript · React Native · Expo · tsx
