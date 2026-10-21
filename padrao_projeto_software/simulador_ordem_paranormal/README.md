# ⚔️ Simulador Ordem Paranormal RPG (Edição Completa & Offline)

Novo simulador baseado no [`simulador_rpg`](../simulador_rpg), projetado para funcionar **100% offline**, mantendo os **5 Padrões de Projeto** (`Singleton`, `Strategy`, `Factory Method`, `Decorator`, `Observer`) e expandindo o sistema com as regras oficiais do livro **Ordem Paranormal RPG**, múltiplos agentes/criaturas, construtor de dados/ações/amuletos e detalhamento visual de dano.

> **Nota:** O projeto original em `padrao_projeto_software/simulador_rpg` permaneceu 100% intacto.

---

## ✅ O que já foi implementado neste diretório

1. **Configuração Base Offline**:
   - [`package.json`](./package.json) configurado com scripts `expo start --offline` e `tsx`.
   - [`app.json`](./app.json), [`tsconfig.json`](./tsconfig.json), [`index.ts`](./index.ts) e [`.gitignore`](./.gitignore).
2. **Tipagem & Regras do Livro de Ordem Paranormal (`src/types/Elementos.ts`)**:
   - Ciclo de opressão elemental oficial: **Sangue 🩸 > Conhecimento 🧠 > Energia ⚡ > Morte 💀 > Sangue 🩸**, além de **Medo 👁️** (ignora RD comum) e **Físico/Balístico 🗡️**.
   - Suporte a qualquer tipo de dado (`d4`, `d6`, `d8`, `d10`, `d12`, `d20`, `d100`) e quantidade livre.
   - Estrutura completa de detalhamento de rolagem (`ResultadoAcao`) com teste de acerto (`Xd20` pegando o maior + perícia vs Defesa), margem de ameaça, multiplicador de crítico, dados individuais, bônus de amuletos (`Decorator`), multiplicador elemental (`2x` ou `½`) e Redução de Dano (`RD`).
3. **Catálogo Base do Livro (`src/data/presetsOrdem.ts`)**:
   - Presets prontos de Agentes (Investigador, Combatente, Ocultista, Especialista), Criaturas dos 5 elementos (Zumbi de Sangue, Aberração de Carne, Esqueleto de Lodo, Carniçal Preto da Morte, Anjo Decaído, Anárquico, Relíquia/Degolificada), Armas/Rituais/Ações Táticas e Amuletos/Maldições.
4. **Padrão Singleton (`src/Singleton/`)**:
   - [`BattleLogger.ts`](./src/Singleton/BattleLogger.ts): Histórico categorizado de logs e armazenamento do `ResultadoAcao` detalhado para exibição do cálculo de dano.
   - [`OfflineStorage.ts`](./src/Singleton/OfflineStorage.ts): Gerenciador de persistência offline (`localStorage` + fallback em memória) com suporte a criar/editar/remover agentes, criaturas, ações, amuletos, alterar regras da mesa e exportar/importar JSON.
5. **Padrão Observer (`src/Observer/`)**:
   - [`Observador.ts`](./src/Observer/Observador.ts) e [`MestreDeJogo.ts`](./src/Observer/MestreDeJogo.ts).
6. **Padrão Strategy (`src/Strategy/`)**:
   - [`EstrategiaAtaque.ts`](./src/Strategy/EstrategiaAtaque.ts) e [`AcaoOrdemStrategy.ts`](./src/Strategy/AcaoOrdemStrategy.ts) com cálculo completo de acerto, crítico, múltiplos dados, efeitos de cura/buff/dano mental (SAN), ciclo elemental e RD.

---

## 📋 O que falta adicionar (Próximos Passos)

