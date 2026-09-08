import { NotificadorDecorator } from './NotificadorDecorator';
import { Notificador } from './Notificador';

export class SMSDecorator extends NotificadorDecorator {
    constructor(notificador: Notificador) {
        super(notificador);
    }

    enviar(mensagem: string): void {
        super.enviar(mensagem); // Executa o envio do notificador envelopado
        console.log(`[SMS] Enviando: ${mensagem}`);
    }
}