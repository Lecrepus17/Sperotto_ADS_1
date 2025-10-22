// Importa as classes essenciais do Selenium
// By → localiza elementos (por id, css, xpath, etc.)
// until → define condições de espera explícita
import { Builder, By, until } from "selenium-webdriver";
const BASE_URL = "http://localhost:5173"; // ajuste se sua aplicação usa outraporta(
(async function testeLoginBasico() {
  // Cria uma instância do navegador Chrome
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    // ======== CENÁRIO 1: Campos vazios ========
    console.log("Cenário 1: campos vazios → deve exibir mensagem de erro");
    // Acessa a página inicial (login)
    await driver.get(`${BASE_URL}/`);
    // Localiza o botão de login e clica sem preencher os campos
    const botaoEntrar = await driver.findElement(By.id("botao-entrar"));
    await botaoEntrar.click();
    // Aguarda até que a mensagem de erro apareça
    const mensagemErro = await driver.wait(
      until.elementLocated(By.id("mensagem-erro")),
      3000
    );
    // Lê o texto exibido
    const textoErro = await mensagemErro.getText();
    // Confere se contém o texto esperado
    if (textoErro.includes("Preencha e-mail e senha")) {
      console.log("Mensagem de erro exibida corretamente!");
    } else {
      throw new Error(`Mensagem inesperada: ${textoErro}`);
    }
    // ======== CENÁRIO 2: Login correto ========
    console.log("Cenário 2: login válido → deve navegar para o dashboard");
    // Limpa e preenche os campos com credenciais válidas
    const campoEmail = await driver.findElement(By.id("campo-email"));
    const campoSenha = await driver.findElement(By.id("campo-senha"));
    await campoEmail.clear();
    await campoSenha.clear();
    await campoEmail.sendKeys("aluno@ifrs.edu.br");
    await campoSenha.sendKeys("123456");
    // Clica novamente em "Entrar"
    await botaoEntrar.click();
    // Aguarda até que a URL mude para /dashboard
    await driver.wait(until.urlContains("/dashboard"), 5000);
    // Aguarda o título do dashboard
    const titulo = await driver.wait(
      until.elementLocated(By.css('[data-testid="titulo-dashboard"]')),
      5000
    );
    const textoTitulo = await titulo.getText();
    if (/bem-vindo/i.test(textoTitulo)) {
      console.log("Login realizado e dashboard exibido com sucesso!");
    } else {
      throw new Error("Título do dashboard incorreto");
    }
    console.log("Teste finalizado sem erros!");
  } catch (erro) {
    console.error("Falha durante o teste:", erro.message);
  } finally {
    // Fecha o navegador, mesmo que ocorra erro
    await driver.quit();
  }
})();
