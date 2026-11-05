import { IAAgressiva } from "./bridge/IAAgressiva";
import { IADefensiva } from "./bridge/IADefensiva";
import { Soldado } from "./composite/Soldado";
import { Regimento } from "./composite/Regimento";

// 1. Instanciando os comportamentos de IA (Bridge)
const iaAgressiva = new IAAgressiva();
const iaDefensiva = new IADefensiva();

// 2. Criando Soldados individuais (Leaf do Composite) associados a uma IA
const s1 = new Soldado("Arqueiro Alpha", iaAgressiva);
const s2 = new Soldado("Guardião Beta", iaDefensiva);

// 3. Montando Estruturas Hierárquicas (Composite)
const pelotaoFrente = new Regimento("Pelotão de Choque");
pelotaoFrente.adicionar(s1);
pelotaoFrente.adicionar(s2);

const exercitoPrincipal = new Regimento("Exército Imperial");
exercitoPrincipal.adicionar(pelotaoFrente);
exercitoPrincipal.adicionar(new Soldado("Cavaleiro Real", iaAgressiva));

// 4. Teste de Ordem de Ataque no Exército Original
console.log("=== TESTE 1: EXÉRCITO ORIGINAL ===");
exercitoPrincipal.atacar();

// 5. Teste de Clonagem Profunda (Prototype)
console.log("\n=== TESTE 2: EXÉRCITO CLONADO (REFORÇO) ===");
const exercitoReforco = exercitoPrincipal.clone();
exercitoReforco.atacar();

// 6. Teste de Independência da Clonagem (Deep Copy) e Remoção no Composite
console.log("\n=== TESTE 3: REMOÇÃO E INDEPENDÊNCIA (DEEP COPY) ===");
pelotaoFrente.remover(s2);
console.log("-> Removido 'Guardião Beta' do Pelotão de Choque original.");

const reforcoExtra = new Soldado("Berserker Lendário", iaAgressiva);
exercitoReforco.adicionar(reforcoExtra);
console.log("-> Adicionado 'Berserker Lendário' apenas ao Exército Clonado.");

console.log("\n--- Novo Ataque do Exército Original (sem Guardião Beta) ---");
exercitoPrincipal.atacar();

console.log("\n--- Novo Ataque do Exército Clonado (intacto e com Berserker Lendário) ---");
exercitoReforco.atacar();

// 7. Teste de Operações Inválidas na Folha (Leaf)
console.log("\n=== TESTE 4: RESTRIÇÕES DO NÓ FOLHA (SOLDADO) ===");
try {
  s1.adicionar(new Soldado("Recruta", iaDefensiva));
} catch (error: any) {
  console.log(`[OK] Exceção capturada em adicionar(): ${error.message}`);
}

try {
  s1.remover(s2);
} catch (error: any) {
  console.log(`[OK] Exceção capturada em remover(): ${error.message}`);
}
