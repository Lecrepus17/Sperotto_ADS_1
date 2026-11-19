import fs from 'fs';
import path from 'path';
import { calcularFreteComDecorators } from '../patterns/decorator/montarCalculadoraFrete';
import {
  BancoLocal,
  Encomenda,
  NotificacaoSimulada,
  RegistroAuditoria,
} from '../types/encomenda';

const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'encomendas.json');

function criarDadosIniciais(): BancoLocal {
  const agora = new Date();
  const haDuasHoras = new Date(agora.getTime() - 2 * 60 * 60 * 1000).toISOString();
  const haUmaHora = new Date(agora.getTime() - 60 * 60 * 1000).toISOString();
  const haTrintaMin = new Date(agora.getTime() - 30 * 60 * 1000).toISOString();
  const haDezMin = new Date(agora.getTime() - 10 * 60 * 1000).toISOString();

  const frete1 = calcularFreteComDecorators('EXPRESSA', 3.5, 450, ['SEGURO', 'URGENCIA']);
  const frete2 = calcularFreteComDecorators('PADRAO', 6, 180, ['FRAGIL']);
  const frete3 = calcularFreteComDecorators('BALCAO', 1.2, 95, []);
  const frete4 = calcularFreteComDecorators('PADRAO', 2, 120, []);

  const encomendas: Encomenda[] = [
    {
      id: 'enc-1001',
      codigo: 'RF-2026-001',
      cliente: 'Mariana Souza',
      contatoCliente: '(51) 99812-3401',
      origem: 'Centro - Depósito RotaFácil',
      destino: 'Bairro Moinhos de Vento, 420',
      pesoKg: 3.5,
      valorDeclarado: 450,
      modalidade: 'EXPRESSA',
      adicionais: ['SEGURO', 'URGENCIA'],
      taxaEntrega: frete1.taxaTotal,
      prazoHoras: frete1.prazoHoras,
      composicaoFrete: frete1.itens,
      status: 'EM_ROTA',
      criadaEm: haDuasHoras,
      atualizadaEm: haUmaHora,
    },
    {
      id: 'enc-1002',
      codigo: 'RF-2026-002',
      cliente: 'Carlos Henrique Lima',
      contatoCliente: '(51) 99104-8820',
      origem: 'Bairro Floresta - Loja Parceira',
      destino: 'Bairro Menino Deus, 118',
      pesoKg: 6,
      valorDeclarado: 180,
      modalidade: 'PADRAO',
      adicionais: ['FRAGIL'],
      taxaEntrega: frete2.taxaTotal,
      prazoHoras: frete2.prazoHoras,
      composicaoFrete: frete2.itens,
      status: 'PENDENTE',
      criadaEm: haTrintaMin,
      atualizadaEm: haTrintaMin,
    },
    {
      id: 'enc-1003',
      codigo: 'RF-2026-003',
      cliente: 'Fernanda Alves',
      contatoCliente: '(51) 98455-1099',
      origem: 'Centro - Balcão Principal',
      destino: 'Retirada no Balcão - Unidade Centro',
      pesoKg: 1.2,
      valorDeclarado: 95,
      modalidade: 'BALCAO',
      adicionais: [],
      taxaEntrega: frete3.taxaTotal,
      prazoHoras: frete3.prazoHoras,
      composicaoFrete: frete3.itens,
      status: 'ENTREGUE',
      criadaEm: haDuasHoras,
      atualizadaEm: haDezMin,
    },
    {
      id: 'enc-1004',
      codigo: 'RF-2026-004',
      cliente: 'Roberto Mendes',
      contatoCliente: '(51) 99700-4412',
      origem: 'Bairro Santana',
      destino: 'Bairro Petrópolis, 890',
      pesoKg: 2,
      valorDeclarado: 120,
      modalidade: 'PADRAO',
      adicionais: [],
      taxaEntrega: frete4.taxaTotal,
      prazoHoras: frete4.prazoHoras,
      composicaoFrete: frete4.itens,
      status: 'CANCELADA',
      criadaEm: haUmaHora,
      atualizadaEm: haDezMin,
    },
  ];

  const auditoria: RegistroAuditoria[] = [
    {
      id: 'aud-seed-01',
      tipoEvento: 'STATUS_ALTERADO',
      encomendaId: 'enc-1003',
      codigoEncomenda: 'RF-2026-003',
      cliente: 'Fernanda Alves',
      statusAnterior: 'EM_ROTA',
      statusNovo: 'ENTREGUE',
      resumo: 'Status alterado de EM_ROTA para ENTREGUE — Obs: Retirada confirmada no balcão.',
      ocorridoEm: haDezMin,
    },
    {
      id: 'aud-seed-02',
      tipoEvento: 'ENCOMENDA_CRIADA',
      encomendaId: 'enc-1002',
      codigoEncomenda: 'RF-2026-002',
      cliente: 'Carlos Henrique Lima',
      statusNovo: 'PENDENTE',
      resumo: `Encomenda RF-2026-002 cadastrada (PADRAO) para Carlos Henrique Lima — Taxa R$ ${frete2.taxaTotal.toFixed(2)}, prazo ${frete2.prazoHoras}h.`,
      ocorridoEm: haTrintaMin,
    },
    {
      id: 'aud-seed-03',
      tipoEvento: 'STATUS_ALTERADO',
      encomendaId: 'enc-1001',
      codigoEncomenda: 'RF-2026-001',
      cliente: 'Mariana Souza',
      statusAnterior: 'PENDENTE',
      statusNovo: 'EM_ROTA',
      resumo: 'Status alterado de PENDENTE para EM_ROTA — Obs: Motoboy João iniciou rota.',
      ocorridoEm: haUmaHora,
    },
  ];

  const notificacoes: NotificacaoSimulada[] = [
    {
      id: 'not-seed-01',
      encomendaId: 'enc-1003',
      codigoEncomenda: 'RF-2026-003',
      destinatario: 'Fernanda Alves',
      contato: '(51) 98455-1099',
      canal: 'SMS',
      mensagem:
        'Entrega confirmada! A encomenda RF-2026-003 foi entregue com sucesso em Retirada no Balcão - Unidade Centro. Obrigado por escolher a RotaFácil!',
      enviadaEm: haDezMin,
    },
    {
      id: 'not-seed-02',
      encomendaId: 'enc-1001',
      codigoEncomenda: 'RF-2026-001',
      destinatario: 'Mariana Souza',
      contato: '(51) 99812-3401',
      canal: 'WhatsApp',
      mensagem:
        'Olá, Mariana Souza! Sua encomenda RF-2026-001 saiu para entrega rumo a Bairro Moinhos de Vento, 420.',
      enviadaEm: haUmaHora,
    },
  ];

  return { encomendas, auditoria, notificacoes };
}

