import { Builder, By, until } from "selenium-webdriver";

const BASE_URL = "http://localhost:5173";

(async function testeLogin() {
  // Cria uma instância do navegador Chrome
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    // ==================================================================
    // CENÁRIO 1: Credenciais Inválidas
    // Nota: Mudamos de "campos vazios" para "inválidos" porque seus inputs
    // têm o atributo 'required'. O navegador bloquearia o envio vazio antes
    // do React processar, então o erro do estado 'err' nunca apareceria.
    // ==================================================================
    console.log(
      "Cenário 1: Login com senha errada → deve exibir mensagem de erro"
    );

    await driver.get(`${BASE_URL}/`);
    const botaoEntrarLogin = await driver.findElement(By.id("botao-entrar"));
    await botaoEntrarLogin.click();

    // --- CORREÇÃO AQUI ---
    // Aguarda até que o elemento 'email' exista no DOM antes de interagir.
    // Isso é essencial em React, pois a renderização é assíncrona.
    const inputEmail = await driver.wait(
      until.elementLocated(By.name("email")),
      10000 // espera até 10 segundos
    );

    const inputSenha = await driver.findElement(By.name("password"));
    // Localiza o botão pelo tipo submit (já que é um <Button type="submit">)
    const botaoEntrar = await driver.findElement(
      By.css("button[type='submit']")
    );

    // Preenche com dados errados para forçar o erro da API (catch no React)
    await inputEmail.sendKeys("usuario@teste.com");
    await inputSenha.sendKeys("senhaerrada");
    await botaoEntrar.click();

    // Aguarda a mensagem de erro aparecer (classe .alert no React)
    const elementoErro = await driver.wait(
      until.elementLocated(By.css(".alert")),
      5000
    );

    const textoErro = await elementoErro.getText();

    // Valida se o texto é exatamente o que está no setErr("Credenciais inválidas")
    if (textoErro.includes("Credenciais inválidas")) {
      console.log("✅ Sucesso: Mensagem de erro exibida corretamente!");
    } else {
      throw new Error(`❌ Erro: Mensagem inesperada. Recebido: '${textoErro}'`);
    }

    // ==================================================================
    // CENÁRIO 2: Login Correto
    // ==================================================================
    console.log("Cenário 2: Login válido → deve navegar para o dashboard");

    // Recarrega a página para limpar o estado (Refresh)
    await driver.navigate().refresh();

    // IMPORTANTE: Após o refresh, as variáveis antigas (inputEmail, inputSenha)
    // perdem a referência (Stale Element). É preciso buscá-las novamente.
    const inputEmail2 = await driver.wait(
      until.elementLocated(By.name("email")),
      5000
    );

    const inputSenha2 = await driver.findElement(By.name("password"));
    const botaoEntrar2 = await driver.findElement(
      By.css("button[type='submit']")
    );

    // Insira aqui credenciais que a sua API real (ou mock) aceite
    await inputEmail2.sendKeys("admin@ifrs.edu.br");
    await inputSenha2.sendKeys("123456");
    await botaoEntrar2.click();

    // Aguarda a URL mudar para /dashboard
    await driver.wait(until.urlContains("/dashboard"), 5000);
    console.log("✅ Sucesso: Redirecionamento para /dashboard detectado!");

    // Opcional: Verificar algo na dashboard.
    // Como não tenho o código da Dashboard, verifiquei apenas a URL.
    // Se quiser verificar o título, certifique-se que o H1 da dashboard tenha ids ou texto legível.
  } catch (erro) {
    console.error("❌ Falha durante o teste:", erro.message);
  } finally {
    await driver.quit();
  }
})();
