import { NotificadorDecorator } from './NotificadorDecorator';
import { Notificador } from './Notificador';

export class WhatsAppDecorator extends NotificadorDecorator {
    constructor(notificador: Notificador) {
        super(notificador);
    }

    enviar(mensagem: string): void {
        super.enviar(mensagem);
        console.log(`[WhatsApp] Enviando: ${mensagem}`);
    }
}