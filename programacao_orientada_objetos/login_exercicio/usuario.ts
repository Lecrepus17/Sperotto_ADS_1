export class Usuario {
    private nome: string;
    private email: string;
    private senha: string;
  
    constructor(nome: string, email: string, senha: string) {
      this.nome = nome;
      if (this.validarEmail(email)) {
        this.email = email;
      } else {
        throw new Error("Email inválido");
      }
      this.senha = senha;
    }
  
    public getNome(): string {
      return this.nome;
    }
  
    public setNome(nome: string): void {
      this.nome = nome;
    }
  
    public getEmail(): string {
      return this.email;
    }
  
    public setEmail(email: string): void {
      if (this.validarEmail(email)) {
        this.email = email;
      } else {
        throw new Error("Email inválido");
      }
    }
  
    public getSenha(): string {
      return this.senha;
    }
  
    public setSenha(senha: string): void {
      this.senha = senha;
    }
  
    public verificarLogin(email: string, senha: string): boolean {
      if (!this.validarEmail(email)) return false;
      return this.email === email && this.senha === senha;
    }
  
    public recuperarSenha(email: string): void {
      if (this.validarEmail(email) && this.email === email) {
        console.log(`Link de recuperação de senha enviado para ${email}`);
      } else {
        console.log("Email não encontrado ou inválido.");
      }
    }
  
    protected validarEmail(email: string): boolean {
      const regex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
      return regex.test(email);
    }
  }
  