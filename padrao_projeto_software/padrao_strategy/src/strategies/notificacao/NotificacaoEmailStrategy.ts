import { NotificacaoStrategy } from "./NotificacaoStrategy";

export class NotificacaoEmailStrategy implements NotificacaoStrategy {
  enviarNotificacao(nome: string, destinatario: string): void {
    console.log(`[E-mail] Enviado um e-mail para ${nome} (${destinatario}).`);
  }
}