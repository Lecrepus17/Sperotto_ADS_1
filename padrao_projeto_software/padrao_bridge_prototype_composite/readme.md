# Gerenciamento de Tropas — Padrões Bridge, Prototype e Composite

Este projeto demonstra a aplicação conjunta dos padrões de projeto **Bridge**, **Prototype** e **Composite** (GoF) em um subsistema de gerenciamento, comportamento e duplicação de tropas para um jogo de estratégia em tempo real (RTS - *Kingdoms & Conquest*).

---

## 🎯 Motivo da Utilização de Cada Padrão

### 1. Padrão Bridge (Ponte)
* **Problema a ser evitado**: Sem o Bridge, a associação direta entre tipos de soldados e comportamentos de combate geraria uma explosão combinatória de subclasses (ex.: `SoldadoAgressivo`, `SoldadoDefensivo`, `ArqueiroAgressivo`, `ArqueiroDefensivo`, etc.). Além disso, a unidade ficaria fortemente acoplada a uma IA fixa em tempo de compilação.
* **Por que foi usado**: Desacopla a abstração de unidade militar (`Soldado`) da sua implementação de comportamento (`ComportamentoIA`) através da composição (a "ponte"). Isso possibilita:
  - Adicionar novas estratégias de IA (`IAAgressiva`, `IADefensiva`, etc.) ou novas unidades sem alterar as classes existentes (Princípio Aberto/Fechado - OCP).
  - Permitir que a inteligência artificial evolua independentemente da hierarquia das tropas.

### 2. Padrão Composite (Composto)
* **Problema a ser evitado**: Sem o Composite, o código cliente precisaria checar em tempo de execução se está manipulando um soldado individual ou um regimento inteiro (com `instanceof` e estruturas condicionais repetitivas), acoplando a lógica à estrutura interna do exército.
* **Por que foi usado**: Permite estruturar as tropas em árvore e trabalhar com folhas (`Soldado`) e contêineres (`Regimento`) de maneira **uniforme** através da interface `UnidadeMilitar`. Isso possibilita:
  - Montar formações táticas de qualquer profundidade (ex.: Exército Imperial contendo Pelotão de Choque, que por sua vez contém múltiplos Soldados).
  - Executar ordens de combate com polimorfismo e recursão: chamar `exercito.atacar()` propaga automaticamente o ataque por todos os soldados e sub-regimentos da árvore.

### 3. Padrão Prototype (Protótipo)
* **Problema a ser evitado**: No recurso de "Duplicação de Tropas Instantânea", instanciar um novo exército do zero com o operador `new` exigiria que o código cliente conhecesse todas as classes concretas, atributos internos e fizesse manualmente toda a reconstrução da árvore hierárquica.
* **Por que foi usado**: Delega a responsabilidade da duplicação para os próprios objetos através do método `clone()`. Isso possibilita:
  - **Clonagem Profunda (*Deep Copy*)**: Cada nó da árvore duplica a si mesmo e seus componentes internos (`Soldado` clona a sua própria IA via `this.ia.clone()`, e `Regimento` clona recursivamente todas as suas sub-unidades).
  - **Independência Total**: O exército clonado é completamente autônomo. Modificações táticas posteriores (como baixas de tropas ou adição de reforços) em um exército não interferem no outro.

---

## 🚀 Como Configurar e Executar

### Pré-requisitos
Certifique-se de ter o **Node.js** instalado na sua máquina (v18+ recomendado).

### Estrutura de Pastas

```text
padrao_bridge_prototype_composite/
├── src/
│   ├── bridge/
│   │   ├── ComportamentoIA.ts
│   │   ├── IAAgressiva.ts
│   │   └── IADefensiva.ts
│   ├── composite/
│   │   ├── Regimento.ts
│   │   ├── Soldado.ts
│   │   └── UnidadeMilitar.ts
│   ├── prototype/
│   │   └── Prototipo.ts
│   └── index.ts
├── .gitignore
├── package-lock.json
├── package.json
├── readme.md
└── tsconfig.json
```

## Requisitos

- Node.js (v18+ recomendado)
- npm

## Instalação

Na raiz desta pasta (`padrao_bridge_prototype_composite`):

```bash
npm install
```

Caso queira instalar manualmente as dependências de desenvolvimento do TypeScript e execução:

```bash
npm install -D typescript @types/node tsx
```

## Execução

Para executar a simulação e os testes de clonagem, ataque e restrições:

```bash
npm start
```

Ou em modo observador (*watch*):

```bash
npm run dev
```

Ou diretamente via `npx tsx`:

```bash
npx tsx src/index.ts
```
