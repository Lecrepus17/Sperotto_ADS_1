export interface Notificacao {
  enviar(mensagem: string, destinatario: string): void;
}