export interface Observer {
  update(message: string): void;
}

export class Email implements Observer {
  constructor(private readonly email: string) {}
  update(message: string): void {
    console.log(`Email enviado para ${this.email}: ${message}`);
  }
}

export class SMS implements Observer {
  constructor(private readonly phone: string) {}
  update(message: string): void {
    console.log(`SMS enviado para ${this.phone}: ${message}`);
  }
}

export class Product {
  private observers: Observer[] = [];
  constructor(private readonly codigo: string, private readonly nome: string) {}

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(message: string): void {
    this.observers.forEach(observer => observer.update(message));
  }

  setAvailable(available: boolean): void {
    if (available) {
      this.notify(`Produto ${this.codigo} - ${this.nome} Disponível!`);
    }
  }
}