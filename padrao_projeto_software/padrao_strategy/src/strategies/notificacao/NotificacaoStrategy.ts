export interface NotificacaoStrategy {
  enviarNotificacao(nome: string, destinatario: string): void;
}