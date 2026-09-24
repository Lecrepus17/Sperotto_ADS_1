import { LoggerService } from "./class/LoggerService";

// Os módulos obtêm sempre a mesma instância
const loggerVendas = LoggerService.getInstance();
const loggerPagamentos = LoggerService.getInstance();

// Simulando registros de diferentes módulos
loggerVendas.log('INFO', 'Sistema de vendas inicializado.');
loggerPagamentos.log('INFO', 'Sistema de pagamentos conectando ao banco...');
loggerVendas.log('WARN', 'Estoque de produto X está baixo.');
loggerPagamentos.log('ERROR', 'Falha ao processar pagamento do pedido #102.');
loggerVendas.log('INFO', 'Pedido #103 criado com sucesso.');

// Neste ponto, temos 5 logs. O próximo fará o primeiro ser excluído.
loggerPagamentos.log('INFO', 'Pagamento do pedido #103 confirmado.');

// Imprime para verificar o comportamento FIFO (o primeiro 'INFO' sumiu)
loggerVendas.imprimirHistorico();

// Limpa tudo
loggerPagamentos.limparLogs();
loggerVendas.imprimirHistorico();