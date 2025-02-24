function imposto(valor) {
  resultado = 0;
  if (valor <= 2259.2) {
    return resultado;
  } else if (valor <= 2826.65) {
    resultado = valor * 0.075 - 169.44;
    return Number(resultado.toFixed(2));
  } else if (valor <= 3751.05) {
    resultado = valor * 0.15 - 381.44;
    return Number(resultado.toFixed(2));
  } else if (valor <= 4664.68) {
    resultado = valor * 0.225 - 662.77;
    return Number(resultado.toFixed(2));
  } else {
    resultado = valor * 0.275 - 896;
    return Number(resultado.toFixed(2));
  }
}

module.exports = {
  imposto,
};
