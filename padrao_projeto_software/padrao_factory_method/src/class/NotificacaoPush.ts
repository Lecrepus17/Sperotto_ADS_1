import { Notificacao } from "../interface/Notificacao";

export class NotificacaoPush implements Notificacao {
  enviar(mensagem: string, destinatario: string): void {
    console.log(`[PUSH] para ${destinatario}: ${mensagem}`);
  }
}