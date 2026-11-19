import { Request, Response, Router } from 'express';
import { TransicaoEstadoInvalidaError } from '../patterns/state/IEstadoEncomenda';
import { EncomendaService } from '../services/EncomendaService';

export function criarRotasEncomendas(service: EncomendaService): Router {
  const router = Router();

  router.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      servico: 'RotaFácil API',
      padroes: ['Decorator', 'State', 'Observer'],
      timestamp: new Date().toISOString(),
    });
  });

  router.post('/encomendas/simular', (req: Request, res: Response) => {
    try {
      const resultado = service.simularFrete(req.body);
      res.json(resultado);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao simular frete.';
      res.status(400).json({ erro: mensagem });
    }
  });

  router.get('/encomendas', (req: Request, res: Response) => {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    const modalidade = typeof req.query.modalidade === 'string' ? req.query.modalidade : undefined;
    const busca = typeof req.query.busca === 'string' ? req.query.busca : undefined;

    const encomendas = service.listarEncomendas({ status, modalidade, busca });
    res.json(encomendas);
  });

  router.get('/encomendas/:id', (req: Request, res: Response) => {
    const id = String(req.params.id);
    const encomenda = service.buscarPorId(id);

    if (!encomenda) {
      res.status(404).json({ erro: 'Encomenda não encontrada.' });
      return;
    }

    res.json(encomenda);
  });

  router.post('/encomendas', (req: Request, res: Response) => {
    try {
      const criada = service.cadastrarEncomenda(req.body);
      res.status(201).json(criada);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao cadastrar encomenda.';
      res.status(400).json({ erro: mensagem });
    }
  });

  router.patch('/encomendas/:id/status', (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const { status, observacao } = req.body ?? {};
      const atualizada = service.atualizarStatus(id, status, observacao);
      res.json(atualizada);
    } catch (error) {
      if (error instanceof TransicaoEstadoInvalidaError) {
        res.status(400).json({ erro: error.message, tipo: 'TRANSICAO_INVALIDA' });
        return;
      }

      const mensagem = error instanceof Error ? error.message : 'Erro ao atualizar status.';
      const statusCode = mensagem.includes('não encontrada') ? 404 : 400;
      res.status(statusCode).json({ erro: mensagem });
    }
  });

  router.get('/eventos/auditoria', (_req: Request, res: Response) => {
    res.json(service.listarAuditoria());
  });

  router.get('/eventos/notificacoes', (_req: Request, res: Response) => {
    res.json(service.listarNotificacoes());
  });

  return router;
}
