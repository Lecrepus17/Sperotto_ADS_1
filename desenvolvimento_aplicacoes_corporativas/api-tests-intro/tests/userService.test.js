jest.mock("../src/emailService"); // 1️ Mock automatizado
const { cadastrarUsuario } = require("../src/userService");
const { enviarEmail } = require("../src/emailService"); // 2️ Import do mock
test("deve chamar enviarEmail ao cadastrar usuário", () => {
  cadastrarUsuario("Maria", "maria@email.com");
  // 3️ Verifica se enviarEmail (mockado) foi chamado corretamente
  expect(enviarEmail).toHaveBeenCalledTimes(1);
  expect(enviarEmail).toHaveBeenCalledWith({
    id: 1,
    nome: "Maria",
    email: "maria@email.com",
  });
});
