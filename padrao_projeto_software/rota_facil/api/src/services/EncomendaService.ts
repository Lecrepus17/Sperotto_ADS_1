import crypto from 'crypto';
import { calcularFreteComDecorators } from '../patterns/decorator/montarCalculadoraFrete';
import { AuditoriaObserver } from '../patterns/observer/AuditoriaObserver';
import { EncomendaEventSubject } from '../patterns/observer/EncomendaEventSubject';
import { NotificacaoClienteObserver } from '../patterns/observer/NotificacaoClienteObserver';
import { ContextoEstadoEncomenda } from '../patterns/state/ContextoEstadoEncomenda';
import { JsonRepository } from '../repositories/JsonRepository';
import {
  AdicionalFrete,
  CriarEncomendaDTO,
  Encomenda,
  EncomendaComTransicoes,
  ModalidadeEntrega,
  NotificacaoSimulada,
  RegistroAuditoria,
  ResultadoFrete,
  SimularFreteDTO,
  StatusEncomenda,
} from '../types/encomenda';

const MODALIDADES_VALIDAS: ModalidadeEntrega[] = ['PADRAO', 'EXPRESSA', 'BALCAO'];
const ADICIONAIS_VALIDOS: AdicionalFrete[] = ['SEGURO', 'FRAGIL', 'URGENCIA'];
const STATUS_VALIDOS: StatusEncomenda[] = ['PENDENTE', 'EM_ROTA', 'ENTREGUE', 'CANCELADA'];

export interface FiltrosEncomenda {
  status?: string;
  modalidade?: string;
  busca?: string;
}

export class EncomendaService {
  private readonly eventSubject: EncomendaEventSubject;

  constructor(private readonly repository: JsonRepository) {
    this.eventSubject = new EncomendaEventSubject();
    this.eventSubject.inscrever(
      new AuditoriaObserver((registro) => this.repository.adicionarAuditoria(registro))
    );
    this.eventSubject.inscrever(
      new NotificacaoClienteObserver((notificacao) =>
        this.repository.adicionarNotificacao(notificacao)
      )
    );
  }

  private anexarTransicoes(encomenda: Encomenda): EncomendaComTransicoes {
    const contexto = new ContextoEstadoEncomenda(encomenda.status);
    return {
      ...encomenda,
      transicoesPermitidas: contexto.transicoesPermitidas(),
    };
  }

  private validarCalculo(dto: SimularFreteDTO): {
    pesoKg: number;
    valorDeclarado: number;
    modalidade: ModalidadeEntrega;
    adicionais: AdicionalFrete[];
  } {
    if (!MODALIDADES_VALIDAS.includes(dto.modalidade)) {
      throw new Error('Modalidade de entrega inválida. Use PADRAO, EXPRESSA ou BALCAO.');
    }

    const pesoKg = Number(dto.pesoKg);
    const valorDeclarado = Number(dto.valorDeclarado);

    if (!Number.isFinite(pesoKg) || pesoKg <= 0) {
      throw new Error('O peso da encomenda deve ser maior que zero.');
    }

    if (!Number.isFinite(valorDeclarado) || valorDeclarado < 0) {
      throw new Error('O valor declarado deve ser um número válido maior ou igual a zero.');
    }

    const adicionais = (dto.adicionais ?? []).filter((item): item is AdicionalFrete =>
      ADICIONAIS_VALIDOS.includes(item)
    );

    return { pesoKg, valorDeclarado, modalidade: dto.modalidade, adicionais };
  }

  simularFrete(dto: SimularFreteDTO): ResultadoFrete {
    const { modalidade, pesoKg, valorDeclarado, adicionais } = this.validarCalculo(dto);
    return calcularFreteComDecorators(modalidade, pesoKg, valorDeclarado, adicionais);
  }