### Fase 1 — Concluir Padrões `Factory Method` e `Decorator` (`src/Factory/` e `src/Decorator/`)
- [ ] **`src/Factory/Entidade.ts`**: Interface `Entidade` estendendo `CombatenteAlvo`, expondo métodos de `PV`, `PE`, `SAN`, `Defesa`, `RD`, `Elemento`, inscrição de `Observador` e gerenciamento de `Decorator`.
- [ ] **`src/Factory/PersonagemBase.ts`**: Implementação base com controle de `PV`, `PE`, `SAN`, disparo automático do **Observer (`MestreDeJogo`)** quando o personagem entra em estado **Machucado (PV ≤ 50%)**, **Morrendo/Derrotado (PV = 0)** ou **Enlouquecendo (SAN = 0)**.
- [ ] **`src/Factory/Agente.ts`**, **`src/Factory/Criatura.ts`**, **`src/Factory/TipoEntidadeEnum.ts`** e **`src/Factory/EntidadeFactory.ts`**: Fábrica para instanciar Agentes e Criaturas a partir de qualquer `ConfigCombatente` (padrão ou criado pelo usuário).
- [ ] **`src/Decorator/EquipamentoDecorator.ts`** e **`src/Decorator/AmuletoCustomDecorator.ts`**: Decorator configurável que empilha dinamicamente bônus fixo de dano, dados extras elementais (ex: `+1d8 Sangue`), bônus de acerto, bônus de Defesa e bônus de RD sobre qualquer combatente.

### Fase 2 — Tema Visual e Componentes de Exibição de Dano (`src/styles/theme.ts`)
- [ ] **`src/styles/theme.ts`**: Tema escuro paranormal com cores dedicadas para cada elemento (**Sangue**, **Morte**, **Conhecimento**, **Energia**, **Medo** e **Físico**), barras triplas (`PV`, `PE`, `SAN`), chips visuais de dados rolados e cartões de decomposição matemática do dano.

### Fase 3 — Interface Principal Multi-Abas (`App.tsx`) e CLI (`src/index.ts`)
- [ ] **`App.tsx`** com 5 áreas principais:
  1. **⚔️ Arena de Combate**:
     - Suporte a **múltiplas pessoas (equipe de Agentes)** e **múltiplos monstros (grupo de Criaturas)** simultaneamente, podendo adicionar/remover combatentes em tempo real e escolher quem ataca e quem é o alvo.
     - **Novo Painel "Raio-X do Dano"**: Mostra cada dado rolado individualmente (`[d10: 8]`), dados extras de crítico, soma dos amuletos (`Decorator`), multiplicador elemental (`2x Opressão` ou `½ Resistência`) e desconto de `RD`.
     - Seletor de qualquer Ação/Arma/Ritual/Cura e botão de **Equipar/Remover Amuletos** por personagem.
  2. **🕵️ Oficina de Pessoas & Monstros (`Factory`)**:
     - Formulário para adicionar/editar Agentes e Criaturas (Nome, Emoji, Elemento, PV, PE, SAN, Defesa, RD, quantidade de `d20` no ataque).
  3. **🔮 Oficina de Ações, Rituais & Dados (`Strategy`)**:
     - Formulário para criar/editar ataques, rituais e curas configurando **quantidade de dados**, **tipo de dado (`d4`, `d6`, `d8`, `d10`, `d12`, `d20`, `d100`)**, bônus fixo, margem/multiplicador de crítico, elemento e custo de PE/SAN.
  4. **📿 Oficina de Amuletos & Maldições (`Decorator`)**:
     - Formulário para criar novos amuletos e maldições com bônus fixo, dados extras, Defesa e RD.
  5. **🎲 Rolador Livre & Configurações Offline (`Singleton`)**:
     - Rolador de dados avulso para qualquer combinação de dados, toggles de regras da mesa (ativar/desativar teste de `d20 vs Defesa`, ajustar multiplicadores, ativar/desativar `RD`) e backup/restauração JSON offline.
- [ ] **`src/index.ts`**: Script de simulação via terminal (`npm run cli`) demonstrando os 5 padrões de projeto e o ciclo de elementos de Ordem Paranormal.

---

## ▶️ Como retomar a implementação depois

Quando quiser continuar, basta pedir:
> *"Continue a implementação do `simulador_ordem_paranormal` a partir do README.md"*

A execução seguirá diretamente da **Fase 1** (`Factory` e `Decorator`) até a **Fase 3** (`App.tsx`, `src/index.ts` e testes).
