import {
  ACOES_PADRAO,
  AGENTES_PADRAO,
  AMULETOS_PADRAO,
  CRIATURAS_PADRAO,
  REGRAS_PADRAO,
} from '../../data/presetsOrdem';
import {
  ConfigAcao,
  ConfigAmuletoDecorator,
  ConfigCombatente,
  ConfigRegrasMesa,
} from '../../types/Elementos';

const STORAGE_KEY = '@ordem_paranormal_simulador_v2_dados';

export interface BancoDadosOffline {
  versao: number;
  agentes: ConfigCombatente[];
  criaturas: ConfigCombatente[];
  acoes: ConfigAcao[];
  amuletos: ConfigAmuletoDecorator[];
  regras: ConfigRegrasMesa;
}

export class OfflineStorage {
  private static instancia: OfflineStorage | null = null;
  private dados: BancoDadosOffline;

  private constructor() {
    this.dados = this.carregarDoDispositivo();
  }

  public static getInstancia(): OfflineStorage {
    if (!OfflineStorage.instancia) {
      OfflineStorage.instancia = new OfflineStorage();
    }
    return OfflineStorage.instancia;
  }

  private criarPadrao(): BancoDadosOffline {
    return {
      versao: 2,
      agentes: AGENTES_PADRAO.map((a) => ({ ...a })),
      criaturas: CRIATURAS_PADRAO.map((c) => ({ ...c })),
      acoes: ACOES_PADRAO.map((ac) => ({ ...ac })),
      amuletos: AMULETOS_PADRAO.map((am) => ({ ...am })),
      regras: { ...REGRAS_PADRAO },
    };
  }

  private carregarDoDispositivo(): BancoDadosOffline {
    try {
      const storage = (globalThis as any)?.localStorage;
      if (storage && typeof storage.getItem === 'function') {
        const bruto = storage.getItem(STORAGE_KEY);
        if (bruto) {
          const parsed = JSON.parse(bruto) as Partial<BancoDadosOffline>;
          const padrao = this.criarPadrao();
          return {
            versao: 2,
            agentes: parsed.agentes?.length ? parsed.agentes : padrao.agentes,
            criaturas: parsed.criaturas?.length ? parsed.criaturas : padrao.criaturas,
            acoes: parsed.acoes?.length ? parsed.acoes : padrao.acoes,
            amuletos: parsed.amuletos?.length ? parsed.amuletos : padrao.amuletos,
            regras: parsed.regras ? { ...padrao.regras, ...parsed.regras } : padrao.regras,
          };
        }
      }
    } catch {
      // Fallback silencioso para memória em ambiente CLI ou restrito
    }
    return this.criarPadrao();
  }

  public salvarNoDispositivo(): void {
    try {
      const storage = (globalThis as any)?.localStorage;
      if (storage && typeof storage.setItem === 'function') {
        storage.setItem(STORAGE_KEY, JSON.stringify(this.dados));
      }
    } catch {
      // Ignora erro de quota no modo restrito
    }
  }

  public getDados(): BancoDadosOffline {
    return this.dados;
  }

  public getAgentes(): ConfigCombatente[] {
    return [...this.dados.agentes];
  }

  public getCriaturas(): ConfigCombatente[] {
    return [...this.dados.criaturas];
  }

  public getAcoes(): ConfigAcao[] {
    return [...this.dados.acoes];
  }

  public getAmuletos(): ConfigAmuletoDecorator[] {
    return [...this.dados.amuletos];
  }

  public getRegras(): ConfigRegrasMesa {
    return { ...this.dados.regras };
  }