  cadastrarEncomenda(dto: CriarEncomendaDTO): EncomendaComTransicoes {
    if (!dto.cliente?.trim()) {
      throw new Error('O nome do cliente é obrigatório.');
    }
    if (!dto.origem?.trim() || !dto.destino?.trim()) {
      throw new Error('Origem e destino são obrigatórios.');
    }

    const { modalidade, pesoKg, valorDeclarado, adicionais } = this.validarCalculo(dto);
    const resultadoFrete = calcularFreteComDecorators(
      modalidade,
      pesoKg,
      valorDeclarado,
      adicionais
    );

    const agora = new Date().toISOString();
    const sequencial = String(this.repository.listarEncomendas().length + 1).padStart(3, '0');
    const codigo = dto.codigo?.trim()
      ? dto.codigo.trim().toUpperCase()
      : `RF-${new Date().getFullYear()}-${sequencial}`;

    const novaEncomenda: Encomenda = {
      id: `enc-${crypto.randomUUID().slice(0, 8)}`,
      codigo,
      cliente: dto.cliente.trim(),
      contatoCliente: dto.contatoCliente?.trim() || '(não informado)',
      origem: dto.origem.trim(),
      destino: dto.destino.trim(),
      pesoKg,
      valorDeclarado,
      modalidade,
      adicionais,
      taxaEntrega: resultadoFrete.taxaTotal,
      prazoHoras: resultadoFrete.prazoHoras,
      composicaoFrete: resultadoFrete.itens,
      status: 'PENDENTE',
      criadaEm: agora,
      atualizadaEm: agora,
    };

    this.repository.salvarEncomenda(novaEncomenda);

    this.eventSubject.notificar({
      tipo: 'ENCOMENDA_CRIADA',
      encomenda: novaEncomenda,
      statusNovo: novaEncomenda.status,
      ocorridoEm: agora,
    });

    return this.anexarTransicoes(novaEncomenda);
  }

  listarEncomendas(filtros: FiltrosEncomenda = {}): EncomendaComTransicoes[] {
    let lista = this.repository.listarEncomendas();

    if (filtros.status && filtros.status !== 'TODOS') {
      lista = lista.filter((item) => item.status === filtros.status);
    }

    if (filtros.modalidade && filtros.modalidade !== 'TODAS') {
      lista = lista.filter((item) => item.modalidade === filtros.modalidade);
    }

    if (filtros.busca?.trim()) {
      const termo = filtros.busca.trim().toLowerCase();
      lista = lista.filter(
        (item) =>
          item.codigo.toLowerCase().includes(termo) ||
          item.cliente.toLowerCase().includes(termo) ||
          item.destino.toLowerCase().includes(termo)
      );
    }

    return lista.map((item) => this.anexarTransicoes(item));
  }

  buscarPorId(id: string): EncomendaComTransicoes | undefined {
    const encomenda = this.repository.buscarEncomendaPorId(id);
    return encomenda ? this.anexarTransicoes(encomenda) : undefined;
  }

  atualizarStatus(
    id: string,
    novoStatus: StatusEncomenda,
    observacao?: string
  ): EncomendaComTransicoes {
    if (!STATUS_VALIDOS.includes(novoStatus)) {
      throw new Error('Status inválido. Use PENDENTE, EM_ROTA, ENTREGUE ou CANCELADA.');
    }

    const encomenda = this.repository.buscarEncomendaPorId(id);
    if (!encomenda) {
      throw new Error('Encomenda não encontrada.');
    }

    const statusAnterior = encomenda.status;
    const contextoEstado = new ContextoEstadoEncomenda(statusAnterior);
    const statusAtualizado = contextoEstado.transicionarPara(novoStatus);

    const agora = new Date().toISOString();
    const encomendaAtualizada: Encomenda = {
      ...encomenda,
      status: statusAtualizado,
      atualizadaEm: agora,
    };

    this.repository.salvarEncomenda(encomendaAtualizada);

    this.eventSubject.notificar({
      tipo: 'STATUS_ALTERADO',
      encomenda: encomendaAtualizada,
      statusAnterior,
      statusNovo: statusAtualizado,
      observacao: observacao?.trim() || undefined,
      ocorridoEm: agora,
    });

    return this.anexarTransicoes(encomendaAtualizada);
  }

  listarAuditoria(): RegistroAuditoria[] {
    return this.repository.listarAuditoria();
  }

  listarNotificacoes(): NotificacaoSimulada[] {
    return this.repository.listarNotificacoes();
  }
}
