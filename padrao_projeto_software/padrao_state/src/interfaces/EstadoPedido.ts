export interface EstadoPedido {
  readonly nome: string;
  pagar(): void;
  enviar(): void;
  concluirEntrega(): void;
  cancelar(): void;
}