  public salvarCombatente(combatente: ConfigCombatente): void {
    if (combatente.tipo === 'AGENTE') {
      const idx = this.dados.agentes.findIndex((a) => a.id === combatente.id);
      if (idx >= 0) {
        this.dados.agentes[idx] = { ...combatente };
      } else {
        this.dados.agentes.push({ ...combatente });
      }
    } else {
      const idx = this.dados.criaturas.findIndex((c) => c.id === combatente.id);
      if (idx >= 0) {
        this.dados.criaturas[idx] = { ...combatente };
      } else {
        this.dados.criaturas.push({ ...combatente });
      }
    }
    this.salvarNoDispositivo();
  }

  public removerCombatente(id: string, tipo: 'AGENTE' | 'CRIATURA'): void {
    if (tipo === 'AGENTE' && this.dados.agentes.length > 1) {
      this.dados.agentes = this.dados.agentes.filter((a) => a.id !== id);
    } else if (tipo === 'CRIATURA' && this.dados.criaturas.length > 1) {
      this.dados.criaturas = this.dados.criaturas.filter((c) => c.id !== id);
    }
    this.salvarNoDispositivo();
  }

  public salvarAcao(acao: ConfigAcao): void {
    const idx = this.dados.acoes.findIndex((a) => a.id === acao.id);
    if (idx >= 0) {
      this.dados.acoes[idx] = { ...acao };
    } else {
      this.dados.acoes.push({ ...acao });
    }
    this.salvarNoDispositivo();
  }

  public removerAcao(id: string): void {
    if (this.dados.acoes.length > 1) {
      this.dados.acoes = this.dados.acoes.filter((a) => a.id !== id);
      this.salvarNoDispositivo();
    }
  }

  public salvarAmuleto(amuleto: ConfigAmuletoDecorator): void {
    const idx = this.dados.amuletos.findIndex((a) => a.id === amuleto.id);
    if (idx >= 0) {
      this.dados.amuletos[idx] = { ...amuleto };
    } else {
      this.dados.amuletos.push({ ...amuleto });
    }
    this.salvarNoDispositivo();
  }

  public removerAmuleto(id: string): void {
    if (this.dados.amuletos.length > 1) {
      this.dados.amuletos = this.dados.amuletos.filter((a) => a.id !== id);
      this.salvarNoDispositivo();
    }
  }

  public atualizarRegras(novasRegras: Partial<ConfigRegrasMesa>): ConfigRegrasMesa {
    this.dados.regras = { ...this.dados.regras, ...novasRegras };
    this.salvarNoDispositivo();
    return { ...this.dados.regras };
  }

  public restaurarPadroes(): BancoDadosOffline {
    this.dados = this.criarPadrao();
    this.salvarNoDispositivo();
    return this.dados;
  }

  public exportarJSON(): string {
    return JSON.stringify(this.dados, null, 2);
  }

  public importarJSON(jsonStr: string): { sucesso: boolean; mensagem: string } {
    try {
      const parsed = JSON.parse(jsonStr) as Partial<BancoDadosOffline>;
      if (!parsed || typeof parsed !== 'object') {
        return { sucesso: false, mensagem: 'JSON inválido.' };
      }
      const padrao = this.criarPadrao();
      this.dados = {
        versao: 2,
        agentes: Array.isArray(parsed.agentes) && parsed.agentes.length ? parsed.agentes : padrao.agentes,
        criaturas: Array.isArray(parsed.criaturas) && parsed.criaturas.length ? parsed.criaturas : padrao.criaturas,
        acoes: Array.isArray(parsed.acoes) && parsed.acoes.length ? parsed.acoes : padrao.acoes,
        amuletos: Array.isArray(parsed.amuletos) && parsed.amuletos.length ? parsed.amuletos : padrao.amuletos,
        regras: parsed.regras ? { ...padrao.regras, ...parsed.regras } : padrao.regras,
      };
      this.salvarNoDispositivo();
      return { sucesso: true, mensagem: 'Dados importados e salvos offline com sucesso!' };
    } catch (e: any) {
      return {
        sucesso: false,
        mensagem: `Erro ao ler JSON: ${e?.message ?? 'Formato inválido'}`,
      };
    }
  }
}
