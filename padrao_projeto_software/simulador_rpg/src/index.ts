import { AmuletoDeForca } from "./Decorator/AmuletoDeForca";
import { EntidadeFactory } from "./Factory/EntidadeFactory";
import { TipoEntidadeEnum } from "./Factory/TipoEntidadeEnum";
import { MestreDeJogo } from "./Observer/MestreDeJogo";
import { AtaqueFisico } from "./Strategy/AtaqueFisico";
import { AtaqueParanormal } from "./Strategy/Strategy";

// 1. Criando estratégias
const ataqueFisico = new AtaqueFisico();
const ritual = new AtaqueParanormal();

// 2. Criando entidades (Factory Method)
let agente = EntidadeFactory.criarEntidade(TipoEntidadeEnum.AGENTE, "Investigador", 50, ataqueFisico);
const monstro = EntidadeFactory.criarEntidade(TipoEntidadeEnum.CRIATURA, "Zumbi de Sangue", 30, ritual);

// 3. Adicionando observador (Observer)
const mestre = new MestreDeJogo();
(agente as any).inscrever(mestre);
(monstro as any).inscrever(mestre);

// 4. Aplicando equipamento dinamicamente (Decorator)
agente = new AmuletoDeForca(agente);

// 5. Simulação de Combate
console.log("--- INÍCIO DO COMBATE ---");
const danoAgente = agente.atacar();
monstro.receberDano(danoAgente);

const danoMonstro = monstro.atacar();
agente.receberDano(danoMonstro);