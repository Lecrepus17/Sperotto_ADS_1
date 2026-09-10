interface Pagamento {
    efetuar(): void
}

class PagamentoPix implements Pagamento {
    efetuar(): void {
        console.log("Pagamento efetuado via PIX");
    }
}
class PagamentoCartao implements Pagamento {
    efetuar(): void {
        console.log("Pagamento efetuado via Cartão");
    }
}

abstract class ProcessardorDePedidos {
    abstract criarPagamento(tipoPagamento: string): Pagamento;
    processar(tipoPagamento: string) {
        const pagamento = this.criarPagamento(tipoPagamento);
        pagamento.efetuar();
    }
}

class ProcessardorPix extends ProcessardorDePedidos {
    criarPagamento(tipoPagamento: string): Pagamento {
        return new PagamentoPix();
    }
}

class ProcessardorCartao extends ProcessardorDePedidos {
    criarPagamento(tipoPagamento: string): Pagamento {
        return new PagamentoCartao();
    }
}

let processador = new ProcessardorPix();
processador.processar("pix");
let processador2 = new ProcessardorCartao();
processador2.processar("cartao");