function imposto(valor) {
    if (valor <= 2559.2) {
        return 0;
    } else if (valor <= 2826.65 ) {
        return 0;
    }
  }
  
  module.exports = {
    imposto,
  };
  