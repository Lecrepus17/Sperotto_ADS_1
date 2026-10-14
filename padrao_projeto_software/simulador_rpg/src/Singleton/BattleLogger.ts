export class BattleLogger {
    private static instancia: BattleLogger | null = null;
    private logs: string[] = [];

    private constructor() {}

    public static getInstancia(): BattleLogger {
        if (!BattleLogger.instancia) {
            BattleLogger.instancia = new BattleLogger();
        }
        return BattleLogger.instancia;
    }

    public log(mensagem: string): void {
        const registro = `[Turno ${this.logs.length + 1}] ${mensagem}`;
        this.logs.push(registro);
        console.log(registro);
    }
}