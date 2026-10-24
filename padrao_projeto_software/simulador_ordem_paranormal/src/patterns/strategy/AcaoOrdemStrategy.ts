import {
  calcularRelacaoElemental,
  ConfigAcao,
  ConfigRegrasMesa,
  DadoIndividual,
  ELEMENTOS_ORDEM,
  ElementoOrdem,
  ResultadoAcao,
  rolarDado,
} from '../../types/Elementos';
import { BattleLogger } from '../singleton/BattleLogger';
import { CombatenteAlvo, EstrategiaAtaque } from './EstrategiaAtaque';

export class AcaoOrdemStrategy implements EstrategiaAtaque {
  constructor(private readonly config: ConfigAcao) {}

  public getTipo(): ElementoOrdem {
    return this.config.elemento;
  }

  public getConfig(): ConfigAcao {
    return this.config;
  }

  public executar(
    atacante: CombatenteAlvo,
    alvo: CombatenteAlvo,
    regras: ConfigRegrasMesa
  ): ResultadoAcao {
    const logger = BattleLogger.getInstancia();
    const decorators = atacante.avaliarDecoratorsParaAtaque();

    // 1. Custos de PE e SAN
    let custoPEPago = 0;
    let custoSANPago = 0;
    if (regras.gastarPEeSAN) {
      if (this.config.custoPE > 0) {
        atacante.gastarPE(this.config.custoPE);
        custoPEPago = this.config.custoPE;
      }
      if (this.config.custoSAN > 0) {
        atacante.gastarSanidade(this.config.custoSAN);
        custoSANPago = this.config.custoSAN;
      }
    }

    // 2. Verificar se é ação de Suporte / Cura / Buff
    if (
      this.config.efeito === 'CURA_PV' ||
      this.config.efeito === 'RECUPERAR_PE_SAN' ||
      this.config.efeito === 'BUFF_DEFESA_RD'
    ) {
      const dadosBase: DadoIndividual[] = [];
      for (let i = 0; i < Math.max(1, this.config.qtdDados); i++) {
        dadosBase.push({
          faces: this.config.faceDado,
          valor: rolarDado(this.config.faceDado),
          origem: 'BASE',
        });
      }
      const somaDados = dadosBase.reduce((acc, d) => acc + d.valor, 0);
      const valorFinal = Math.max(1, somaDados + this.config.bonusFixo);

      let resumoTexto = '';
      if (this.config.efeito === 'CURA_PV') {
        alvo.curarVida(valorFinal);
        resumoTexto = `${atacante.getEmoji()} ${atacante.getNome()} usou ${this.config.nome} em ${alvo.getNome()}: curou +${valorFinal} PV (${this.config.qtdDados}d${this.config.faceDado} [${dadosBase.map((d) => d.valor).join(', ')}] + ${this.config.bonusFixo}).`;
      } else if (this.config.efeito === 'RECUPERAR_PE_SAN') {
        alvo.recuperarPEeSAN(valorFinal);
        resumoTexto = `${atacante.getEmoji()} ${atacante.getNome()} usou ${this.config.nome}: recuperou +${valorFinal} PE e +${valorFinal} SAN (${this.config.qtdDados}d${this.config.faceDado} [${dadosBase.map((d) => d.valor).join(', ')}] + ${this.config.bonusFixo}).`;
      } else {
        const bonusRD = Math.max(1, Math.floor(valorFinal / 2));
        alvo.aplicarBuffDefesaERD(valorFinal, bonusRD);
        resumoTexto = `${atacante.getEmoji()} ${atacante.getNome()} ativou ${this.config.nome} em ${alvo.getNome()}: +${valorFinal} Defesa e +${bonusRD} RD!`;
      }

      const resultadoSuporte: ResultadoAcao = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString(),
        atacanteNome: atacante.getNome(),
        atacanteEmoji: atacante.getEmoji(),
        alvoNome: alvo.getNome(),
        alvoEmoji: alvo.getEmoji(),
        acaoNome: this.config.nome,
        acaoEmoji: this.config.emoji,
        elementoAtaque: this.config.elemento,
        elementoAlvo: alvo.getElemento(),
        efeito: this.config.efeito,
        usouTesteAcerto: false,
        dadosAcerto: [],
        maiorDadoAcerto: 0,
        bonusAcertoTotal: 0,
        totalAcerto: 0,
        defesaAlvo: alvo.getDefesaTotal(),
        acertou: true,
        critico: false,
        margemCriticoUsada: this.config.margemCritico,
        multiplicadorCriticoUsado: this.config.multiplicadorCritico,
        dadosBaseRolados: dadosBase,
        dadosCriticoRolados: [],
        somaDadosArma: somaDados,
        bonusFixoAcao: this.config.bonusFixo,
        decoratorsAplicados: [],
        somaBonusFixoDecorators: 0,
        somaDadosDecorators: 0,
        subtotalAntesElemento: valorFinal,
        relacaoElemental: 'NEUTRO',
        multiplicadorElementalAplicado: 1,
        subtotalAposElemento: valorFinal,
        rdAlvoAplicada: 0,
        valorFinal,
        custoPEPago,
        custoSANPago,
        resumoTexto,
      };

      logger.registrarResultado(resultadoSuporte);
      return resultadoSuporte;
    }

