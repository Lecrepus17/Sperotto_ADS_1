// --- Estratégias de Desconto ---
export * from './desconto/DescontoStrategy';
export * from './desconto/DescontoClienteVIPStrategy';
export * from './desconto/DescontoPorQuantidadeStrategy';
export * from './desconto/DescontoCupomFixoStrategy';

// --- Estratégias de Pagamento ---
export * from './pagamento/PagamentoStrategy';
export * from './pagamento/PagamentoPixStrategy';
export * from './pagamento/PagamentoCartaoCreditoStrategy';
export * from './pagamento/PagamentoBoletoStrategy';

// --- Estratégias de Notificação ---
export * from './notificacao/NotificacaoStrategy';
export * from './notificacao/NotificacaoEmailStrategy';
export * from './notificacao/NotificacaoSMSStrategy';
export * from './notificacao/NotificacaoWhatsAppStrategy';