import { Notificador } from './Notificador';

export abstract class NotificadorDecorator implements Notificador {
    protected notificadorEnvolvido: Notificador;

    constructor(notificador: Notificador) {
        this.notificadorEnvolvido = notificador;
    }

    enviar(mensagem: string): void {
        this.notificadorEnvolvido.enviar(mensagem);
    }
}