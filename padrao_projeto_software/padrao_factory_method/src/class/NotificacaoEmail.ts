import { Notificacao } from "../interface/Notificacao";

export class NotificacaoEmail implements Notificacao {
  enviar(mensagem: string, destinatario: string): void {
    console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
  }
}