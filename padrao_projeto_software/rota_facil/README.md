# RotaFácil — Sistema de Gestão de Encomendas e Despachos Urbanos

Sistema web integrado (**API REST + Frontend Web em Expo**) desenvolvido para substituir o controle manual em planilhas da **RotaFácil**, aplicando **exatamente 3 padrões de projeto**:

- **Decorator (Estrutural):** composição dinâmica do cálculo de frete e prazo a partir da modalidade base (`Padrão`, `Expressa`, `Retirada no Balcão`) somada a adicionais combináveis (`Seguro de Carga`, `Embalagem Frágil`, `Prioridade / Urgência`).
- **State (Comportamental):** controle estrito do ciclo de vida das encomendas (`PENDENTE` → `EM_ROTA` → `ENTREGUE` ou `CANCELADA`), bloqueando transições inválidas.
- **Observer (Comportamental):** disparo automático de reações na criação e em mudanças de status, alimentando o **Log de Auditoria** e a **Simulação de Notificações ao Cliente** (WhatsApp/SMS).

---

## Estrutura do Projeto

```text
rota_facil/
├── api/                         # Backend Node.js + Express + TypeScript
│   ├── data/encomendas.json     # Persistência local (gerada automaticamente com dados iniciais)
│   └── src/
│       ├── patterns/
│       │   ├── decorator/       # ICalculoFrete, FreteBase, FreteDecorator e Decorators concretos
│       │   ├── state/           # IEstadoEncomenda, estados concretos e ContextoEstadoEncomenda
│       │   └── observer/        # IEncomendaObserver, EncomendaEventSubject e Observers concretos
│       ├── repositories/        # Persistência em arquivo JSON local
│       ├── routes/              # Endpoints REST (/api/encomendas, /api/eventos)
│       ├── services/            # Orquestração das regras de negócio
│       ├── types/               # Contratos TypeScript
│       └── server.ts            # Inicialização da API (porta 3001)
├── web/                         # Frontend Web em Expo (React Native Web + TypeScript)
│   ├── src/
│   │   ├── components/          # EncomendaForm, EncomendaCard, EventosPanel
│   │   ├── services/            # Cliente HTTP integrado à API
│   │   ├── styles/              # Tema e formatação
│   │   └── types/               # Tipos compartilhados
│   └── App.tsx                  # Interface principal do operador
├── DECISOES_PROJETO.md          # Documento de decisões arquiteturais e padrões escolhidos
└── README.md
```

---

## Pré-requisitos

- **Node.js** 18+ e **npm** instalados.

---

## Como Executar

### 1. Subir a API (`api/`)

```bash
cd api
npm install
npm run dev
```

A API ficará disponível em `http://localhost:3001/api`.  
Na primeira execução, o arquivo `api/data/encomendas.json` é criado automaticamente com **4 encomendas de exemplo** em diferentes status e modalidades.

### 2. Subir a Interface Web (`web/`)

Em outro terminal:

```bash
cd web
npm install
npm run web
```

> Caso esteja em ambiente sem internet para o Expo CLI, utilize `npm run web:offline`.

A aplicação abrirá no navegador (normalmente em `http://localhost:8081`).

---

## Roteiro Rápido de Teste

### Fluxo pela Interface Web

1. **Listagem e Filtros:** Na aba **Despachos do Dia**, visualize as encomendas iniciais, teste a busca por código/cliente (ex.: `RF-2026-001`) e os filtros por status e modalidade. Clique em **Ver composição do frete** em um card para conferir o detalhamento calculado pelo padrão **Decorator**.
2. **Cadastro com Simulação em Tempo Real:** Acesse **+ Nova Encomenda**, informe os dados do cliente/rota e alterne modalidade (`Padrão`, `Expressa`, `Balcão`) e adicionais (`Seguro de Carga`, `Embalagem Frágil`, `Prioridade / Urgência`). Observe a **Prévia em Tempo Real** recalculando taxa e prazo e clique em **Cadastrar Encomenda**.
3. **Transição de Status (State) e Eventos (Observer):** No card da encomenda recém-criada (`Pendente`), clique em **Iniciar Rota** e depois em **Confirmar Entrega**. Note que encomendas finalizadas (`Entregue` ou `Cancelada`) não exibem mais transições. Em seguida, abra a aba **Central de Eventos** e confirme os novos registros em **Log de Auditoria** e **Notificações ao Cliente**.

### Exemplos de Requisições na API (opcional)

```bash
# 1. Simular frete com Decorators (Expressa + Seguro + Urgência)
curl -X POST http://localhost:3001/api/encomendas/simular \
  -H "Content-Type: application/json" \
  -d '{"modalidade":"EXPRESSA","pesoKg":3,"valorDeclarado":400,"adicionais":["SEGURO","URGENCIA"]}'

# 2. Cadastrar encomenda (dispara Observer de Auditoria e Notificação)
curl -X POST http://localhost:3001/api/encomendas \
  -H "Content-Type: application/json" \
  -d '{"cliente":"João Pedro","contatoCliente":"(51) 99999-1234","origem":"Centro","destino":"Bairro Bela Vista, 210","pesoKg":2.5,"valorDeclarado":300,"modalidade":"EXPRESSA","adicionais":["SEGURO","FRAGIL"]}'

# 3. Testar bloqueio do padrão State (tentar entregar direto de PENDENTE -> retorna HTTP 400)
curl -X PATCH http://localhost:3001/api/encomendas/enc-1002/status \
  -H "Content-Type: application/json" \
  -d '{"status":"ENTREGUE"}'

# 4. Consultar eventos gerados pelo Observer
curl http://localhost:3001/api/eventos/auditoria
curl http://localhost:3001/api/eventos/notificacoes
```
