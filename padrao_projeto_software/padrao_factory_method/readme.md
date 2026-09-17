🚀 Como Configurar e Executar
Pré-requisitos
Certifique-se de ter o Node.js instalado na sua máquina.

Passo 1: Instalar dependências
Na raiz do projeto, inicialize o Node e instale as dependências de desenvolvimento do TypeScript:

Bash
npm init -y
 # Notificação — Padrão Factory Method

Este repositório demonstra a aplicação do padrão de projeto **Factory Method** em Pedidos.


## Estrutura de Pastas

```text
src/
├── abstract/
├── class/
├── interface/padrao_projeto_software/padrao_factory_method
└── index.ts
```

## Requisitos

- Node.js (v14+ recomendado)

## Instalação

Na raiz do projeto:

```bash
npm init -y
npm install -D typescript @types/node tsx
npx tsc --init
```

Verifique `tsconfig.json` para garantir compatibilidade CommonJS. Remova ou defina `"verbatimModuleSyntax": false` se presente.

## Execução

```bash
tsx watch src/index.ts
```

Sugestão: adicione um script em `package.json`:

```json
{
    "scripts": {
        "dev": "tsx watch src/index.ts"
    }
}
```