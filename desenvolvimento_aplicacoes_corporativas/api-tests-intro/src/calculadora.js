const somarMod = require("./somar");
function calcularTotal(a, b) {
  return somarMod.somar(a, b) * 2;
}
module.exports = { calcularTotal };
