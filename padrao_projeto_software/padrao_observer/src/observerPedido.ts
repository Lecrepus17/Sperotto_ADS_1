export interface Observer {
  update(pedido: Pedido): void;
}

export class EmailService implements Observer {
  constructor(private readonly email: string) {}
  update(pedido: Pedido): void {
    console.log(`[Email] Confirmação do pedido ${pedido.codigo} (Status: ${pedido.status}) enviada para: ${this.email}`);
  }
}

export class InventoryService implements Observer {
  constructor(private readonly quantidade: number) {}
  update(pedido: Pedido): void {
    // Só faz sentido baixar o estoque se o pedido for pago
    if (pedido.status === "Pago") {
      console.log(`[Estoque] Baixa de ${this.quantidade} itens para o pedido ${pedido.codigo}`);
    }
  }
}

export class LogService implements Observer {
  update(pedido: Pedido): void {
    console.log(`[Log] Pedido ${pedido.codigo} mudou para o status: '${pedido.status}'. Data: ${new Date().toLocaleString()}`);
  }
}

export class Pedido {
  private observers: Observer[] = [];
  
  // Removido o 'readonly' do status, pois ele vai mudar
  constructor(
    public status: string,
    public readonly codigo: string,
  ) {}

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(): void {
    this.observers.forEach((observer) => observer.update(this));
  }

  // Método único e centralizado para alterar o status e notificar
  setStatus(novoStatus: string): void {
    this.status = novoStatus;
    this.notify();
  }
}
