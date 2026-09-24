import RegistroLog, { NivelLog } from "../interface/RegistroLog";


export class LoggerService {
    // 1. Variável estática privada para armazenar a instância única
    private static instancia: LoggerService;
    
    // 2. Estado compartilhado
    private historico: RegistroLog[] = [];
    private readonly LIMITE_LOGS = 5;

    // 3. Construtor privado para impedir a criação via "new"
    private constructor() {}

    // 4. Método estático de acesso à instância
    public static getInstance(): LoggerService {
        if (!LoggerService.instancia) {
            LoggerService.instancia = new LoggerService();
        }
        return LoggerService.instancia;
    }

    // 5. Método de registro
    public log(nivel: NivelLog, mensagem: string): void {
        const novoLog: RegistroLog = {
            timestamp: new Date(),
            nivel: nivel,
            mensagem: mensagem
        };

        this.historico.push(novoLog);

        // Aplica a regra FIFO se ultrapassar o limite (remove o mais antigo)
        if (this.historico.length > this.LIMITE_LOGS) {
            this.historico.shift(); 
        }
    }

    // 6. Impressão do histórico
    public imprimirHistorico(): void {
        console.log("=== Histórico de Logs ===");
        if (this.historico.length === 0) {
            console.log("Nenhum log registrado.");
        } else {
            this.historico.forEach((log, index) => {
                const dataFormatada = log.timestamp.toISOString();
                console.log(`${index + 1}. [${dataFormatada}] [${log.nivel}] - ${log.mensagem}`);
            });
        }
        console.log("=========================\n");
    }

    // 7. Limpeza dos logs
    public limparLogs(): void {
        this.historico = [];
        console.log("Logs limpos com sucesso.\n");
    }
}