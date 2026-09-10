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

class ProcessardorDePedidos {
    processar(tipoPagamento: string) {
        let pagamento: Pagamento;

        switch (tipoPagamento) {
            case "pix":
                pagamento = new PagamentoPix();
                break;
            case "cartao":
                pagamento = new PagamentoCartao();
                break;
            default:
                throw new Error("Tipo de pagamento não suportado");
        }
        pagamento.efetuar();
    }
}

let processador = new ProcessardorDePedidos()
processador.processar("cartao");