import { Notificacao } from "../interface/Notificacao";

export class NotificacaoSMS implements Notificacao {
  enviar(mensagem: string, destinatario: string): void {
    console.log(`[SMS] para ${destinatario}: ${mensagem}`);
  }
}