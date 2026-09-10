import { Notificacao } from "../interface/Notificacao";

export abstract class GerenciadorNotificacao {
  // Factory Method abstrato
  abstract criarNotificacao(): Notificacao;

  // Lógica principal de negócio
  notificar(mensagem: string, destinatario: string): void {
    const notificacao: Notificacao = this.criarNotificacao();
    notificacao.enviar(mensagem, destinatario);
  }
}
