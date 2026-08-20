import { NotificacaoStrategy } from "./NotificacaoStrategy";

export class NotificacaoWhatsAppStrategy implements NotificacaoStrategy {
  enviarNotificacao(nome: string, destinatario: string): void {
    console.log(`[WhatsApp] Enviado um WhatsApp para ${nome} (${destinatario}).`);
  }
}