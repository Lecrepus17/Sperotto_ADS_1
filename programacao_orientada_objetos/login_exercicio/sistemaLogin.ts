import { Usuario } from "./usuario";
import { Administrador } from "./administrador";

export class SistemaLogin {
  private usuarios: Usuario[] = [];

  public criarUsuario(
    nome: string,
    email: string,
    senha: string,
    admin: boolean = false,
    nivelAcesso: number = 1
  ): void {
    try {
      let novoUsuario: Usuario;
      if (admin) {
        novoUsuario = new Administrador(nome, email, senha, nivelAcesso);
      } else {
        novoUsuario = new Usuario(nome, email, senha);
      }

      this.usuarios.push(novoUsuario);
      console.log(`Usuário ${nome} criado com sucesso!`);
    } catch (error) {
      console.log("Erro ao criar usuário:", error);
    }
  }

  public login(email: string, senha: string): void {
    const usuario = this.usuarios.find((u) => u.verificarLogin(email, senha));
    if (usuario) {
      console.log(`Login bem-sucedido: ${usuario.getNome()}`);
    } else {
      console.log("Email ou senha incorretos.");
    }
  }

  public recuperarSenha(email: string): void {
    const usuario = this.usuarios.find((u) => u.getEmail() === email);
    if (usuario) {
      usuario.recuperarSenha(email);
    } else {
      console.log("Email não encontrado.");
    }
  }
}
