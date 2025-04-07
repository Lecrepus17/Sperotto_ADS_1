import { SistemaLogin } from "./sistemaLogin";
// Testes
const sistema = new SistemaLogin();

// Criando usuários
sistema.criarUsuario("João", "joao@email.com", "123456");
sistema.criarUsuario("Maria Admin", "maria@admin.com", "admin123", true, 2);

// Tentativa de login
sistema.login("joao@email.com", "123456");           // Sucesso
sistema.login("joao@email.com", "senhaerrada");      // Falha

// Login como administrador
sistema.login("maria@admin.com", "admin123");        // Sucesso
sistema.login("maria@admin.com", "errado");          // Falha

// Recuperação de senha
sistema.recuperarSenha("joao@email.com");            // Usuário
sistema.recuperarSenha("maria@admin.com");           // Admin
sistema.recuperarSenha("naoexiste@email.com");       // Erro
