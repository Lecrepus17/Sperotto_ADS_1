import {
  ACOES_PADRAO,
  AGENTES_PADRAO,
  AMULETOS_PADRAO,
  CRIATURAS_PADRAO,
  REGRAS_PADRAO,
} from './data/presetsOrdem';
import {
  AmuletoCustomDecorator,
  AmuletoDeForca,
} from './patterns/decorator/AmuletoCustomDecorator';
import { EntidadeFactory } from './patterns/factory/EntidadeFactory';
import { MestreDeJogo } from './patterns/observer/MestreDeJogo';
import { BattleLogger } from './patterns/singleton/BattleLogger';
import { AcaoOrdemStrategy } from './patterns/strategy/AcaoOrdemStrategy';
import { ELEMENTOS_ORDEM } from './types/Elementos';

console.log('===================================================================');
console.log('👁️  SIMULADOR ORDEM PARANORMAL RPG - EXECUÇÃO CLI (5 PADRÕES)  👁️');
console.log('===================================================================\n');

const logger = BattleLogger.getInstancia();
logger.limpar();

const mestre = new MestreDeJogo();

// 1. Factory Method: Criando equipe de Agentes e grupo de Criaturas
let joubert = EntidadeFactory.criarDeConfig(AGENTES_PADRAO[1], ACOES_PADRAO); // Combatente (Sangue)
let dante = EntidadeFactory.criarDeConfig(AGENTES_PADRAO[2], ACOES_PADRAO); // Ocultista (Morte)

let zumbiSangue = EntidadeFactory.criarDeConfig(CRIATURAS_PADRAO[0], ACOES_PADRAO); // Zumbi de Sangue
let anjoDecaido = EntidadeFactory.criarDeConfig(CRIATURAS_PADRAO[4], ACOES_PADRAO); // Anjo Decaído (Conhecimento)

// 2. Observer: Inscrevendo o Mestre de Jogo em todos os combatentes
[joubert, dante, zumbiSangue, anjoDecaido].forEach((ent) => ent.inscrever(mestre));

const regrasSimulacao = {
  ...REGRAS_PADRAO,
  usarTesteAcerto: true,
};

console.log('--- TURNO 1: Ataque com Katana (Strategy) ---');
joubert.atacar(zumbiSangue, regrasSimulacao);

console.log('\n--- TURNO 2: Opressão Elemental (Morte 💀 oprime Sangue 🩸 -> 2x Dano) ---');
const ritualDecadencia = ACOES_PADRAO.find((a) => a.id === 'acao_decadencia')!;
dante.setEstrategia(new AcaoOrdemStrategy(ritualDecadencia));
dante.atacar(zumbiSangue, regrasSimulacao);

console.log('\n--- TURNO 3: Decorator (Equipando Amuleto de Força + Maldição Lancinante de Sangue) ---');
joubert = new AmuletoDeForca(joubert);
joubert = new AmuletoCustomDecorator(joubert, AMULETOS_PADRAO[1]); // +1d8 Sangue +2 fixo

const ritualDescarnar = ACOES_PADRAO.find((a) => a.id === 'acao_descarnar')!;
joubert.setEstrategia(new AcaoOrdemStrategy(ritualDescarnar));
// Sangue oprime Conhecimento (Anjo Decaído)!
const resOpressao = joubert.atacar(anjoDecaido, regrasSimulacao);

console.log('\n--- RAIO-X DO ÚLTIMO ATAQUE ---');
console.log(
  `Ação: ${resOpressao.acaoEmoji} ${resOpressao.acaoNome} (${ELEMENTOS_ORDEM[resOpressao.elementoAtaque].nome})`
);
console.log(
  `Teste de Ataque: [${resOpressao.dadosAcerto.join(', ')}] -> Maior ${resOpressao.maiorDadoAcerto} + ${resOpressao.bonusAcertoTotal} = ${resOpressao.totalAcerto} vs Defesa ${resOpressao.defesaAlvo}`
);
console.log(
  `Dados da Arma/Ritual: [${resOpressao.dadosBaseRolados.map((d) => `d${d.faces}:${d.valor}`).join(', ')}] (Soma: ${resOpressao.somaDadosArma})`
);
console.log(
  `Amuletos (Decorator): +${resOpressao.somaBonusFixoDecorators} fixo | +${resOpressao.somaDadosDecorators} em dados extras`
);
console.log(
  `Subtotal: ${resOpressao.subtotalAntesElemento} -> Multiplicador Elemental (×${resOpressao.multiplicadorElementalAplicado}) = ${resOpressao.subtotalAposElemento}`
);
console.log(
  `Redução de Dano (RD): -${resOpressao.rdAlvoAplicada} => DANO FINAL: ${resOpressao.valorFinal}`
);

console.log('\n--- TURNO 4: Finalizando Zumbi de Sangue (Disparo do Observer) ---');
dante.atacar(zumbiSangue, { ...regrasSimulacao, usarTesteAcerto: false });
if (zumbiSangue.estaVivo()) {
  dante.atacar(zumbiSangue, { ...regrasSimulacao, usarTesteAcerto: false });
}

console.log('\n--- RESUMO DE LOGS DO SINGLETON (BattleLogger) ---');
console.log(`Total de eventos registrados: ${logger.getLogs().length}`);
