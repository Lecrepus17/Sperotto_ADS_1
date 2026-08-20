import { NotificacaoStrategy } from "./NotificacaoStrategy";

export class NotificacaoSMSStrategy implements NotificacaoStrategy {
  enviarNotificacao(nome: string, destinatario: string): void {
    console.log(`[SMS] Enviado um SMS para ${nome} (${destinatario}).`);
  }
}