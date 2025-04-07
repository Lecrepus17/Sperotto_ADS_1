import * as crypto from "crypto";
import { Usuario } from "./usuario";

export class Administrador extends Usuario {
  private nivelAcesso: number;
  private senhaHash: string;

  constructor(nome: string, email: string, senha: string, nivelAcesso: number) {
    super(nome, email, senha);
    this.nivelAcesso = nivelAcesso;
    this.senhaHash = this.hashSenha(senha);
  }

  public getNivelAcesso(): number {
    return this.nivelAcesso;
  }

  public setNivelAcesso(nivel: number): void {
    this.nivelAcesso = nivel;
  }

  private hashSenha(senha: string): string {
    return crypto.createHash("sha256").update(senha).digest("hex");
  }

  public override verificarLogin(email: string, senha: string): boolean {
    if (!super.validarEmail(email)) return false;
    const senhaHashTentativa = this.hashSenha(senha);
    return this.getEmail() === email && this.senhaHash === senhaHashTentativa;
  }

  public override recuperarSenha(email: string): void {
    if (super.validarEmail(email) && this.getEmail() === email) {
      console.log(
        `Administrador: verificação em duas etapas enviada para ${email}`
      );
    } else {
      console.log("Administrador: Email inválido ou não encontrado.");
    }
  }
}