export class JsonRepository {
  private banco: BancoLocal;

  constructor() {
    this.banco = this.carregar();
  }

  private carregar(): BancoLocal {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE)) {
      const inicial = criarDadosIniciais();
      this.gravar(inicial);
      return inicial;
    }

    try {
      const conteudo = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(conteudo) as BancoLocal;
    } catch {
      const inicial = criarDadosIniciais();
      this.gravar(inicial);
      return inicial;
    }
  }

  private gravar(dados: BancoLocal): void {
    fs.writeFileSync(DATA_FILE, JSON.stringify(dados, null, 2), 'utf-8');
  }

  listarEncomendas(): Encomenda[] {
    return [...this.banco.encomendas];
  }

  buscarEncomendaPorId(id: string): Encomenda | undefined {
    return this.banco.encomendas.find((item) => item.id === id);
  }

  salvarEncomenda(encomenda: Encomenda): void {
    const idx = this.banco.encomendas.findIndex((item) => item.id === encomenda.id);
    if (idx === -1) {
      this.banco.encomendas.unshift(encomenda);
    } else {
      this.banco.encomendas[idx] = encomenda;
    }
    this.gravar(this.banco);
  }

  adicionarAuditoria(registro: RegistroAuditoria): void {
    this.banco.auditoria.unshift(registro);
    this.gravar(this.banco);
  }

  listarAuditoria(): RegistroAuditoria[] {
    return [...this.banco.auditoria];
  }

  adicionarNotificacao(notificacao: NotificacaoSimulada): void {
    this.banco.notificacoes.unshift(notificacao);
    this.gravar(this.banco);
  }

  listarNotificacoes(): NotificacaoSimulada[] {
    return [...this.banco.notificacoes];
  }
}
