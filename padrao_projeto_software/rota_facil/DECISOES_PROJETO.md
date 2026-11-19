# Decisões de Projeto — RotaFácil

## 1. Funcionalidades Implementadas
- [x] Cadastro de encomendas (com prévia em tempo real de frete, prazo e composição detalhada)
- [x] Listagem / consulta de encomendas (com filtros por status e modalidade, busca por código/cliente/destino e resumo do dia)
- [x] Atualização de status (transições controladas: `Pendente` → `Em rota` → `Entregue`, além de `Cancelada` quando permitido)
- [x] Regras / ações implementadas: cálculo variável e componível de frete/prazo por modalidade e adicionais (`Seguro`, `Frágil`, `Urgência`) via **Decorator**; validação de transições de status via **State**; disparo automático de **Log de Auditoria** e **Simulação de Notificação ao Cliente (WhatsApp/SMS)** via **Observer** em toda criação e mudança de status.

## 2. Como Executar e Testar
- **Passos para rodar a API:**
  1. Acesse a pasta `api/`: `cd api`
  2. Instale as dependências: `npm install`
  3. Inicie o servidor: `npm run dev` (disponível em `http://localhost:3001/api`; cria automaticamente `api/data/encomendas.json` com 4 encomendas de exemplo).
- **Passos para rodar a Web:**
  1. Em outro terminal, acesse a pasta `web/`: `cd web`
  2. Instale as dependências: `npm install`
  3. Inicie o Expo Web: `npm run web` (ou `npm run web:offline` em ambiente sem acesso à internet) e abra `http://localhost:8081`.
- **Roteiro rápido de teste (2 a 3 passos para validar o fluxo):**
  1. Na aba **+ Nova Encomenda**, preencha os dados, alterne modalidade e adicionais (`Seguro`, `Frágil`, `Urgência`) observando o recálculo em tempo real na prévia, e clique em **Cadastrar Encomenda**.
  2. Na aba **Despachos do Dia**, localize a encomenda criada (usando busca ou filtros), clique em **Ver composição do frete** e avance o status clicando em **Iniciar Rota** e depois em **Confirmar Entrega** (validando que após `Entregue` não há novas transições).
  3. Na aba **Central de Eventos**, alterne entre **Log de Auditoria** e **Notificações ao Cliente** para confirmar que cada criação e mudança de status gerou os registros automaticamente.

## 3. Padrões de Projeto Escolhidos (3 padrões)

### Padrão 1: Decorator (Estrutural)
- **Onde foi aplicado:** Camada **API**, nos arquivos `api/src/patterns/decorator/ICalculoFrete.ts`, `FreteBase.ts`, `FreteDecorator.ts`, `SeguroDecorator.ts`, `EmbalagemFragilDecorator.ts`, `UrgenciaDecorator.ts` e `montarCalculadoraFrete.ts` (consumido por `EncomendaService.ts` nos endpoints `/api/encomendas/simular` e `POST /api/encomendas`, e exibido na camada **Web** em `EncomendaForm.tsx` e `EncomendaCard.tsx`).
- **Problema / variação que resolve:** Na RotaFácil, além da modalidade base (`Padrão`, `Expressa`, `Balcão`), uma encomenda pode combinar zero, um ou vários serviços extras (`Seguro de Carga`, `Embalagem Frágil`, `Prioridade/Urgência`), que alteram simultaneamente a taxa final, o prazo de entrega e o detalhamento discriminado do frete.
- **Por que essa escolha (e não um `if/else` ou código direto)?:** Com herança estática haveria explosão combinatória de subclasses (ex.: `FreteExpressoComSeguroEFragil`), e com blocos `if/else` em uma única função toda nova regra de adicional exigiria alterar e retestar a lógica central de cálculo. O **Decorator** permite empilhar comportamentos dinamicamente em tempo de execução, mantendo cada regra isolada em sua própria classe e respeitando o Princípio Aberto/Fechado (OCP).

### Padrão 2: State (Comportamental)
- **Onde foi aplicado:** Camada **API**, nos arquivos `api/src/patterns/state/IEstadoEncomenda.ts`, `EstadoPendente.ts`, `EstadoEmRota.ts`, `EstadoEntregue.ts`, `EstadoCancelada.ts` e `ContextoEstadoEncomenda.ts` (consumido por `EncomendaService.ts` no endpoint `PATCH /api/encomendas/:id/status` e exposto como `transicoesPermitidas` para os botões contextuais de `EncomendaCard.tsx` na camada **Web**).
- **Problema / variação que resolve:** O ciclo de vida de uma encomenda possui regras rígidas de transição: uma encomenda `PENDENTE` não pode pular diretamente para `ENTREGUE`, e encomendas em estados finais (`ENTREGUE` ou `CANCELADA`) não podem sofrer novas alterações.
- **Por que essa escolha:** Em vez de espalhar múltiplos `if/else` ou `switch` aninhados verificando `statusAtual` versus `novoStatus` no serviço, cada estado concreto encapsula exatamente o que é permitido ou proibido a partir dele. Isso elimina condicionais frágeis, centraliza mensagens de erro coerentes por estado e facilita adicionar futuros estados (como `AGUARDANDO_RETIRADA` ou `DEVOLVIDA`) sem modificar os demais.

### Padrão 3: Observer (Comportamental)
- **Onde foi aplicado:** Camada **API**, nos arquivos `api/src/patterns/observer/IEncomendaObserver.ts`, `EncomendaEventSubject.ts`, `AuditoriaObserver.ts` e `NotificacaoClienteObserver.ts` (inscritos e acionados por `EncomendaService.ts` na criação e na atualização de status, com visualização em tempo real na camada **Web** em `EventosPanel.tsx`).
- **Problema / variação que resolve:** Sempre que uma encomenda é cadastrada ou tem seu status alterado, múltiplas ações colaterais precisam ser executadas automaticamente — neste projeto, o registro de histórico de auditoria e o disparo simulado de notificação ao cliente (WhatsApp/SMS).
- **Por que essa escolha:** Acoplar diretamente a lógica de auditoria e de envio de notificações dentro dos métodos de cadastro e atualização de status tornaria o `EncomendaService` inchado e rígido. Com o **Observer**, o serviço apenas publica um `EventoEncomenda` no `EncomendaEventSubject`, ficando totalmente desacoplado de quantos e quais reagentes existem; novos ouvintes (ex.: webhook externo, alerta de atraso ou atualização de BI) podem ser inscritos sem alterar o fluxo principal.
