import { NotificadorDecorator } from './NotificadorDecorator';
import { Notificador } from './Notificador';

export class LogDecorator extends NotificadorDecorator {
    constructor(notificador: Notificador) {
        super(notificador);
    }

    enviar(mensagem: string): void {
        super.enviar(mensagem);
        const dataHoraAtual = new Date().toLocaleString('pt-BR');
        console.log(`[LOG] Notificação registrada no sistema às ${dataHoraAtual}`);
    }
}