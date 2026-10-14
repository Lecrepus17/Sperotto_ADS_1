**Descrição do Projeto:**
Simulador de combate de RPG de mesa focado na interação entre Agentes e Criaturas. O sistema resolve a complexidade de instanciar diferentes tipos de personagens, gerenciar modificadores de equipamentos de forma escalável, alternar regras de dano e notificar eventos globais durante a partida sem acoplar a lógica de negócio.

**Instruções de Execução:**

1. Instale as dependências: `npm install`
2. Execute o projeto via terminal usando TSX: `npx tsx src/index.ts`

**Mapeamento dos 5 Padrões Aplicados:**

* **Singleton (Criacional)**
* **Onde foi aplicado:** `src/Singleton.ts` (`BattleLogger`).
* **Justificativa:** Necessário para garantir que uma classe tenha apenas uma única instância em toda a aplicação e fornecer um ponto de acesso global. Isso evita múltiplas aberturas de arquivos de log ou inconsistências no rastreamento de turnos.




* **Strategy (Comportamental)**
* **Onde foi aplicado:** `src/Strategy.ts` (`EstrategiaAtaque`, `AtaqueFisico`, `AtaqueParanormal`).
* **Justificativa:** Permite definir uma família de algoritmos, encapsular cada um deles e torná-los intercambiáveis. Facilita a alternância entre danos físicos e rituais sem usar cadeias extensas de `if/else`.




* **Observer (Comportamental)**
* **Onde foi aplicado:** `src/Observer.ts` (`MestreDeJogo` implementando `Observador`).
* **Justificativa:** Usado para definir uma dependência um-para-muitos entre objetos, de modo que quando um objeto muda de estado, todos os seus dependentes são notificados. Ideal para disparar alertas visuais assim que a vida de uma entidade chega a zero.




* **Factory Method (Criacional)**
* **Onde foi aplicado:** `src/Factory.ts` (`EntidadeFactory`).
* **Justificativa:** Escolhido para fornecer uma interface para criar objetos em uma classe mãe, mas permitir que as subclasses alterem o tipo de objetos que serão criados. Centraliza a geração de Agentes e Criaturas.




* **Decorator (Estrutural)**
* **Onde foi aplicado:** `src/Decorator.ts` (`EquipamentoDecorator`, `AmuletoDeForca`).
* **Justificativa:** Fundamental para adicionar responsabilidades e comportamentos a um objeto dinamicamente, sem alterar sua estrutura original e sem precisar recorrer à herança. Permite empilhar buffs temporários ou itens sem criar subclasses estáticas como `AgenteComAmuleto`.