    // 3. Rolagem de Teste de Ataque (Xd20 pegando o maior)
    const qtdD20 = Math.max(1, atacante.getDadosAtributoAcerto());
    const dadosAcerto: number[] = [];
    for (let i = 0; i < qtdD20; i++) {
      dadosAcerto.push(rolarDado(20));
    }
    const maiorDadoAcerto = Math.max(...dadosAcerto);
    const bonusAcertoDecorators = decorators.reduce((acc, d) => acc + d.bonusAcerto, 0);
    const bonusAcertoTotal = this.config.bonusAcerto + bonusAcertoDecorators;
    const totalAcerto = maiorDadoAcerto + bonusAcertoTotal;
    const defesaAlvo = alvo.getDefesaTotal();

    const critico = maiorDadoAcerto >= this.config.margemCritico;
    const acertou = regras.usarTesteAcerto
      ? maiorDadoAcerto === 20 || critico || totalAcerto >= defesaAlvo
      : true;

    if (!acertou) {
      const resumoErro = `${atacante.getEmoji()} ${atacante.getNome()} tentou ${this.config.nome} contra ${alvo.getNome()}, mas ERROU! (${qtdD20}d20: [${dadosAcerto.join(', ')}] -> Maior: ${maiorDadoAcerto} + ${bonusAcertoTotal} = ${totalAcerto} vs Defesa ${defesaAlvo}).`;
      const resultadoErro: ResultadoAcao = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString(),
        atacanteNome: atacante.getNome(),
        atacanteEmoji: atacante.getEmoji(),
        alvoNome: alvo.getNome(),
        alvoEmoji: alvo.getEmoji(),
        acaoNome: this.config.nome,
        acaoEmoji: this.config.emoji,
        elementoAtaque: this.config.elemento,
        elementoAlvo: alvo.getElemento(),
        efeito: this.config.efeito,
        usouTesteAcerto: regras.usarTesteAcerto,
        dadosAcerto,
        maiorDadoAcerto,
        bonusAcertoTotal,
        totalAcerto,
        defesaAlvo,
        acertou: false,
        critico: false,
        margemCriticoUsada: this.config.margemCritico,
        multiplicadorCriticoUsado: this.config.multiplicadorCritico,
        dadosBaseRolados: [],
        dadosCriticoRolados: [],
        somaDadosArma: 0,
        bonusFixoAcao: this.config.bonusFixo,
        decoratorsAplicados: decorators,
        somaBonusFixoDecorators: 0,
        somaDadosDecorators: 0,
        subtotalAntesElemento: 0,
        relacaoElemental: 'NEUTRO',
        multiplicadorElementalAplicado: 1,
        subtotalAposElemento: 0,
        rdAlvoAplicada: 0,
        valorFinal: 0,
        custoPEPago,
        custoSANPago,
        resumoTexto: resumoErro,
      };
      logger.registrarResultado(resultadoErro);
      return resultadoErro;
    }

    // 4. Rolagem dos Dados de Dano Base + Dados de Crítico
    const dadosBaseRolados: DadoIndividual[] = [];
    for (let i = 0; i < Math.max(1, this.config.qtdDados); i++) {
      dadosBaseRolados.push({
        faces: this.config.faceDado,
        valor: rolarDado(this.config.faceDado),
        origem: 'BASE',
      });
    }

    const dadosCriticoRolados: DadoIndividual[] = [];
    const multCrit = Math.max(2, this.config.multiplicadorCritico);
    if (critico) {
      const qtdExtrasCritico = (multCrit - 1) * Math.max(1, this.config.qtdDados);
      for (let i = 0; i < qtdExtrasCritico; i++) {
        dadosCriticoRolados.push({
          faces: this.config.faceDado,
          valor: rolarDado(this.config.faceDado),
          origem: 'CRITICO',
        });
      }
    }

    const somaDadosArma =
      dadosBaseRolados.reduce((acc, d) => acc + d.valor, 0) +
      dadosCriticoRolados.reduce((acc, d) => acc + d.valor, 0);

    // 5. Soma de Bônus Fixo + Decorators (Amuletos e Maldições)
    const bonusFixoAcao = this.config.bonusFixo;
    const somaBonusFixoDecorators = decorators.reduce(
      (acc, d) => acc + d.bonusFixoDano,
      0
    );
    const somaDadosDecorators = decorators.reduce(
      (acc, d) => acc + d.subtotalDadosExtras,
      0
    );

    const subtotalAntesElemento =
      somaDadosArma +
      bonusFixoAcao +
      somaBonusFixoDecorators +
      somaDadosDecorators;

    // 6. Ciclo Elemental de Ordem Paranormal (Opressão 2x / Resistência ½)
    const relacaoElemental = calcularRelacaoElemental(
      this.config.elemento,
      alvo.getElemento()
    );
    let multiplicadorElementalAplicado = 1;
    if (relacaoElemental === 'OPRIME') {
      multiplicadorElementalAplicado = regras.multiplicadorVulnerabilidade;
    } else if (relacaoElemental === 'RESISTE') {
      multiplicadorElementalAplicado = regras.multiplicadorResistencia;
    }

    const subtotalAposElemento = Math.max(
      1,
      Math.floor(subtotalAntesElemento * multiplicadorElementalAplicado)
    );

    // 7. Redução de Dano (RD) - Medo ignora RD comum
    const rdAlvoAplicada =
      regras.aplicarRD && this.config.elemento !== 'MEDO'
        ? alvo.getRDTotal()
        : 0;

    const valorFinal = Math.max(0, subtotalAposElemento - rdAlvoAplicada);

    // 8. Aplica o dano no alvo (PV ou Sanidade)
    const tipoDanoLabel = this.config.efeito === 'DANO_SAN' ? 'SAN' : 'PV';
    const elemMeta = ELEMENTOS_ORDEM[this.config.elemento];
    const elemAlvoMeta = ELEMENTOS_ORDEM[alvo.getElemento()];

    const partesCalculo: string[] = [
      `Dados ${this.config.qtdDados}d${this.config.faceDado}: [${dadosBaseRolados.map((d) => d.valor).join('+')}]`,
    ];
    if (critico && dadosCriticoRolados.length > 0) {
      partesCalculo.push(
        `Crítico x${multCrit}: +[${dadosCriticoRolados.map((d) => d.valor).join('+')}]`
      );
    }
    if (bonusFixoAcao !== 0) {
      partesCalculo.push(`Bônus +${bonusFixoAcao}`);
    }
    if (somaBonusFixoDecorators > 0 || somaDadosDecorators > 0) {
      partesCalculo.push(
        `Amuletos +${somaBonusFixoDecorators + somaDadosDecorators}`
      );
    }
    if (relacaoElemental === 'OPRIME') {
      partesCalculo.push(
        `Opressão ${elemMeta.nome}>${elemAlvoMeta.nome} (×${multiplicadorElementalAplicado})`
      );
    } else if (relacaoElemental === 'RESISTE') {
      partesCalculo.push(
        `Resistência ${elemAlvoMeta.nome} (×${multiplicadorElementalAplicado})`
      );
    }
    if (rdAlvoAplicada > 0) {
      partesCalculo.push(`RD -${rdAlvoAplicada}`);
    }

    const tagCritico = critico ? ` 🔥 CRÍTICO (d20=${maiorDadoAcerto})!` : '';
    const resumoTexto = `${atacante.getEmoji()} ${atacante.getNome()} usou ${this.config.emoji} ${this.config.nome} em ${alvo.getNome()}:${tagCritico} ${valorFinal} de dano (${tipoDanoLabel}) [${partesCalculo.join(' | ')}].`;

    const resultado: ResultadoAcao = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toLocaleTimeString(),
      atacanteNome: atacante.getNome(),
      atacanteEmoji: atacante.getEmoji(),
      alvoNome: alvo.getNome(),
      alvoEmoji: alvo.getEmoji(),
      acaoNome: this.config.nome,
      acaoEmoji: this.config.emoji,
      elementoAtaque: this.config.elemento,
      elementoAlvo: alvo.getElemento(),
      efeito: this.config.efeito,
      usouTesteAcerto: regras.usarTesteAcerto,
      dadosAcerto,
      maiorDadoAcerto,
      bonusAcertoTotal,
      totalAcerto,
      defesaAlvo,
      acertou: true,
      critico,
      margemCriticoUsada: this.config.margemCritico,
      multiplicadorCriticoUsado: multCrit,
      dadosBaseRolados,
      dadosCriticoRolados,
      somaDadosArma,
      bonusFixoAcao,
      decoratorsAplicados: decorators,
      somaBonusFixoDecorators,
      somaDadosDecorators,
      subtotalAntesElemento,
      relacaoElemental,
      multiplicadorElementalAplicado,
      subtotalAposElemento,
      rdAlvoAplicada,
      valorFinal,
      custoPEPago,
      custoSANPago,
      resumoTexto,
    };

    logger.registrarResultado(resultado);

    if (this.config.efeito === 'DANO_SAN') {
      alvo.receberDanoSanidade(valorFinal);
    } else {
      alvo.receberDano(valorFinal);
    }

    return resultado;
  }
}
