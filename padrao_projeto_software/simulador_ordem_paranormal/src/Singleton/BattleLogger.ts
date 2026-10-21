import { ResultadoAcao } from '../types/Elementos';

export type CategoriaLog =
  | 'ATAQUE'
  | 'CRITICO'
  | 'OPRESSAO'
  | 'RESISTENCIA'
  | 'CURA_BUFF'
  | 'MESTRE'
  | 'SISTEMA';

export interface RegistroLog {
  id: string;
  turno: number;
  categoria: CategoriaLog;
  mensagem: string;
  detalhe?: ResultadoAcao;
}

export class BattleLogger {
  private static instancia: BattleLogger | null = null;
  private logs: RegistroLog[] = [];
  private resultados: ResultadoAcao[] = [];
  private contadorEvento: number = 0;

  private constructor() {}

  public static getInstancia(): BattleLogger {
    if (!BattleLogger.instancia) {
      BattleLogger.instancia = new BattleLogger();
    }
    return BattleLogger.instancia;
  }

  public log(
    mensagem: string,
    categoria: CategoriaLog = 'SISTEMA',
    detalhe?: ResultadoAcao
  ): void {
    this.contadorEvento += 1;
    const textoFormatado = `[#${this.contadorEvento}] ${mensagem}`;
    const registro: RegistroLog = {
      id: `${Date.now()}-${this.contadorEvento}-${Math.random().toString(36).slice(2, 6)}`,
      turno: this.contadorEvento,
      categoria,
      mensagem: textoFormatado,
      detalhe,
    };
    this.logs.push(registro);
    if (detalhe) {
      this.resultados.push(detalhe);
    }
    console.log(textoFormatado);
  }

  public registrarResultado(resultado: ResultadoAcao): void {
    let categoria: CategoriaLog = 'ATAQUE';
    if (resultado.efeito === 'CURA_PV' || resultado.efeito === 'RECUPERAR_PE_SAN' || resultado.efeito === 'BUFF_DEFESA_RD') {
      categoria = 'CURA_BUFF';
    } else if (resultado.critico) {
      categoria = 'CRITICO';
    } else if (resultado.relacaoElemental === 'OPRIME') {
      categoria = 'OPRESSAO';
    } else if (resultado.relacaoElemental === 'RESISTE') {
      categoria = 'RESISTENCIA';
    }
    this.log(resultado.resumoTexto, categoria, resultado);
  }

  public getLogs(): string[] {
    return this.logs.map((l) => l.mensagem);
  }

  public getRegistrosCompletos(): RegistroLog[] {
    return [...this.logs];
  }

  public getUltimoResultado(): ResultadoAcao | null {
    if (this.resultados.length === 0) return null;
    return this.resultados[this.resultados.length - 1] ?? null;
  }

  public getHistoricoResultados(): ResultadoAcao[] {
    return [...this.resultados];
  }

  public limpar(): void {
    this.logs = [];
    this.resultados = [];
    this.contadorEvento = 0;
  }
}
